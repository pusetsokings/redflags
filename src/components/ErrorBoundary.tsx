import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './ui/button';
import { monitor } from '../lib/monitoring';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorFallbackProps {
  error: Error;
  errorInfo: React.ErrorInfo | null;
  reset: () => void;
}

/**
 * Default error fallback component
 */
function DefaultErrorFallback({ error, errorInfo, reset }: ErrorFallbackProps) {
  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card text-card-foreground rounded-3xl p-8 shadow-xl border-4 border-border">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center mx-auto mb-4 border-3 border-border">
            <AlertTriangle className="w-8 h-8 text-destructive-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Something went wrong
          </h1>
          <p className="text-muted-foreground text-sm">
            We're sorry, but something unexpected happened. Your data is safe and stored locally.
          </p>
        </div>

        {import.meta.env.DEV && error && (
          <div className="mb-6 p-4 bg-muted rounded-2xl border-2 border-border">
            <p className="text-xs font-mono text-muted-foreground break-all mb-2">
              <strong>Error:</strong> {error.message}
            </p>
            {errorInfo && (
              <details className="text-xs font-mono text-muted-foreground">
                <summary className="cursor-pointer mb-2">Stack trace</summary>
                <pre className="overflow-auto text-[10px]">
                  {errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        )}

        <div className="space-y-3">
          <Button
            onClick={reset}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-2xl border-3 border-border font-bold"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          
          <Button
            onClick={handleReload}
            variant="outline"
            className="w-full border-3 border-border bg-card hover:bg-muted h-12 rounded-2xl text-foreground font-bold"
          >
            Reload App
          </Button>

          <Button
            onClick={handleGoHome}
            variant="outline"
            className="w-full border-2 border-border bg-card hover:bg-muted h-12 rounded-2xl text-muted-foreground font-medium"
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Home
          </Button>
        </div>

        <div className="mt-6 pt-6 border-t-2 border-border">
          <p className="text-xs text-muted-foreground text-center">
            If this problem persists, please export your data from Settings and contact support.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * React Error Boundary
 * Catches JavaScript errors anywhere in the child component tree
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Report error to monitoring (privacy-preserving)
    monitor.reportError(error, {
      componentStack: errorInfo.componentStack,
      context: 'ErrorBoundary',
    });

    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const Fallback = this.props.fallback || DefaultErrorFallback;
      return (
        <Fallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          reset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

