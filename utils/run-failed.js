const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const failedTestsFile = path.resolve(__dirname, '../failed-tests.json');

if (!fs.existsSync(failedTestsFile)) {
  console.log('\n\x1b[33mNo failed-tests.json file found! All clean! 🎉\x1b[0m\n');
  process.exit(0);
}

let failedTests = [];
try {
  failedTests = JSON.parse(fs.readFileSync(failedTestsFile, 'utf8'));
} catch (e) {
  console.error('\n\x1b[31mError reading failed-tests.json:\x1b[0m', e);
  process.exit(1);
}

if (failedTests.length === 0) {
  console.log('\n\x1b[32mNo currently failing test cases! All tests passed! 🚀\x1b[0m\n');
  process.exit(0);
}

console.log(`\n\x1b[36m==================================================\x1b[0m`);
console.log(`\x1b[35m  🔥 RUNNING ONLY FAILED TEST CASES (${failedTests.length} tests)\x1b[0m`);
console.log(`\x1b[36m==================================================\x1b[0m\n`);

// Group by file path and construct grep pattern
const files = [...new Set(failedTests.map(t => t.file))];
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const grepPattern = failedTests.map(t => escapeRegex(t.title)).join('|');

const env = process.env.TEST_ENV || 'qa';

const args = [
  'playwright',
  'test',
  ...files,
  '--grep',
  grepPattern,
  ...process.argv.slice(2)
];

console.log(`\x1b[90mCommand: cross-env TEST_ENV=${env} npx ${args.join(' ')}\x1b[0m\n`);

const cmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const child = spawn(cmd, args, {
  stdio: 'inherit',
  env: { ...process.env, TEST_ENV: env }
});

child.on('exit', (code) => {
  process.exit(code === null ? 1 : code);
});
