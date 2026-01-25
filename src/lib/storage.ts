import type { JournalEntry, AssessmentResult, ChatMessage } from './types';
import { saveSecureData, loadSecureData, needsMigration, migrateToEncrypted, setCurrentPin } from './secureStorage';
import { logger } from './logger';

const STORAGE_KEYS = {
  ENTRIES: 'journal_entries',
  ASSESSMENTS: 'assessments',
  CHAT_HISTORY: 'chat_history',
  SETTINGS: 'app_settings'
};

// Flag to track if we've initialized secure storage
let storageInitialized = false;

/**
 * Initialize secure storage (migrate if needed)
 * Should be called when user unlocks the app
 */
export async function initializeSecureStorage(pin: string): Promise<void> {
  if (storageInitialized) return;
  
  try {
    setCurrentPin(pin);
    
    if (needsMigration()) {
      await migrateToEncrypted(pin);
      logger.info('Storage initialized and migrated to encrypted format');
    }
    
    storageInitialized = true;
  } catch (error) {
    logger.logError(error instanceof Error ? error : new Error('Storage initialization failed'), {
      context: 'storage',
      action: 'initializeSecureStorage'
    });
    // Continue with plain storage if migration fails
  }
}

// Journal Entries
export async function saveJournalEntry(entry: JournalEntry): Promise<void> {
  const entries = await getJournalEntries();
  const existingIndex = entries.findIndex(e => e.id === entry.id);
  
  if (existingIndex >= 0) {
    entries[existingIndex] = entry;
  } else {
    entries.unshift(entry);
  }
  
  await saveSecureData(STORAGE_KEYS.ENTRIES, entries);
}

export async function getJournalEntries(): Promise<JournalEntry[]> {
  const data = await loadSecureData(STORAGE_KEYS.ENTRIES);
  return data || [];
}

export async function deleteJournalEntry(id: string): Promise<void> {
  const entries = await getJournalEntries();
  const filtered = entries.filter(e => e.id !== id);
  await saveSecureData(STORAGE_KEYS.ENTRIES, filtered);
}

// Assessments
export async function saveAssessment(assessment: AssessmentResult): Promise<void> {
  const assessments = await getAssessments();
  assessments.unshift({
    ...assessment,
    timestamp: new Date().toISOString()
  });
  await saveSecureData(STORAGE_KEYS.ASSESSMENTS, assessments);
}

export async function getAssessments(): Promise<AssessmentResult[]> {
  const data = await loadSecureData(STORAGE_KEYS.ASSESSMENTS);
  return data || [];
}

// Chat History
export async function saveChatMessage(message: ChatMessage): Promise<void> {
  const messages = await getChatHistory();
  messages.push(message);
  await saveSecureData(STORAGE_KEYS.CHAT_HISTORY, messages);
}

export async function getChatHistory(): Promise<ChatMessage[]> {
  const data = await loadSecureData(STORAGE_KEYS.CHAT_HISTORY);
  return data || [];
}

export async function clearChatHistory(): Promise<void> {
  await saveSecureData(STORAGE_KEYS.CHAT_HISTORY, []);
}

// Settings
export async function saveSetting(key: string, value: any): Promise<void> {
  const settings = await getSettings();
  settings[key] = value;
  await saveSecureData(STORAGE_KEYS.SETTINGS, settings);
}

export async function getSetting(key: string, defaultValue?: any): Promise<any> {
  const settings = await getSettings();
  return settings[key] !== undefined ? settings[key] : defaultValue;
}

export async function getSettings(): Promise<Record<string, any>> {
  const data = await loadSecureData(STORAGE_KEYS.SETTINGS);
  return data || {};
}

// Synchronous versions for backward compatibility (use with caution)
// These will use plain storage if encryption not available
export function getSettingSync(key: string, defaultValue?: any): any {
  try {
    const settings = getSettingsSync();
    return settings[key] !== undefined ? settings[key] : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function getSettingsSync(): Record<string, any> {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

// Synchronous wrappers for components (temporary, for backward compatibility)
// These will attempt to load from encrypted storage, fallback to plain
export function getJournalEntriesSync(): JournalEntry[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ENTRIES);
    if (!data) return [];
    
    // Check if encrypted
    const isEncrypted = localStorage.getItem(`${STORAGE_KEYS.ENTRIES}_encrypted`) === 'true';
    if (isEncrypted) {
      // Return empty for now - components should use async version
      // This is a temporary compatibility layer
      return [];
    }
    
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function getChatHistorySync(): ChatMessage[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
    if (!data) return [];
    
    const isEncrypted = localStorage.getItem(`${STORAGE_KEYS.CHAT_HISTORY}_encrypted`) === 'true';
    if (isEncrypted) {
      return [];
    }
    
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveJournalEntrySync(entry: JournalEntry): void {
  try {
    const entries = getJournalEntriesSync();
    const existingIndex = entries.findIndex(e => e.id === entry.id);
    
    if (existingIndex >= 0) {
      entries[existingIndex] = entry;
    } else {
      entries.unshift(entry);
    }
    
    // Only save as plain if not encrypted
    const isEncrypted = localStorage.getItem(`${STORAGE_KEYS.ENTRIES}_encrypted`) === 'true';
    if (!isEncrypted) {
      localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(entries));
    } else {
      // If encrypted, use async version (fire and forget)
      saveJournalEntry(entry).catch(() => {
        // Fallback failed, log but don't block
      });
    }
  } catch (error) {
    logger.logError(error instanceof Error ? error : new Error('Save failed'), {
      context: 'storage',
      action: 'saveJournalEntrySync'
    });
  }
}

// Export data
export async function exportAllData(): Promise<string> {
  const data = {
    entries: await getJournalEntries(),
    assessments: await getAssessments(),
    exportDate: new Date().toISOString(),
    version: '2.0'
  };
  return JSON.stringify(data, null, 2);
}

// Clear all data
export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEYS.ENTRIES);
  localStorage.removeItem(STORAGE_KEYS.ASSESSMENTS);
  localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
  localStorage.removeItem(STORAGE_KEYS.SETTINGS);
}
