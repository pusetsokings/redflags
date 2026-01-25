import { useState } from 'react';
import { Plus, Search, MoreVertical, Check } from 'lucide-react';
import { Button } from './ui/button';

interface DisguisedModeProps {
  onExit: () => void;
}

export function DisguisedMode({ onExit }: DisguisedModeProps) {
  const [notes] = useState([
    { id: 1, title: 'Shopping List', preview: 'Milk, eggs, bread, butter...', date: 'Today' },
    { id: 2, title: 'Meeting Notes', preview: 'Discuss Q4 goals, review budget...', date: 'Yesterday' },
    { id: 3, title: 'Ideas', preview: 'Weekend trip planning...', date: '2 days ago' },
    { id: 4, title: 'Todo', preview: 'Call dentist, pay bills...', date: '3 days ago' }
  ]);

  // Triple tap to exit
  const [tapCount, setTapCount] = useState(0);
  const [tapTimer, setTapTimer] = useState<NodeJS.Timeout | null>(null);

  const handleTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);

    if (tapTimer) clearTimeout(tapTimer);

    if (newCount === 3) {
      onExit();
      setTapCount(0);
    } else {
      const timer = setTimeout(() => setTapCount(0), 1000);
      setTapTimer(timer);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Fake Notes App Header */}
      <header className="bg-amber-50 border-b border-amber-100 p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl" onClick={handleTap}>Notes</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600">4 notes</p>
      </header>

      {/* Fake Notes List */}
      <div className="p-4 space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Check className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1">{note.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{note.preview}</p>
                <p className="text-xs text-gray-400">{note.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fake FAB */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-amber-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-amber-600 transition-colors">
        <Plus className="w-6 h-6" />
      </button>

      {/* Exit hint */}
      <div className="fixed bottom-24 left-0 right-0 text-center">
        <p className="text-xs text-gray-400">Triple-tap "Notes" title to return</p>
      </div>
    </div>
  );
}
