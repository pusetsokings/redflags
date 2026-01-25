/**
 * Privacy-Preserving Monitoring
 * Tracks errors and performance without collecting user data
 */

import { logger } from './logger';

interface ErrorReport {
  message: string;
  stack?: string;
  timestamp: string;
  userAgent: string;
  url: string;
  context?: Record<string, unknown>;
}

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: string;
}

class PrivacyPreservingMonitor {
  private errorReports: ErrorReport[] = [];
  private performanceMetrics: PerformanceMetric[] = [];
  private maxReports = 50; // Limit stored reports

  /**
   * Report error (privacy-preserving)
   */
  reportError(error: Error, context?: Record<string, unknown>): void {
    // Sanitize context (remove any PII)
    const sanitizedContext = this.sanitizeContext(context);
    
    const report: ErrorReport = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href.split('?')[0], // Remove query params
      context: sanitizedContext,
    };
    
    this.errorReports.push(report);
    
    // Keep only last N reports
    if (this.errorReports.length > this.maxReports) {
      this.errorReports.shift();
    }
    
    // Log to console (for debugging)
    logger.logError(error, sanitizedContext);
    
    // In production, you could send to error tracking service here
    // But never send user data or sensitive information
  }

  /**
   * Track performance metric
   */
  trackPerformance(name: string, value: number): void {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: new Date().toISOString(),
    };
    
    this.performanceMetrics.push(metric);
    
    // Keep only last N metrics
    if (this.performanceMetrics.length > this.maxReports) {
      this.performanceMetrics.shift();
    }
  }

  /**
   * Get Web Vitals
   */
  trackWebVitals(): void {
    // Track Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number };
          const lcp = lastEntry.renderTime || lastEntry.loadTime || 0;
          this.trackPerformance('LCP', lcp);
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // PerformanceObserver not supported
      }

      // Track First Input Delay (FID)
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const fid = (entry as PerformanceEventTiming).processingStart - entry.startTime;
            this.trackPerformance('FID', fid);
          });
        });
        observer.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // PerformanceObserver not supported
      }

      // Track Cumulative Layout Shift (CLS)
      try {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          this.trackPerformance('CLS', clsValue);
        });
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // PerformanceObserver not supported
      }
    }
  }

  /**
   * Export error reports (for debugging)
   */
  exportErrorReports(): string {
    return JSON.stringify(this.errorReports, null, 2);
  }

  /**
   * Export performance metrics (for debugging)
   */
  exportPerformanceMetrics(): string {
    return JSON.stringify(this.performanceMetrics, null, 2);
  }

  /**
   * Clear all reports
   */
  clearReports(): void {
    this.errorReports = [];
    this.performanceMetrics = [];
  }

  /**
   * Sanitize context (remove PII)
   */
  private sanitizeContext(context?: Record<string, unknown>): Record<string, unknown> | undefined {
    if (!context) return undefined;
    
    const sensitiveKeys = ['pin', 'password', 'token', 'apiKey', 'userData', 'journalEntry', 'content', 'message'];
    const sanitized: Record<string, unknown> = {};
    
    for (const [key, value] of Object.entries(context)) {
      if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = '[OBJECT]';
      } else {
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  }
}

// Export singleton
export const monitor = new PrivacyPreservingMonitor();

// Initialize Web Vitals tracking
if (typeof window !== 'undefined') {
  monitor.trackWebVitals();
}

