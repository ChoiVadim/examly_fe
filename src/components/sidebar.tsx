import { useState } from 'react';
import { MessageSquare, PenTool, Settings, Home } from 'lucide-react';
import { cn } from '../lib/utils';

const menuItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: MessageSquare, label: 'Chat', href: '/chat' },
  { icon: PenTool, label: 'Exam', href: '/exam' },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cn(
        "h-full rounded-lg bg-zinc-900 transition-all duration-300 ease-in-out flex flex-col",
        isExpanded ? "w-48" : "w-16"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Top Section */}
      <div className="flex flex-col gap-4 p-4">
        {menuItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-4 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <item.icon className="w-6 h-6" />
            {isExpanded && (
              <span className="whitespace-nowrap transition-opacity duration-300">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="mt-auto p-4">
        <div
          className="flex items-center gap-4 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <Settings className="w-6 h-6" />
          {isExpanded && (
            <span className="whitespace-nowrap transition-opacity duration-300">
              Settings
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
