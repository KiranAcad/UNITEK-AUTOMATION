/**
 * Environment Configuration Loader
 * ---------------------------------
 * Reads the appropriate .env file based on TEST_ENV environment variable.
 * Defaults to 'qa' if not specified.
 *
 * Usage:
 *   TEST_ENV=uat npx playwright test  →  loads .env.uat
 *   npx playwright test               →  loads .env.qa (default)
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

/** Supported environment names */
export type Environment = 'qa' | 'uat' | 'staging' | 'prod';

/** Typed environment configuration interface */
export interface EnvConfig {
  BASE_URL: string;
  ENV_NAME: string;
  HEADLESS: boolean;
  TIMEOUT: number;
  EXPECT_TIMEOUT: number;
  RETRY_COUNT: number;
  WORKERS: number;
}

/**
 * Determines the current environment and loads the corresponding .env file.
 * Falls back to 'qa' if TEST_ENV is not set or invalid.
 */
function loadEnvConfig(): EnvConfig {
  const env = (process.env.TEST_ENV || 'qa').toLowerCase() as Environment;
  const validEnvs: Environment[] = ['qa', 'uat', 'staging', 'prod'];

  if (!validEnvs.includes(env)) {
    console.warn(
      `⚠️  Invalid TEST_ENV="${env}". Valid options: ${validEnvs.join(', ')}. Falling back to "qa".`
    );
  }

  const envFile = path.resolve(process.cwd(), `.env.${validEnvs.includes(env) ? env : 'qa'}`);
  dotenv.config({ path: envFile });

  console.log(`🌍 Environment loaded: ${process.env.ENV_NAME || env.toUpperCase()} (${envFile})`);

  return {
    BASE_URL: process.env.BASE_URL || 'https://qa.unitekcollege.edu/',
    ENV_NAME: process.env.ENV_NAME || 'QA',
    HEADLESS: process.env.HEADLESS !== 'false',
    TIMEOUT: parseInt(process.env.TIMEOUT || '30000', 10),
    EXPECT_TIMEOUT: parseInt(process.env.EXPECT_TIMEOUT || '10000', 10),
    RETRY_COUNT: parseInt(process.env.RETRY_COUNT || '2', 10),
    WORKERS: parseInt(process.env.WORKERS || '4', 10),
  };
}

/** Singleton config instance — loaded once and reused */
export const envConfig: EnvConfig = loadEnvConfig();
