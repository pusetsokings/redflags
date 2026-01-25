/**
 * Secure Storage Wrapper
 * Provides encrypted storage for sensitive data using user's PIN
 */

import { encryptData, decryptData } from './encryption';
import { logger } from './logger';

const STORAGE_VERSION_KEY = 'storage_version';
const CURRENT_STORAGE_VERSION = '2.0'; // Version with encryption

// Track whether we've initialized secure storage in this session
let secureStorageInitialized = false;

/**
 * Check if storage is encrypted
 */
export function isStorageEncrypted(): boolean {
  const version = localStorage.getItem(STORAGE_VERSION_KEY);
  return version === CURRENT_STORAGE_VERSION;
}

/**
 * Get user PIN (for encryption/decryption)
 * Returns null if PIN not available
 */
function getUserPin(): string | null {
  // Try to get hashed PIN first (new format)
  const hashedPin = localStorage.getItem('userPinHash');
  if (hashedPin) {
    // For encryption, we need the actual PIN, not the hash
    // We'll need to get it from the user during unlock
    // For now, check if we have it in session storage (temporary, cleared on close)
    const sessionPin = sessionStorage.getItem('currentPin');
    return sessionPin || null;
  }
  
  // Fallback to old plain text PIN (for migration)
  const plainPin = localStorage.getItem('userPin');
  return plainPin || null;
}

/**
 * Set current PIN in session (temporary, for encryption/decryption)
 * This is set when user unlocks the app
 */
export function setCurrentPin(pin: string): void {
  sessionStorage.setItem('currentPin', pin);
}

/**
 * Clear current PIN from session
 */
export function clearCurrentPin(): void {
  sessionStorage.removeItem('currentPin');
}

/**
 * Encrypt and save data
 */
async function saveEncrypted(key: string, data: any, pin: string): Promise<void> {
  try {
    const jsonData = JSON.stringify(data);
    const encrypted = await encryptData(jsonData, pin);
    localStorage.setItem(key, encrypted);
    localStorage.setItem(`${key}_encrypted`, 'true');
  } catch (error) {
    logger.logError(error instanceof Error ? error : new Error('Encryption failed'), {
      context: 'secureStorage',
      action: 'saveEncrypted',
      key
    });
    throw new Error('Failed to save encrypted data');
  }
}

/**
 * Decrypt and load data
 */
async function loadEncrypted(key: string, pin: string): Promise<any | null> {
  try {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
    
    const decrypted = await decryptData(encrypted, pin);
    return JSON.parse(decrypted);
  } catch (error) {
    logger.logError(error instanceof Error ? error : new Error('Decryption failed'), {
      context: 'secureStorage',
      action: 'loadEncrypted',
      key
    });
    // If decryption fails, data might be corrupted or PIN is wrong
    return null;
  }
}

/**
 * Save data (encrypted if PIN available, otherwise plain)
 */
export async function saveSecureData(key: string, data: any): Promise<void> {
  const pin = getUserPin();
  
  if (pin && isStorageEncrypted()) {
    await saveEncrypted(key, data, pin);
  } else {
    // Fallback to plain storage (for migration period)
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(`${key}_encrypted`, 'false');
  }
}

/**
 * Load data (decrypt if encrypted, otherwise plain)
 */
export async function loadSecureData(key: string): Promise<any | null> {
  const pin = getUserPin();
  const isEncrypted = localStorage.getItem(`${key}_encrypted`) === 'true';
  
  if (pin && isEncrypted) {
    return await loadEncrypted(key, pin);
  } else {
    // Fallback to plain storage
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}

/**
 * Migrate unencrypted data to encrypted format
 */
export async function migrateToEncrypted(pin: string): Promise<void> {
  try {
    const keys = ['journal_entries', 'assessments', 'chat_history', 'app_settings'];
    
    for (const key of keys) {
      const isEncrypted = localStorage.getItem(`${key}_encrypted`) === 'true';
      
      if (!isEncrypted) {
        const data = localStorage.getItem(key);
        if (data) {
          // Encrypt existing data
          await saveEncrypted(key, JSON.parse(data), pin);
          logger.info(`Migrated ${key} to encrypted format`);
        }
      }
    }
    
    // Mark storage as encrypted
    localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_STORAGE_VERSION);
    logger.info('Storage migration to encrypted format completed');
  } catch (error) {
    logger.logError(error instanceof Error ? error : new Error('Migration failed'), {
      context: 'secureStorage',
      action: 'migrateToEncrypted'
    });
    throw error;
  }
}

/**
 * Check if migration is needed
 */
export function needsMigration(): boolean {
  return !isStorageEncrypted();
}

/**
 * Initialize secure storage (migrate if needed).
 * Should be called after the user unlocks the app and we have the PIN.
 */
export async function initializeSecureStorage(pin: string): Promise<void> {
  if (secureStorageInitialized) return;

  try {
    setCurrentPin(pin);

    if (needsMigration()) {
      await migrateToEncrypted(pin);
      logger.info('Secure storage initialized and migrated to encrypted format');
    }

    secureStorageInitialized = true;
  } catch (error) {
    logger.logError(error instanceof Error ? error : new Error('Storage initialization failed'), {
      context: 'secureStorage',
      action: 'initializeSecureStorage',
    });
    // Continue with plain storage if initialization fails
  }
}

