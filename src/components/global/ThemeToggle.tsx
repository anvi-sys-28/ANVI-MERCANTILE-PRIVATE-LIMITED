import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
      title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-14 h-14 bg-[#3c4250] hover:bg-[#485061] text-[#facc15] rounded-l-2xl shadow-xl transition-all duration-200 cursor-pointer focus:outline-none"
    >
      {isDark ? (
        <Sun className="w-6 h-6 text-[#facc15]" strokeWidth={2.2} />
      ) : (
        <Moon className="w-6 h-6 text-[#facc15]" strokeWidth={2.2} />
      )}
    </button>
  );
}

export default ThemeToggle;
