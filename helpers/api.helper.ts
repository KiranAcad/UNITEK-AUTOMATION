/**
 * API Helper
 * ----------
 * Playwright request-based API helper for test setup/teardown.
 */

import { APIRequestContext, request } from '@playwright/test';
import { logger } from '../logger';
import { envConfig } from '../config/env.config';

export class APIHelper {
  private requestContext!: APIRequestContext;

  /** Initialize the API request context */
  async init(baseURL?: string): Promise<void> {
    this.requestContext = await request.newContext({
      baseURL: baseURL || envConfig.BASE_URL,
      ignoreHTTPSErrors: true,
    });
    logger.info('API Helper initialized');
  }

  /** Send a GET request */
  async get(url: string, headers?: Record<string, string>) {
    logger.info(`API GET: ${url}`);
    const response = await this.requestContext.get(url, { headers });
    logger.info(`API GET response: ${response.status()}`);
    return response;
  }

  /** Send a POST request */
  async post(url: string, data?: unknown, headers?: Record<string, string>) {
    logger.info(`API POST: ${url}`);
    const response = await this.requestContext.post(url, {
      data,
      headers: { 'Content-Type': 'application/json', ...headers },
    });
    logger.info(`API POST response: ${response.status()}`);
    return response;
  }

  /** Send a PUT request */
  async put(url: string, data?: unknown, headers?: Record<string, string>) {
    logger.info(`API PUT: ${url}`);
    const response = await this.requestContext.put(url, {
      data,
      headers: { 'Content-Type': 'application/json', ...headers },
    });
    logger.info(`API PUT response: ${response.status()}`);
    return response;
  }

  /** Send a DELETE request */
  async delete(url: string, headers?: Record<string, string>) {
    logger.info(`API DELETE: ${url}`);
    const response = await this.requestContext.delete(url, { headers });
    logger.info(`API DELETE response: ${response.status()}`);
    return response;
  }

  /** Dispose the request context */
  async dispose(): Promise<void> {
    await this.requestContext.dispose();
    logger.info('API Helper disposed');
  }
}
