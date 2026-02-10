import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded transition-colors ${
          theme === 'light'
            ? 'bg-white dark:bg-gray-700 text-yellow-500 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
        title="Light mode"
      >
        <Sun className="w-4 h-4" />
      </button>

      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded transition-colors ${
          theme === 'dark'
            ? 'bg-white dark:bg-gray-700 text-blue-500 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
        title="Dark mode"
      >
        <Moon className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-gray-300 dark:bg-gray-600" />

      <button
        onClick={() => setTheme('system')}
        className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
          theme === 'system'
            ? 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
        title="System preference"
      >
        Auto
      </button>
    </div>
  );
}
