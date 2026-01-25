/**
 * Accessibility Utilities
 * Provides utilities for better accessibility
 */

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Trap focus within an element (for modals)
 */
export function trapFocus(element: HTMLElement): () => void {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  const handleTab = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  };
  
  element.addEventListener('keydown', handleTab);
  
  // Focus first element
  firstElement?.focus();
  
  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTab);
  };
}

/**
 * Skip to main content link
 */
export function createSkipLink(): void {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#4B2E83] focus:text-white focus:rounded-xl focus:font-bold';
  skipLink.setAttribute('aria-label', 'Skip to main content');
  
  document.body.insertBefore(skipLink, document.body.firstChild);
}

/**
 * Get accessible label for icon-only buttons
 */
export function getAccessibleLabel(iconName: string, action?: string): string {
  const labels: Record<string, string> = {
    'settings': 'Settings',
    'delete': 'Delete',
    'edit': 'Edit',
    'close': 'Close',
    'send': 'Send message',
    'lock': 'Lock app',
    'unlock': 'Unlock app',
    'home': 'Home',
    'journal': 'Journal',
    'insights': 'Insights',
    'library': 'Library',
    'chat': 'Chat',
    'plus': 'Add',
    'shield': 'Quick exit',
    'help': 'Help',
  };
  
  return action ? `${labels[iconName] || iconName}: ${action}` : labels[iconName] || iconName;
}

