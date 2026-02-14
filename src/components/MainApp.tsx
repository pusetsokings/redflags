import { useState, lazy, Suspense, useMemo } from 'react';
import { Home, BookOpen, TrendingUp, MessageCircle, Settings, PenLine, Loader2, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { Logo } from './Logo';
import { QuickActions } from './QuickActions';

// Lazy load components for code splitting
const Dashboard = lazy(() => import('./Dashboard').then(m => ({ default: m.Dashboard })));
const Journal = lazy(() => import('./Journal').then(m => ({ default: m.Journal })));
const Insights = lazy(() => import('./Insights').then(m => ({ default: m.Insights })));
const Library = lazy(() => import('./Library').then(m => ({ default: m.Library })));
const Chat = lazy(() => import('./Chat').then(m => ({ default: m.Chat })));
const Achievements = lazy(() => import('./Achievements').then(m => ({ default: m.Achievements })));
const SettingsPanel = lazy(() => import('./SettingsPanel').then(m => ({ default: m.SettingsPanel })));

// Loading component
function TabLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Loader2 className="w-8 h-8 text-[#4B2E83] dark:text-[#9D8AFF] animate-spin mx-auto mb-2" />
        <p className="text-sm text-[#495057] dark:text-[#adb5bd]">Loading...</p>
      </div>
    </div>
  );
}

interface MainAppProps {
  onLock: () => void;
  onPanic: () => void;
}

export function MainApp({ onLock, onPanic }: MainAppProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showQuickLog, setShowQuickLog] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'journal', label: 'Moments', icon: PenLine },
    { id: 'insights', label: 'Insights', icon: TrendingUp },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'achievements', label: 'Achievements', icon: Trophy }
  ];

  const content = useMemo(() => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Suspense fallback={<TabLoading />}>
            <Dashboard onNewEntry={() => setActiveTab('journal')} onPanic={onPanic} />
          </Suspense>
        );
      case 'journal':
        return (
          <Suspense fallback={<TabLoading />}>
            <Journal onQuickLog={() => setShowQuickLog(true)} />
          </Suspense>
        );
      case 'insights':
        return (
          <Suspense fallback={<TabLoading />}>
            <Insights />
          </Suspense>
        );
      case 'library':
        return (
          <Suspense fallback={<TabLoading />}>
            <Library />
          </Suspense>
        );
      case 'chat':
        return (
          <Suspense fallback={<TabLoading />}>
            <Chat />
          </Suspense>
        );
      case 'achievements':
        return (
          <Suspense fallback={<TabLoading />}>
            <Achievements />
          </Suspense>
        );
      case 'settings':
        return (
          <Suspense fallback={<TabLoading />}>
            <SettingsPanel onLock={onLock} onBack={() => setActiveTab('dashboard')} />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<TabLoading />}>
            <Dashboard onNewEntry={() => setActiveTab('journal')} onPanic={onPanic} />
          </Suspense>
        );
    }
  }, [activeTab, onLock, onPanic]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0d0e1a]">
      {/* Header */}
      <header className="bg-white dark:bg-[#1a1a2e] border-b-4 border-[#1A1A2E] dark:border-[#3A3A5E] sticky top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Logo size="sm" />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('settings')}
            className="hover:bg-[#F8F9FA] dark:hover:bg-[#2A2A4E] rounded-xl border-2 border-transparent hover:border-[#1A1A2E] dark:hover:border-[#9D8AFF]"
            aria-label="Open settings"
          >
            <Settings className="w-5 h-5 text-[#1A1A2E] dark:text-[#f8f9fa]" aria-hidden="true" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 py-6" role="main">
        {content}
      </main>

      {/* Quick Actions FAB */}
      {activeTab !== 'settings' && (
        <QuickActions
          onQuickLog={() => {
            setActiveTab('journal');
            setShowQuickLog(true);
          }}
          onNewEntry={() => {
            setActiveTab('journal');
            setShowQuickLog(false);
          }}
        />
      )}

      {/* Bottom Navigation */}
      {activeTab !== 'settings' && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1a1a2e] border-t-4 border-[#1A1A2E] dark:border-[#3A3A5E] safe-area-pb shadow-2xl">
          <div className="max-w-7xl mx-auto px-2 py-3">
            <div className="flex justify-around items-center overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    aria-label={`Navigate to ${tab.label}`}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all relative ${ 
                      isActive
                        ? 'text-[#1A1A2E] dark:text-[#f8f9fa]'
                        : 'text-[#ADB5BD] dark:text-[#6A6A8A] hover:text-[#495057] dark:hover:text-[#adb5bd]'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-[#C7B8FF] dark:bg-[#6B4BA3] rounded-2xl border-3 border-[#1A1A2E] dark:border-[#9D8AFF]" />
                    )}
                    <div className={`relative z-10 transition-transform ${isActive ? 'scale-110 -translate-y-1' : ''}`}>
                      <Icon className="w-6 h-6" strokeWidth={isActive ? 3 : 2} aria-hidden="true" />
                    </div>
                    {isActive && (
                      <span className="text-xs relative z-10 font-bold">{tab.label}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}