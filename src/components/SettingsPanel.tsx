import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Lock, Download, Trash2, Calculator, Book, Calendar as CalendarIcon,
  Shield, ArrowLeft, Globe, Bell, Info, ExternalLink, FileText, Scale, HelpCircle, Sparkles, Key, CheckCircle, XCircle, Moon, Sun
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { exportAllData, clearAllData, getSetting, getSettingSync, saveSetting } from '../lib/storage';
import { COUNTRIES, getCountryByCode, detectCountryFromBrowser } from '../lib/emergencyHotlines';
import { toast } from 'sonner';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsOfUse } from './TermsOfUse';
import { HelpGuide } from './HelpGuide';
import { testCohereApiKey } from '../lib/cohereService';
import { getReminderSettings, saveReminderSettings, requestNotificationPermission, type ReminderSettings } from '../lib/notifications';

interface SettingsPanelProps {
  onLock: () => void;
  onBack: () => void;
}

export function SettingsPanel({ onLock, onBack }: SettingsPanelProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const effectiveTheme = theme === 'system' ? resolvedTheme : theme;
  const [disguisedIcon, setDisguisedIcon] = useState(getSetting('disguisedIcon', 'none'));
  const [notifications, setNotifications] = useState(getSetting('notifications', true));
  const [language, setLanguage] = useState(getSetting('language', 'en'));
  const [enhancedAI, setEnhancedAI] = useState(getSetting('enhancedAI', false));
  const [cohereApiKey, setCohereApiKey] = useState(getSetting('cohereApiKey', ''));
  const [showApiKey, setShowApiKey] = useState(false);
  const [testingApiKey, setTestingApiKey] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [reminderSettings, setReminderSettings] = useState<ReminderSettings | null>(null);
  const [loadingReminders, setLoadingReminders] = useState(true);
  const [userCountry, setUserCountry] = useState(() => getSettingSync('userCountry', 'US'));
  const [detectingCountry, setDetectingCountry] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadReminderSettings();
  }, []);

  const loadReminderSettings = async () => {
    try {
      const settings = await getReminderSettings();
      setReminderSettings(settings);
    } catch (error) {
      console.error('Failed to load reminder settings:', error);
    } finally {
      setLoadingReminders(false);
    }
  };

  const handleReminderSettingsChange = async (updates: Partial<ReminderSettings>) => {
    if (!reminderSettings) return;
    
    const newSettings = { ...reminderSettings, ...updates };
    setReminderSettings(newSettings);
    
    try {
      await saveReminderSettings(newSettings);
      
      // Request permission if enabling
      if (updates.enabled && !('Notification' in window)) {
        toast.error('Your browser does not support notifications');
        return;
      }
      
      if (updates.enabled) {
        const hasPermission = await requestNotificationPermission();
        if (!hasPermission) {
          toast.error('Notification permission denied. Please enable in browser settings.');
          setReminderSettings({ ...newSettings, enabled: false });
          await saveReminderSettings({ ...newSettings, enabled: false });
        } else {
          toast.success('Reminders enabled');
        }
      } else {
        toast.success('Reminders disabled');
      }
    } catch (error) {
      toast.error('Failed to save reminder settings');
      console.error(error);
    }
  };

  if (showPrivacy) {
    return <PrivacyPolicy onBack={() => setShowPrivacy(false)} />;
  }

  if (showTerms) {
    return <TermsOfUse onBack={() => setShowTerms(false)} />;
  }

  if (showHelp) {
    return <HelpGuide onBack={() => setShowHelp(false)} />;
  }

  const [exportFormat, setExportFormat] = useState<'json' | 'csv' | 'pdf'>('json');
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const date = new Date().toISOString().split('T')[0];
      
      if (exportFormat === 'json') {
        const data = await exportAllData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `flagsense-backup-${date}.json`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('JSON export downloaded');
      } else if (exportFormat === 'csv') {
        const { exportToCSV, downloadFile } = await import('../lib/export');
        const csv = await exportToCSV({
          format: 'csv',
          includeEntries: true,
          includeAssessments: true
        });
        downloadFile(csv, `flagsense-export-${date}.csv`, 'text/csv');
        toast.success('CSV export downloaded');
      } else if (exportFormat === 'pdf') {
        const { exportToPDF, downloadFile } = await import('../lib/export');
        const pdfBlob = await exportToPDF({
          format: 'pdf',
          includeEntries: true,
          includeAssessments: true
        });
        // For PDF, we'll open in new window for printing
        const url = URL.createObjectURL(pdfBlob);
        const printWindow = window.open(url, '_blank');
        if (printWindow) {
          printWindow.onload = () => {
            printWindow.print();
          };
        }
        toast.success('PDF report opened for printing');
      }
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Export failed. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const handleClearData = () => {
    if (confirm('⚠️ WARNING: This will permanently delete ALL your data including journal entries, assessments, and settings. This cannot be undone. Are you absolutely sure?')) {
      if (confirm('This is your final confirmation. Delete everything?')) {
        clearAllData();
        toast.success('All data cleared');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    }
  };

  const handleIconChange = (value: string) => {
    setDisguisedIcon(value);
    saveSetting('disguisedIcon', value);
    toast.success(value === 'none' ? 'Standard icon restored' : `Icon disguised as ${value}`);
  };

  const handleNotificationsChange = (checked: boolean) => {
    setNotifications(checked);
    saveSetting('notifications', checked);
    toast.success(checked ? 'Notifications enabled' : 'Notifications disabled');
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    saveSetting('language', value);
    toast.success('Language updated');
  };

  const handleEnhancedAIChange = (checked: boolean) => {
    setEnhancedAI(checked);
    saveSetting('enhancedAI', checked);
    toast.success(checked ? 'Enhanced AI enabled' : 'Enhanced AI disabled');
  };

  const handleCohereApiKeyChange = (value: string) => {
    setCohereApiKey(value);
    saveSetting('cohereApiKey', value);
    toast.success('API Key updated');
  };

  const handleTestApiKey = async () => {
    setTestingApiKey(true);
    const isValid = await testCohereApiKey(cohereApiKey);
    setTestingApiKey(false);
    if (isValid) {
      toast.success('API Key is valid');
    } else {
      toast.error('API Key is invalid');
    }
  };

  const iconOptions = [
    { value: 'none', label: 'FlagSense (Standard)', icon: Shield },
    { value: 'calculator', label: 'Calculator', icon: Calculator },
    { value: 'notes', label: 'Notes', icon: Book },
    { value: 'calendar', label: 'Calendar', icon: CalendarIcon }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div className="mb-4">
        <Button 
          variant="ghost" 
          onClick={onBack} 
          className="hover:bg-[#F8F9FA] dark:hover:bg-[#2A2A4E] border-2 border-transparent hover:border-[#1A1A2E] dark:hover:border-[#9D8AFF] rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <p className="text-xs text-[#495057] dark:text-[#adb5bd] mt-1">Your settings — theme, country, security & data.</p>
      </div>

      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card text-card-foreground rounded-3xl p-6 shadow-lg border-4 border-border"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-[#6C5CE7] dark:bg-primary rounded-2xl border-3 border-border">
            <Lock className="w-6 h-6 text-primary-foreground" strokeWidth={3} />
          </div>
          <h3 className="text-foreground font-bold text-xl">Security & Privacy</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b-3 border-border">
            <div>
              <Label className="text-foreground font-bold">Lock App Now</Label>
              <p className="text-sm text-muted-foreground">Requires PIN to unlock</p>
            </div>
            <Button 
              onClick={onLock} 
              variant="outline"
              className="bg-[#FFD93D] dark:bg-amber-500 border-3 border-border hover:bg-[#FFE66D] dark:hover:bg-amber-400 text-foreground font-bold rounded-xl"
            >
              Lock
            </Button>
          </div>

          <div>
            <Label className="text-foreground font-bold">Disguised App Icon</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Change how the app appears on your device for discretion
            </p>
            <Select value={disguisedIcon} onValueChange={handleIconChange}>
              <SelectTrigger className="border-3 border-border rounded-xl h-12 bg-muted text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {option.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-[#4ECDC4] dark:bg-accent border-3 border-border rounded-2xl p-4">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-card rounded-lg border-2 border-border flex items-center justify-center flex-shrink-0">
                <Info className="w-4 h-4 text-foreground" strokeWidth={3} />
              </div>
              <p className="text-xs text-foreground">
                <strong>Quick Exit:</strong> Press Shift+Esc anytime to instantly switch to disguised mode. 
                Triple-tap the title to return to the app.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* General Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E] dark:border-[#3A3A5E]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-[#4ECDC4] dark:bg-[#6B4BA3] rounded-2xl border-3 border-[#1A1A2E] dark:border-[#9D8AFF]">
            <Globe className="w-6 h-6 text-[#1A1A2E] dark:text-[#f8f9fa]" strokeWidth={3} />
          </div>
          <h3 className="text-[#1A1A2E] dark:text-[#f8f9fa] font-bold text-xl">General</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b-3 border-[#E9ECEF] dark:border-[#3A3A5E]">
            <div>
              <Label className="text-[#1A1A2E] dark:text-[#f8f9fa] font-bold">Dark Mode</Label>
              <p className="text-sm text-[#495057] dark:text-[#adb5bd]">Switch between light and dark theme</p>
            </div>
            {mounted && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newTheme = effectiveTheme === 'dark' ? 'light' : 'dark';
                  setTheme(newTheme);
                  saveSetting('theme', newTheme);
                  toast.success(newTheme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled');
                }}
                className="border-3 border-[#1A1A2E] dark:border-[#9D8AFF] rounded-xl bg-white dark:bg-[#1a1a2e] hover:bg-[#F8F9FA] dark:hover:bg-[#2A2A4E]"
              >
                {effectiveTheme === 'dark' ? (
                  <Sun className="w-4 h-4 text-[#1A1A2E] dark:text-[#9D8AFF]" />
                ) : (
                  <Moon className="w-4 h-4 text-[#1A1A2E]" />
                )}
              </Button>
            )}
          </div>

          <div className="py-3 border-b-3 border-[#E9ECEF] dark:border-[#3A3A5E]">
            <Label className="text-[#1A1A2E] dark:text-[#f8f9fa] font-bold">Country for emergency resources</Label>
            <p className="text-sm text-[#495057] dark:text-[#adb5bd] mb-2">Help hotlines and SOS numbers are shown for this country.</p>
            <div className="flex gap-2">
              <Select value={userCountry} onValueChange={(v) => { setUserCountry(v); saveSetting('userCountry', v); toast.success('Country updated'); }}>
                <SelectTrigger className="flex-1 border-3 border-[#1A1A2E] dark:border-[#3A3A5E] rounded-xl h-10 bg-[#F8F9FA] dark:bg-[#2A2A4E] text-[#1A1A2E] dark:text-[#f8f9fa]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c.code} value={c.code}>{c.flag} {c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setDetectingCountry(true);
                  const detected = detectCountryFromBrowser();
                  if (detected && getCountryByCode(detected)) {
                    setUserCountry(detected);
                    saveSetting('userCountry', detected);
                    toast.success('Country set from browser timezone');
                  } else {
                    toast.error('Could not detect country. Please select manually.');
                  }
                  setDetectingCountry(false);
                }}
                disabled={detectingCountry}
                className="border-3 border-[#1A1A2E] dark:border-[#9D8AFF] rounded-xl font-bold"
              >
                {detectingCountry ? '…' : 'Detect'}
              </Button>
            </div>
          </div>

          {!loadingReminders && reminderSettings && (
            <>
              <div className="flex items-center justify-between py-3 border-b-3 border-[#E9ECEF] dark:border-[#3A3A5E]">
                <div>
                  <Label className="text-[#1A1A2E] dark:text-[#f8f9fa] font-bold">Smart Reminders</Label>
                  <p className="text-sm text-[#495057] dark:text-[#adb5bd]">Daily reminders and pattern alerts</p>
                </div>
                <Switch
                  checked={reminderSettings.enabled}
                  onCheckedChange={(checked) => handleReminderSettingsChange({ enabled: checked })}
                />
              </div>

              {reminderSettings.enabled && (
                <div className="space-y-4 pt-3">
                  <div>
                    <Label className="text-sm font-bold text-[#1A1A2E] dark:text-[#f8f9fa]">Daily Reminder Time</Label>
                    <Input
                      type="time"
                      value={reminderSettings.dailyTime}
                      onChange={(e) => handleReminderSettingsChange({ dailyTime: e.target.value })}
                      className="mt-1.5 border-3 border-[#1A1A2E] dark:border-[#3A3A5E] rounded-xl h-10 bg-[#F8F9FA] dark:bg-[#2A2A4E] text-[#1A1A2E] dark:text-[#f8f9fa]"
                    />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <Label className="text-sm font-bold text-[#1A1A2E] dark:text-[#f8f9fa]">Pattern Alerts</Label>
                      <p className="text-xs text-[#495057] dark:text-[#adb5bd]">Notify when red flags spike</p>
                    </div>
                    <Switch
                      checked={reminderSettings.patternAlerts}
                      onCheckedChange={(checked) => handleReminderSettingsChange({ patternAlerts: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <Label className="text-sm font-bold text-[#1A1A2E] dark:text-[#f8f9fa]">Weekly Insights</Label>
                      <p className="text-xs text-[#495057] dark:text-[#adb5bd]">Weekly summary notifications</p>
                    </div>
                    <Switch
                      checked={reminderSettings.weeklyInsights}
                      onCheckedChange={(checked) => handleReminderSettingsChange({ weeklyInsights: checked })}
                    />
                  </div>

                  <div className="bg-[#4ECDC4] dark:bg-[#6B4BA3] border-3 border-[#1A1A2E] dark:border-[#9D8AFF] rounded-2xl p-3">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-[#1A1A2E] dark:text-[#f8f9fa] flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-[#1A1A2E] dark:text-[#f8f9fa]">
                        Quiet hours: {reminderSettings.quietHoursStart} - {reminderSettings.quietHoursEnd}. 
                        No notifications during this time.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <div>
            <Label className="text-[#1A1A2E] dark:text-[#f8f9fa] font-bold">Language</Label>
            <p className="text-sm text-[#495057] dark:text-[#adb5bd] mb-3">Choose your preferred language</p>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="border-3 border-[#1A1A2E] dark:border-[#3A3A5E] rounded-xl h-12 bg-[#F8F9FA] dark:bg-[#1a1a2e] text-[#1A1A2E] dark:text-[#f8f9fa]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Enhanced AI Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-[#FFD93D] rounded-2xl border-3 border-[#1A1A2E]">
            <Sparkles className="w-6 h-6 text-[#1A1A2E]" strokeWidth={3} />
          </div>
          <h3 className="text-[#1A1A2E] font-bold text-xl">Enhanced AI Counselor</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b-3 border-[#E9ECEF]">
            <div>
              <div className="flex items-center gap-2">
                <Label className="text-[#1A1A2E] font-bold">Enhanced AI Mode</Label>
                <span className="px-2 py-0.5 bg-[#4ECDC4] text-white text-xs rounded-full border-2 border-[#1A1A2E] font-bold">
                  FREE
                </span>
              </div>
              <p className="text-sm text-[#495057]">Unlock advanced AI responses with Cohere</p>
            </div>
            <Switch
              checked={enhancedAI}
              onCheckedChange={handleEnhancedAIChange}
            />
          </div>

          {enhancedAI && (
            <>
              <div className="bg-[#4ECDC4] border-3 border-[#1A1A2E] rounded-2xl p-4">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-white rounded-lg border-2 border-[#1A1A2E] flex items-center justify-center flex-shrink-0">
                    <Info className="w-4 h-4 text-[#1A1A2E]" strokeWidth={3} />
                  </div>
                  <div className="text-xs text-[#1A1A2E]">
                    <p className="font-bold mb-1">🎁 Get 1,000 free AI messages per month!</p>
                    <p>1. Visit <a href="https://dashboard.cohere.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline font-bold">dashboard.cohere.com</a></p>
                    <p>2. Sign up for free (no credit card needed)</p>
                    <p>3. Copy your API key and paste below</p>
                    <p className="mt-1 opacity-75">Your key stays private on your device only.</p>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-[#1A1A2E] font-bold">Cohere API Key</Label>
                <p className="text-sm text-[#495057] mb-3">Paste your free Cohere API key</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input
                      type={showApiKey ? 'text' : 'password'}
                      value={cohereApiKey}
                      onChange={(e) => handleCohereApiKeyChange(e.target.value)}
                      placeholder="Enter your Cohere API key..."
                      className="border-3 border-[#1A1A2E] rounded-xl h-12 bg-[#F8F9FA] flex-1"
                    />
                    <Button
                      onClick={() => setShowApiKey(!showApiKey)}
                      variant="outline"
                      className="border-3 border-[#1A1A2E] hover:bg-[#F8F9FA] rounded-xl h-12 font-bold"
                    >
                      {showApiKey ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                  <Button
                    onClick={handleTestApiKey}
                    disabled={!cohereApiKey || testingApiKey}
                    className="w-full bg-[#6C5CE7] hover:bg-[#5B4BC6] border-4 border-[#1A1A2E] text-white rounded-xl h-12 font-bold"
                  >
                    {testingApiKey ? 'Testing...' : 'Test API Key'}
                  </Button>
                </div>
              </div>

              <div className="bg-[#FFD93D] border-3 border-[#1A1A2E] rounded-2xl p-4">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-5 h-5 text-[#1A1A2E] flex-shrink-0" strokeWidth={3} />
                  <div className="text-xs text-[#1A1A2E]">
                    <p className="font-bold mb-1">Enhanced AI Benefits:</p>
                    <p>✓ More natural, conversational responses</p>
                    <p>✓ Better understanding of complex emotions</p>
                    <p>✓ Context-aware follow-up questions</p>
                    <p>✓ Personalized insights from your journal</p>
                    <p className="mt-1 opacity-75">Falls back to offline AI if quota exceeded</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Data Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl p-6 shadow-lg border-4 border-[#1A1A2E]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-[#2A9D8F] rounded-2xl border-3 border-[#1A1A2E]">
            <Download className="w-6 h-6 text-white" strokeWidth={3} />
          </div>
          <h3 className="text-[#1A1A2E] font-bold text-xl">Data Management</h3>
        </div>

        <div className="space-y-3">
          <div>
            <Label className="text-sm font-bold text-[#1A1A2E] dark:text-[#f8f9fa] mb-2 block">Export Format</Label>
            <Select value={exportFormat} onValueChange={(value: 'json' | 'csv' | 'pdf') => setExportFormat(value)}>
              <SelectTrigger className="border-3 border-[#1A1A2E] dark:border-[#3A3A5E] rounded-xl h-10 bg-[#F8F9FA] dark:bg-[#2A2A4E] text-[#1A1A2E] dark:text-[#f8f9fa]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">📄 JSON (Backup)</SelectItem>
                <SelectItem value="csv">📊 CSV (Spreadsheet)</SelectItem>
                <SelectItem value="pdf">📑 PDF (Report)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleExport}
            disabled={exporting}
            variant="outline" 
            className="w-full justify-between border-3 border-[#1A1A2E] dark:border-[#9D8AFF] rounded-xl h-12 hover:bg-[#F8F9FA] dark:hover:bg-[#2A2A4E] font-bold disabled:opacity-50"
          >
            <span>{exporting ? 'Exporting...' : `Export as ${exportFormat.toUpperCase()}`}</span>
            <Download className="w-4 h-4" strokeWidth={3} />
          </Button>

          <p className="text-sm text-[#495057] dark:text-[#adb5bd]">
            {exportFormat === 'json' && 'Download a backup of all your data. Keep this file safe and private.'}
            {exportFormat === 'csv' && 'Export data as CSV for spreadsheet analysis (Excel, Google Sheets).'}
            {exportFormat === 'pdf' && 'Generate a beautiful PDF report with insights and statistics.'}
          </p>

          <div className="pt-4 border-t-3 border-[#E9ECEF]">
            <Button 
              onClick={handleClearData} 
              className="w-full justify-between bg-[#FF6B6B] hover:bg-[#FF5252] border-4 border-[#1A1A2E] text-white rounded-xl h-12 font-bold"
            >
              <span>Delete All Data</span>
              <Trash2 className="w-4 h-4" strokeWidth={3} />
            </Button>
            <p className="text-sm text-[#FF6B6B] mt-2 font-bold">
              ⚠️ This permanently deletes everything and cannot be undone.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#6C5CE7] rounded-3xl p-6 text-white shadow-lg border-4 border-[#1A1A2E]"
      >
        <h3 className="text-white mb-3 font-bold text-xl">Emergency Resources</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span>National Domestic Violence Hotline</span>
            <a href="tel:18007997233" className="flex items-center gap-1 hover:underline font-bold">
              1-800-799-7233
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span>Suicide & Crisis Lifeline</span>
            <a href="tel:988" className="flex items-center gap-1 hover:underline font-bold">
              988
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span>RAINN Sexual Assault Hotline</span>
            <a href="tel:18006564673" className="flex items-center gap-1 hover:underline font-bold">
              1-800-656-4673
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* About */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-3xl p-6 shadow-lg text-center border-4 border-[#1A1A2E]"
      >
        <div className="inline-flex p-4 bg-[#4ECDC4] rounded-2xl border-3 border-[#1A1A2E] mb-3">
          <Shield className="w-12 h-12 text-[#1A1A2E]" strokeWidth={3} />
        </div>
        <h4 className="mb-2 text-[#1A1A2E] font-bold text-xl">FlagSense v1.0</h4>
        <p className="text-sm text-[#495057] mb-4">
          Your private companion for healthier relationships
        </p>
        <p className="text-xs text-[#495057]">
          All data stays on your device. We never collect or share your personal information.
        </p>
        <div className="space-y-2 mt-4">
          <Button
            onClick={() => setShowPrivacy(true)}
            className="w-full justify-between bg-[#FFD93D] hover:bg-[#FFE66D] border-4 border-[#1A1A2E] text-[#1A1A2E] font-bold rounded-xl h-12"
          >
            <span>Privacy Policy</span>
            <FileText className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => setShowTerms(true)}
            className="w-full justify-between bg-[#FFD93D] hover:bg-[#FFE66D] border-4 border-[#1A1A2E] text-[#1A1A2E] font-bold rounded-xl h-12"
          >
            <span>Terms of Use</span>
            <Scale className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => setShowHelp(true)}
            className="w-full justify-between bg-[#FFD93D] hover:bg-[#FFE66D] border-4 border-[#1A1A2E] text-[#1A1A2E] font-bold rounded-xl h-12"
          >
            <span>Help Guide</span>
            <HelpCircle className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}