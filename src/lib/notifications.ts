import { getSetting, saveSetting } from './storage';
import { logger } from './logger';

export interface ReminderSettings {
  enabled: boolean;
  dailyTime: string; // HH:MM format
  weeklyInsights: boolean;
  patternAlerts: boolean;
  quietHoursStart: string; // HH:MM format
  quietHoursEnd: string; // HH:MM format
}

const DEFAULT_REMINDER_SETTINGS: ReminderSettings = {
  enabled: false,
  dailyTime: '20:00',
  weeklyInsights: true,
  patternAlerts: true,
  quietHoursStart: '22:00',
  quietHoursEnd: '08:00'
};

export async function getReminderSettings(): Promise<ReminderSettings> {
  try {
    const settings = await getSetting('reminderSettings', DEFAULT_REMINDER_SETTINGS);
    return { ...DEFAULT_REMINDER_SETTINGS, ...settings };
  } catch {
    return DEFAULT_REMINDER_SETTINGS;
  }
}

export async function saveReminderSettings(settings: ReminderSettings): Promise<void> {
  await saveSetting('reminderSettings', settings);
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    logger.logWarn('Browser does not support notifications', { context: 'notifications' });
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission === 'denied') {
    logger.logWarn('Notification permission denied', { context: 'notifications' });
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    logger.logError(error instanceof Error ? error : new Error('Failed to request notification permission'), {
      context: 'notifications',
      action: 'requestPermission'
    });
    return false;
  }
}

export function isInQuietHours(time: string, quietStart: string, quietEnd: string): boolean {
  const [hours, minutes] = time.split(':').map(Number);
  const [startHours, startMinutes] = quietStart.split(':').map(Number);
  const [endHours, endMinutes] = quietEnd.split(':').map(Number);

  const currentMinutes = hours * 60 + minutes;
  const startMinutesTotal = startHours * 60 + startMinutes;
  const endMinutesTotal = endHours * 60 + endMinutes;

  // Handle quiet hours that span midnight (e.g., 22:00 to 08:00)
  if (startMinutesTotal > endMinutesTotal) {
    return currentMinutes >= startMinutesTotal || currentMinutes < endMinutesTotal;
  }

  return currentMinutes >= startMinutesTotal && currentMinutes < endMinutesTotal;
}

export async function scheduleDailyReminder(): Promise<void> {
  const settings = await getReminderSettings();
  
  if (!settings.enabled) {
    return;
  }

  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) {
    return;
  }

  // Clear existing reminders
  if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
    // Service worker will handle scheduling
    return;
  }

  // Fallback: Check if it's time for reminder
  checkAndShowDailyReminder(settings);
}

export async function checkAndShowDailyReminder(settings?: ReminderSettings): Promise<void> {
  const reminderSettings = settings || await getReminderSettings();
  
  if (!reminderSettings.enabled) {
    return;
  }

  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) {
    return;
  }

  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  // Check quiet hours
  if (isInQuietHours(currentTime, reminderSettings.quietHoursStart, reminderSettings.quietHoursEnd)) {
    return;
  }

  // Check if reminder time matches (within 5 minutes)
  const [reminderHours, reminderMinutes] = reminderSettings.dailyTime.split(':').map(Number);
  const reminderTime = reminderHours * 60 + reminderMinutes;
  const currentTimeMinutes = now.getHours() * 60 + now.getMinutes();
  
  // Check if we've already shown reminder today
  const lastReminderDate = await getSetting('lastReminderDate', '');
  const today = now.toISOString().split('T')[0];
  
  if (lastReminderDate === today) {
    return;
  }

  // Show reminder if within 5 minutes of scheduled time
  if (Math.abs(currentTimeMinutes - reminderTime) <= 5) {
    showNotification('FlagSense Reminder', {
      body: 'Time to log your moments. Track patterns and protect your peace.',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'daily-reminder',
      requireInteraction: false
    });

    await saveSetting('lastReminderDate', today);
  }
}

export async function checkPatternAlerts(entries: any[]): Promise<void> {
  const settings = await getReminderSettings();
  
  if (!settings.patternAlerts) {
    return;
  }

  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) {
    return;
  }

  // Check for pattern spikes
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const recentEntries = entries.filter(e => new Date(e.date) >= oneWeekAgo);
  const recentFlags = recentEntries.reduce((sum, e) => sum + (e.analysis?.flags?.length || 0), 0);
  
  // Get previous week for comparison
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  const previousWeekEntries = entries.filter(e => {
    const entryDate = new Date(e.date);
    return entryDate >= twoWeeksAgo && entryDate < oneWeekAgo;
  });
  const previousFlags = previousWeekEntries.reduce((sum, e) => sum + (e.analysis?.flags?.length || 0), 0);

  // Alert if flags increased significantly
  if (recentFlags > 0 && recentFlags >= previousFlags * 1.5 && recentFlags >= 3) {
    const lastAlertDate = await getSetting('lastPatternAlertDate', '');
    const today = new Date().toISOString().split('T')[0];
    
    if (lastAlertDate !== today) {
      showNotification('Pattern Alert', {
        body: `You've logged ${recentFlags} red flags this week - highest in 30 days. Check Insights for details.`,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'pattern-alert',
        requireInteraction: false
      });

      await saveSetting('lastPatternAlertDate', today);
    }
  }
}

export function showNotification(title: string, options?: NotificationOptions): void {
  if (!('Notification' in window)) {
    return;
  }

  if (Notification.permission !== 'granted') {
    return;
  }

  try {
    new Notification(title, {
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      ...options
    });
  } catch (error) {
    logger.logError(error instanceof Error ? error : new Error('Failed to show notification'), {
      context: 'notifications',
      action: 'showNotification'
    });
  }
}

// Initialize notification checking
export function initializeNotifications(): void {
  // Check for daily reminder every minute
  setInterval(() => {
    checkAndShowDailyReminder().catch(err => {
      logger.logError(err instanceof Error ? err : new Error('Reminder check failed'), {
        context: 'notifications'
      });
    });
  }, 60000); // Check every minute
}

