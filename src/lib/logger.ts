/**
 * Logger Utility
 * Provides consistent logging with environment-aware behavior
 * Removes console statements in production builds
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private isDevelopment = import.meta.env.DEV;
  private isProduction = import.meta.env.PROD;

  private shouldLog(level: LogLevel): boolean {
    // In production, only log errors
    if (this.isProduction) {
      return level === 'error';
    }
    // In development, log everything
    return true;
  }

  debug(...args: unknown[]): void {
    if (this.shouldLog('debug')) {
      console.debug('[DEBUG]', ...args);
    }
  }

  info(...args: unknown[]): void {
    if (this.shouldLog('info')) {
      console.info('[INFO]', ...args);
    }
  }

  warn(...args: unknown[]): void {
    if (this.shouldLog('warn')) {
      console.warn('[WARN]', ...args);
    }
  }

  error(...args: unknown[]): void {
    // Always log errors, even in production
    // But in production, we might want to send to error tracking service
    console.error('[ERROR]', ...args);
    
    // In production, you could send to error tracking service here
    // Example: errorTrackingService.logError(args);
  }

  /**
   * Logs errors without exposing sensitive user data
   */
  logError(error: Error, context?: Record<string, unknown>): void {
    const errorData = {
      message: error.message,
      stack: error.stack,
      name: error.name,
      context: context ? this.sanitizeContext(context) : undefined,
      timestamp: new Date().toISOString(),
    };

    this.error('Application error:', errorData);

    // In production, send to error tracking service
    if (this.isProduction) {
      // errorTrackingService.logError(errorData);
    }
  }

  /**
   * Removes sensitive data from context before logging
   */
  private sanitizeContext(context: Record<string, unknown>): Record<string, unknown> {
    const sensitiveKeys = ['pin', 'password', 'token', 'apiKey', 'userData', 'journalEntry'];
    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(context)) {
      if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        sanitized[key] = '[REDACTED]';
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }
}

// Export singleton instance
export const logger = new Logger();

// Export for convenience
export default logger;

