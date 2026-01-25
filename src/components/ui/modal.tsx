/**
 * Accessible Modal Component
 * Provides focus trap and ARIA attributes
 */

import { useEffect, useRef } from 'react';
import { trapFocus } from '../../lib/accessibility';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export function AccessibleModal({ isOpen, onClose, title, children, ariaLabel }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Store previous active element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Trap focus
      const cleanup = trapFocus(modalRef.current);
      
      // Handle Escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        cleanup();
        document.removeEventListener('keydown', handleEscape);
        // Restore focus
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-label={ariaLabel || title}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-3xl p-6 max-w-md w-full border-4 border-[#1A1A2E] shadow-2xl"
        role="document"
      >
        <h2 id="modal-title" className="sr-only">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

