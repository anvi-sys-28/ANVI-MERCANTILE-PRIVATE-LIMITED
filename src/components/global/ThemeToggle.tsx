import { SunMoonThemeToggle } from '@/components/ui/sun-moon-theme-toggle';

export function ThemeToggle() {
  return (
    <div
      className="fixed right-3 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center p-1.5 bg-black/40 backdrop-blur-md rounded-full shadow-2xl border border-white/10"
      title="Toggle Light / Dark Theme"
    >
      <SunMoonThemeToggle
        size={46}
        duration={1200}
        sky={true}
        storageKey="theme"
      />
    </div>
  );
}

export default ThemeToggle;
