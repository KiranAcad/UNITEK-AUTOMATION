import { createLogger, format, transports, Logger } from 'winston';
import * as path from 'path';
import * as fs from 'fs';
import { AsyncLocalStorage } from 'async_hooks';

// Ensure logs directory exists
const logsDir = path.resolve(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Structured JSON format with timestamps
const jsonFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  format.errors({ stack: true }),
  format.json()
);

// Colorized console format for local developer readability
const consoleFormat = format.combine(
  format.colorize({ all: true }),
  format.timestamp({ format: 'HH:mm:ss.SSS' }),
  format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? ` | ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] ${level}: ${message}${metaStr}`;
  })
);

// Configure the root Winston logger
export const rootLogger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: jsonFormat,
  defaultMeta: { framework: 'unitek-automation' },
  transports: [
    new transports.Console({
      format: consoleFormat,
      level: 'info'
    }),
    new transports.File({
      filename: path.join(logsDir, 'tests.log'),
      level: 'debug',
      maxsize: 10 * 1024 * 1024,
      maxFiles: 5
    })
  ]
});

// AsyncLocalStorage to hold the active child logger for the current test
export const loggerStorage = new AsyncLocalStorage<Logger>();

// Export a proxy/wrapper for logger that automatically resolves to the test-specific child logger
export const logger = new Proxy(rootLogger, {
  get(target, prop, receiver) {
    const activeLogger = loggerStorage.getStore() || rootLogger;
    const value = Reflect.get(activeLogger, prop, receiver);
    if (typeof value === 'function') {
      return value.bind(activeLogger);
    }
    return value;
  }
}) as Logger;
