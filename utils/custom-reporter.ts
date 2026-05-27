import { Reporter, TestCase, TestResult, FullResult, FullConfig } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

export interface CustomTestStep {
  title: string;
  category: string;
  duration: number;
  error?: string;
  depth?: number;
}

export interface CustomTestResult {
  id: string;
  title: string;
  suite: string;
  browser: string;
  status: string;
  duration: number;
  error?: string;
  stack?: string;
  steps: CustomTestStep[];
}

export interface ReportData {
  env: string;
  startTime: string;
  totalDuration: string;
  stats: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
  };
  results: CustomTestResult[];
}

class CustomReporter implements Reporter {
  private startTime = Date.now();
  private testResults: CustomTestResult[] = [];

  onBegin(config: FullConfig, suite: any) {
    this.startTime = Date.now();
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const errorMsg = result.error?.message || undefined;
    const stackTrace = result.error?.stack || undefined;
    const relativePath = path.relative(process.cwd(), test.location.file);

    // Traverse up the suite hierarchy to find the project name
    let projectName = 'unspecified';
    let parent = test.parent;
    while (parent) {
      const project = parent.project();
      if (project && project.name) {
        projectName = project.name;
        break;
      }
      parent = parent.parent;
    }

    // Translation function to map technical playwright commands into plain English
    const translateStepToEnglish = (title: string, category: string): string => {
      const clean = title.trim();

      if (category === 'hook') {
        if (clean.toLowerCase().includes('before')) return 'Preparing test environment contexts';
        if (clean.toLowerCase().includes('after')) return 'Cleaning up and closing test execution contexts';
        return clean;
      }

      if (category === 'expect') {
        let matcher = '';
        const matchReg = /expect\s*["']([^"']+)["']/i.exec(clean);
        if (matchReg) matcher = matchReg[1];

        let selector = '';
        const selReg = /locator\(['"]([^'"]+)['"]\)/i.exec(clean);
        if (selReg) selector = selReg[1];

        if (matcher === 'toBeVisible') {
          return selector ? `Verifying that element "${selector}" is visible` : 'Verifying element visibility';
        } else if (matcher === 'toBeHidden') {
          return selector ? `Verifying that element "${selector}" is hidden` : 'Verifying element is hidden';
        } else if (matcher === 'toHaveURL') {
          return 'Verifying that the current browser URL matches the expected path';
        } else if (matcher === 'toHaveTitle') {
          return 'Verifying that the current page title matches expectation';
        } else if (matcher === 'toContainText' || matcher === 'toHaveText') {
          return selector ? `Verifying that element "${selector}" contains expected text` : 'Verifying text contents of element';
        } else if (matcher === 'toBeEnabled') {
          return selector ? `Verifying that field "${selector}" is enabled` : 'Verifying field is enabled';
        } else if (matcher === 'toBeDisabled') {
          return selector ? `Verifying that field "${selector}" is disabled` : 'Verifying field is disabled';
        } else if (matcher === 'toBeChecked') {
          return selector ? `Verifying that checkbox "${selector}" is checked` : 'Verifying checkbox selection';
        } else if (['toBe', 'toEqual', 'toBeGreaterThan', 'toBeLessThanOrEqual'].includes(matcher)) {
          return 'Verifying numerical layout values match boundary expectations';
        }
        return `Asserting criteria: ${matcher}`;
      }

      if (category === 'pw:api') {
        if (clean.includes('click')) {
          const match = /click\((.*)\)/i.exec(clean);
          const selector = match ? match[1].replace(/['"]/g, '') : '';
          return selector ? `Clicking on element "${selector}"` : 'Clicking on page element';
        }
        if (clean.includes('fill')) {
          const match = /fill\((.*)\)/i.exec(clean);
          const selector = match ? match[1].split(',')[0].replace(/['"]/g, '') : '';
          return selector ? `Entering text value into field "${selector}"` : 'Typing text input';
        }
        if (clean.includes('clear')) {
          return 'Clearing text input field';
        }
        if (clean.includes('goto')) {
          const match = /goto\((.*)\)/i.exec(clean);
          const url = match ? match[1].replace(/['"]/g, '') : '';
          return url ? `Navigating browser to page URL: "${url}"` : 'Navigating to page';
        }
        if (clean.includes('hover')) {
          const match = /hover\((.*)\)/i.exec(clean);
          const selector = match ? match[1].replace(/['"]/g, '') : '';
          return selector ? `Hovering cursor over element "${selector}"` : 'Hovering over element';
        }
        if (clean.includes('press')) {
          const match = /press\((.*)\)/i.exec(clean);
          const key = match ? match[1].replace(/['"]/g, '') : '';
          return key ? `Pressing keyboard key: "${key}"` : 'Pressing keyboard key';
        }
        if (clean.includes('selectOption')) {
          const match = /selectOption\((.*)\)/i.exec(clean);
          const selector = match ? match[1].split(',')[0].replace(/['"]/g, '') : '';
          return selector ? `Selecting option in dropdown list "${selector}"` : 'Selecting dropdown option';
        }
      }

      return clean;
    };

    // Helper to recursively flatten the step tree while maintaining depth levels
    const flattenSteps = (steps: any[]): { step: any, depth: number }[] => {
      const flat: { step: any, depth: number }[] = [];
      const traverse = (list: any[], depth: number) => {
        for (const s of list) {
          flat.push({ step: s, depth });
          if (s.steps && s.steps.length > 0) {
            traverse(s.steps, depth + 1);
          }
        }
      };
      traverse(steps, 0);
      return flat;
    };

    const flatStepsList = flattenSteps(result.steps);

    // Extract chronological test execution steps with depth tracking
    const extractedSteps: CustomTestStep[] = flatStepsList.map(item => {
      const s = item.step;
      let displayCategory = 'action';
      if (s.category === 'expect') {
        displayCategory = 'assertion';
      } else if (s.category === 'hook') {
        displayCategory = 'hook';
      } else if (s.category === 'test.step') {
        displayCategory = 'step';
      } else if (s.category === 'pw:api') {
        displayCategory = 'api';
      }

      const friendlyTitle = translateStepToEnglish(s.title, s.category);

      return {
        title: friendlyTitle,
        category: displayCategory,
        duration: s.duration,
        error: s.error?.message || undefined,
        depth: item.depth
      };
    });

    // Print chronological steps directly to the console
    const statusSymbol = result.status === 'passed' ? '\x1b[32m✓\x1b[0m' : result.status === 'failed' ? '\x1b[31m✗\x1b[0m' : '\x1b[33m-\x1b[0m';
    const statusColor = result.status === 'passed' ? '\x1b[32m' : result.status === 'failed' ? '\x1b[31m' : '\x1b[33m';

    console.log(`\n${statusSymbol} ${statusColor}[${projectName.toUpperCase()}]\x1b[0m › \x1b[90m${relativePath}\x1b[0m › \x1b[1m${test.title}\x1b[0m (\x1b[36m${(result.duration / 1000).toFixed(2)}s\x1b[0m)`);
    
    if (extractedSteps.length > 0) {
      console.log('    \x1b[90mSteps Executed:\x1b[0m');
      extractedSteps.forEach((step, idx) => {
        const indent = '  '.repeat(step.depth || 0);
        let categoryColor = '\x1b[90m'; // Gray
        if (step.category === 'assertion') categoryColor = '\x1b[32m'; // Green
        if (step.category === 'api') categoryColor = '\x1b[33m'; // Yellow
        if (step.category === 'step') categoryColor = '\x1b[36m'; // Cyan
        if (step.category === 'hook') categoryColor = '\x1b[90m'; // Gray

        console.log(`      ${indent}\x1b[90m${idx + 1}.\x1b[0m ${categoryColor}[${step.category.toUpperCase()}]\x1b[0m \x1b[37m${step.title}\x1b[0m \x1b[90m(${step.duration}ms)\x1b[0m`);
        if (step.error) {
          console.log(`      ${indent}   \x1b[31m🚨 Error: ${step.error}\x1b[0m`);
        }
      });
    }

    this.testResults.push({
      id: test.id,
      title: test.title,
      suite: relativePath,
      browser: projectName,
      status: result.status,
      duration: result.duration,
      error: errorMsg,
      stack: stackTrace,
      steps: extractedSteps,
    });
  }

  async onEnd(result: FullResult) {
    const totalTime = Date.now() - this.startTime;
    const passed = this.testResults.filter(r => r.status === 'passed').length;
    const failed = this.testResults.filter(r => r.status === 'failed' || r.status === 'timedOut').length;
    const skipped = this.testResults.filter(r => r.status === 'skipped').length;
    const total = this.testResults.length;

    // Track failed test cases in failed-tests.json
    const failedTestsFile = path.resolve(process.cwd(), 'failed-tests.json');
    let failedTestsList: { file: string; title: string }[] = [];

    if (fs.existsSync(failedTestsFile)) {
      try {
        failedTestsList = JSON.parse(fs.readFileSync(failedTestsFile, 'utf8'));
      } catch (err) {
        failedTestsList = [];
      }
    }

    this.testResults.forEach(r => {
      const isFailed = r.status === 'failed' || r.status === 'timedOut';
      const isPassed = r.status === 'passed';
      const file = r.suite;
      const title = r.title;

      const index = failedTestsList.findIndex(t => t.file === file && t.title === title);

      if (isFailed) {
        if (index === -1) {
          failedTestsList.push({ file, title });
        }
      } else if (isPassed) {
        if (index !== -1) {
          failedTestsList.splice(index, 1);
        }
      }
    });

    try {
      fs.writeFileSync(failedTestsFile, JSON.stringify(failedTestsList, null, 2), 'utf8');
    } catch (err) {
      console.error('\x1b[31mFailed to write failed-tests.json:\x1b[0m', err);
    }

    // Resolve environment name
    const activeEnv = (process.env.TEST_ENV || 'qa').toUpperCase();

    const reportData: ReportData = {
      env: activeEnv,
      startTime: new Date(this.startTime).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      }),
      totalDuration: (totalTime / 1000).toFixed(2),
      stats: { total, passed, failed, skipped },
      results: this.testResults,
    };

    const reportHtml = this.generateHtmlReport(reportData);
    const reportsDir = path.resolve(process.cwd(), 'reports');

    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const reportPath = path.join(reportsDir, 'custom-report.html');
    fs.writeFileSync(reportPath, reportHtml, 'utf8');

    console.log('\n\x1b[36m==================================================\x1b[0m');
    console.log('\x1b[32m%s\x1b[0m', '  🚀 CUSTOM PLAYWRIGHT HTML REPORT GENERATED!');
    console.log('\x1b[36m%s\x1b[0m', `  Path: reports/custom-report.html`);
    console.log('\x1b[36m==================================================\x1b[0m\n');
  }

  private generateHtmlReport(data: ReportData): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Playwright Custom Test Report - Unitek Automation</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-main: #0b0f19;
      --bg-card: #151b2c;
      --bg-item: #1e2538;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --border-color: #2a344a;
      
      --color-primary: #6366f1;
      --color-success: #10b981;
      --color-danger: #ef4444;
      --color-warning: #f59e0b;
      
      --glow-success: rgba(16, 185, 129, 0.15);
      --glow-danger: rgba(239, 68, 68, 0.15);
      --glow-warning: rgba(245, 158, 11, 0.15);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: var(--bg-main);
      color: var(--text-main);
      line-height: 1.5;
      padding: 2.5rem 1.5rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    /* --- Header Styles --- */
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 1.5rem;
    }

    .brand-title {
      font-size: 1.75rem;
      font-weight: 700;
      background: linear-gradient(135deg, #a5b4fc 0%, #6366f1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.5px;
    }

    .meta-badges {
      display: flex;
      gap: 0.75rem;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 0.35rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      border: 1px solid var(--border-color);
    }

    .badge-env {
      background-color: rgba(99, 102, 241, 0.1);
      border-color: rgba(99, 102, 241, 0.3);
      color: #818cf8;
    }

    .badge-duration {
      background-color: rgba(245, 158, 11, 0.1);
      border-color: rgba(245, 158, 11, 0.3);
      color: var(--color-warning);
    }

    .badge-time {
      background-color: rgba(148, 163, 184, 0.1);
      color: var(--text-muted);
    }

    /* --- Stats Panel --- */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem;
      margin-bottom: 2.5rem;
    }

    .stat-card {
      background-color: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.5rem;
      position: relative;
      overflow: hidden;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
    }

    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
    }

    .stat-card.total::before { background-color: var(--color-primary); }
    .stat-card.passed::before { background-color: var(--color-success); }
    .stat-card.failed::before { background-color: var(--color-danger); }
    .stat-card.skipped::before { background-color: var(--color-warning); }

    .stat-label {
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.75px;
      margin-bottom: 0.5rem;
    }

    .stat-value {
      font-size: 2.25rem;
      font-weight: 700;
      line-height: 1;
    }

    /* --- Search & Controls --- */
    .controls-panel {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .search-wrapper {
      position: relative;
      flex: 1;
      max-width: 450px;
    }

    .search-input {
      width: 100%;
      background-color: var(--bg-card);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      padding: 0.65rem 1rem;
      padding-left: 2.5rem;
      border-radius: 10px;
      font-size: 0.95rem;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
    }

    .search-icon {
      position: absolute;
      left: 0.85rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      pointer-events: none;
    }

    .filter-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .filter-btn {
      background-color: var(--bg-card);
      border: 1px solid var(--border-color);
      color: var(--text-muted);
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .filter-btn:hover {
      background-color: var(--bg-item);
      color: var(--text-main);
    }

    .filter-btn.active {
      background-color: var(--color-primary);
      color: #ffffff;
      border-color: var(--color-primary);
      box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.2);
    }

    /* --- Test Items Layout --- */
    .test-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .test-item {
      background-color: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      overflow: hidden;
      transition: border-color 0.2s ease;
    }

    .test-item:hover {
      border-color: #3b4764;
    }

    .test-item.passed { border-left: 4px solid var(--color-success); }
    .test-item.failed { border-left: 4px solid var(--color-danger); }
    .test-item.skipped { border-left: 4px solid var(--color-warning); }

    .test-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.25rem;
      cursor: pointer;
      user-select: none;
    }

    .test-info-left {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .test-suite-path {
      font-size: 0.75rem;
      font-family: 'JetBrains Mono', monospace;
      color: var(--text-muted);
    }

    .test-title {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--text-main);
    }

    .test-meta-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .test-browser {
      background-color: #202940;
      color: #93c5fd;
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.25px;
    }

    .test-duration {
      font-size: 0.85rem;
      color: var(--text-muted);
      font-family: 'JetBrains Mono', monospace;
    }

    .status-indicator {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      padding: 0.25rem 0;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .passed .status-indicator {
      background-color: var(--glow-success);
      color: var(--color-success);
      border: 1px solid rgba(16, 185, 129, 0.2);
    }

    .failed .status-indicator {
      background-color: var(--glow-danger);
      color: var(--color-danger);
      border: 1px solid rgba(239, 68, 68, 0.2);
    }

    .skipped .status-indicator {
      background-color: var(--glow-warning);
      color: var(--color-warning);
      border: 1px solid rgba(245, 158, 11, 0.2);
    }

    /* --- Expandable details --- */
    .test-details {
      display: block;
      background-color: var(--bg-item);
      border-top: 1px solid var(--border-color);
      padding: 1.25rem;
    }

    .chevron-arrow {
      display: inline-block;
      font-size: 0.6rem;
      color: var(--text-muted);
      margin-left: 0.75rem;
      transition: transform 0.2s ease;
      transform: rotate(0deg);
    }

    .test-item.expanded .chevron-arrow {
      transform: rotate(90deg);
    }

    /* --- Chronological Steps Executed --- */
    .steps-section {
      margin-top: 1rem;
      border-top: 1px dashed var(--border-color);
      padding-top: 1rem;
    }

    .steps-title {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.75px;
      margin-bottom: 0.75rem;
    }

    .steps-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .step-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 0.5rem 0.75rem;
      font-size: 0.85rem;
      transition: border-color 0.15s ease;
    }

    .step-item:hover {
      border-color: #3b4764;
    }

    .step-meta-left {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .step-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.25px;
      padding: 0.1rem 0.4rem;
      border-radius: 4px;
      width: 75px;
      text-align: center;
    }

    .step-badge.step {
      background-color: rgba(99, 102, 241, 0.1);
      color: #818cf8;
      border: 1px solid rgba(99, 102, 241, 0.2);
    }

    .step-badge.assertion {
      background-color: rgba(16, 185, 129, 0.1);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.2);
    }

    .step-badge.api {
      background-color: rgba(245, 158, 11, 0.1);
      color: #fbbf24;
      border: 1px solid rgba(245, 158, 11, 0.2);
    }

    .step-badge.hook {
      background-color: rgba(148, 163, 184, 0.1);
      color: #cbd5e1;
      border: 1px solid rgba(148, 163, 184, 0.2);
    }

    .step-badge.action {
      background-color: rgba(239, 68, 68, 0.1);
      color: #fda4af;
      border: 1px solid rgba(239, 68, 68, 0.2);
    }

    .step-title-text {
      color: var(--text-main);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
    }

    .step-duration {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-family: 'JetBrains Mono', monospace;
    }

    .error-alert {
      background-color: rgba(239, 68, 68, 0.05);
      border: 1px solid rgba(239, 68, 68, 0.2);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 0.75rem;
    }

    .error-title {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--color-danger);
      margin-bottom: 0.35rem;
    }

    .error-msg {
      font-size: 0.85rem;
      color: #fda4af;
      font-family: 'JetBrains Mono', monospace;
      white-space: pre-wrap;
    }

    .stack-trace {
      background-color: #0c0f17;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 1rem;
      overflow-x: auto;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #e2e8f0;
      line-height: 1.6;
    }

    .stack-title {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .no-results {
      text-align: center;
      padding: 4rem 2rem;
      color: var(--text-muted);
      background-color: var(--bg-card);
      border: 1px dashed var(--border-color);
      border-radius: 12px;
      display: none;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .controls-panel {
        flex-direction: column;
        align-items: stretch;
      }
      .search-wrapper {
        max-width: none;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div>
        <h1 class="brand-title">Unitek Automation</h1>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.25rem;">Playwright Automated Test Execution Report</p>
      </div>
      <div class="meta-badges">
        <span class="badge badge-env">Env: ${data.env}</span>
        <span class="badge badge-duration">Duration: ${data.totalDuration}s</span>
        <span class="badge badge-time">${data.startTime}</span>
      </div>
    </header>

    <div class="stats-grid">
      <div class="stat-card total">
        <div class="stat-label">Total Tests</div>
        <div class="stat-value" id="stats-total">${data.stats.total}</div>
      </div>
      <div class="stat-card passed">
        <div class="stat-label">Passed</div>
        <div class="stat-value" style="color: var(--color-success);" id="stats-passed">${data.stats.passed}</div>
      </div>
      <div class="stat-card failed">
        <div class="stat-label">Failed</div>
        <div class="stat-value" style="color: var(--color-danger);" id="stats-failed">${data.stats.failed}</div>
      </div>
      <div class="stat-card skipped">
        <div class="stat-label">Skipped</div>
        <div class="stat-value" style="color: var(--color-warning);" id="stats-skipped">${data.stats.skipped}</div>
      </div>
    </div>

    <div class="controls-panel">
      <div class="search-wrapper">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" class="search-input" id="search-box" placeholder="Search tests by title or suite...">
      </div>
      <div class="filter-buttons">
        <button class="filter-btn active" data-status="all">All</button>
        <button class="filter-btn" data-status="passed" style="border-bottom: 2px solid var(--color-success)">Passed</button>
        <button class="filter-btn" data-status="failed" style="border-bottom: 2px solid var(--color-danger)">Failed</button>
        <button class="filter-btn" data-status="skipped" style="border-bottom: 2px solid var(--color-warning)">Skipped</button>
      </div>
      <div style="display: flex; gap: 0.5rem;">
        <button class="filter-btn" style="background-color: rgba(99,102,241,0.05); color: #818cf8; border-color: rgba(99,102,241,0.2);" onclick="toggleAllDetails(true)">Expand All</button>
        <button class="filter-btn" onclick="toggleAllDetails(false)">Collapse All</button>
      </div>
    </div>

    <div class="test-list" id="test-list-container">
      <!-- Generated via JS -->
    </div>

    <div class="no-results" id="no-results-alert">
      <h3>No matching tests found</h3>
      <p style="font-size: 0.9rem; margin-top: 0.5rem;">Try adjusting your search query or status filter.</p>
    </div>
  </div>

  <script>
    // Embedded Raw Test Results JSON
    const reportData = ${JSON.stringify(data.results)};

    // Elements
    const listContainer = document.getElementById('test-list-container');
    const searchBox = document.getElementById('search-box');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const noResultsAlert = document.getElementById('no-results-alert');

    let currentFilter = 'all';
    let currentSearch = '';

    // Render Function
    function renderTests() {
      listContainer.innerHTML = '';
      
      const filtered = reportData.filter(test => {
        const matchesStatus = currentFilter === 'all' || test.status === currentFilter;
        const matchesSearch = test.title.toLowerCase().includes(currentSearch.toLowerCase()) || 
                              test.suite.toLowerCase().includes(currentSearch.toLowerCase());
        return matchesStatus && matchesSearch;
      });

      if (filtered.length === 0) {
        noResultsAlert.style.display = 'block';
        return;
      }
      
      noResultsAlert.style.display = 'none';

      filtered.forEach(test => {
        const item = document.createElement('div');
        item.className = 'test-item expanded ' + test.status;
        
        let stepsHtml = '';
        if (test.steps && test.steps.length > 0) {
          stepsHtml = \`
            <div class="steps-section">
              <div class="steps-title">Steps Executed</div>
              <div class="steps-list">
                 \${test.steps.map(step => {
                  const indentStyle = step.depth ? \`style="margin-left: \\\${step.depth * 1.25}rem; border-left: 2px solid var(--border-color); opacity: 0.95;"\` : '';
                  return \`
                    <div class="step-item" \${indentStyle}>
                      <div class="step-meta-left">
                        <span class="step-badge \${step.category}">\${step.category}</span>
                        <span class="step-title-text">\${escapeHtml(step.title)}</span>
                      </div>
                      <span class="step-duration">\${step.duration}ms</span>
                    </div>
                  \`;
                }).join('')}
              </div>
            </div>
          \`;
        }

        const detailsHtml = \`
          <div class="test-details" id="details-\${test.id}" style="display: block;">
            \${test.error ? \`
              <div class="error-alert">
                <div class="error-title">Failure Message</div>
                <div class="error-msg">\${escapeHtml(test.error)}</div>
              </div>
            \` : ''}
            \${test.stack ? \`
              <div class="stack-title">Call Stack Trace</div>
              <pre class="stack-trace">\${escapeHtml(test.stack)}</pre>
            \` : ''}
            \${stepsHtml}
          </div>
        \`;

        const durationS = (test.duration / 1000).toFixed(2);

        item.innerHTML = \`
          <div class="test-header" onclick="toggleDetails('\${test.id}')">
            <div class="test-info-left">
              <span class="test-suite-path">\${escapeHtml(test.suite)}</span>
              <span class="test-title">\${escapeHtml(test.title)}</span>
            </div>
            <div class="test-meta-right">
              <span class="test-browser">\${escapeHtml(test.browser)}</span>
              <span class="test-duration">\${durationS}s</span>
              <span class="status-indicator">\${test.status === 'timedOut' ? 'timeout' : test.status}</span>
              <span class="chevron-arrow">▶</span>
            </div>
          </div>
          \${detailsHtml}
        \`;

        listContainer.appendChild(item);
      });
    }

    // Toggle Panel
    window.toggleDetails = function(id) {
      const panel = document.getElementById('details-' + id);
      if (!panel) return;
      
      const itemEl = panel.parentElement;
      if (panel.style.display === 'block') {
        panel.style.display = 'none';
        itemEl.classList.remove('expanded');
      } else {
        panel.style.display = 'block';
        itemEl.classList.add('expanded');
      }
    };

    // Global toggle for all details
    window.toggleAllDetails = function(expand) {
      const panels = document.querySelectorAll('.test-details');
      panels.forEach(panel => {
        const itemEl = panel.parentElement;
        if (expand) {
          panel.style.display = 'block';
          itemEl.classList.add('expanded');
        } else {
          panel.style.display = 'none';
          itemEl.classList.remove('expanded');
        }
      });
    };

    // Helper to prevent HTML Injection
    function escapeHtml(str) {
      if (!str) return '';
      return str.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    // Event Listeners
    searchBox.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderTests();
    });

    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.getAttribute('data-status');
        renderTests();
      });
    });

    // Init Page Load
    renderTests();
  </script>
</body>
</html>`;
  }
}

export default CustomReporter;
