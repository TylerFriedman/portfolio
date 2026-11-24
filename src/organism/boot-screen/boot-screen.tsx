import { useEffect } from 'react';
import { PortfolioLogo } from '../portfolio-logo/portfolio-logo';

interface BootScreenProps {
  userName: string;
  onSkip: () => void;
}

// sized in xp's 800x600 pixels and scaled to fill the screen from tablet width up
export function BootScreen({ userName, onSkip }: Readonly<BootScreenProps>) {
  // any key or click skips the boot and capture keeps the turn off click from doing it too
  useEffect(() => {
    const options = { capture: true };
    window.addEventListener('keydown', onSkip, options);
    window.addEventListener('click', onSkip, options);
    return () => {
      window.removeEventListener('keydown', onSkip, options);
      window.removeEventListener('click', onSkip, options);
    };
  }, [onSkip]);

  return (
    <main className="md:xp-screen relative flex h-dvh flex-col items-center justify-center gap-17 bg-black text-white select-none">
      <PortfolioLogo
        alt={`${userName} Portfolio XP`}
        fetchPriority="high"
        className="w-70 max-md:w-60"
      />
      {/* screen readers get a real progress element and the drawn bar is for looks */}
      <progress aria-label="Starting up" className="sr-only" />
      <div
        aria-hidden
        className="border-boot-bar-border inset-ring-boot-bar-ring relative h-4.75 w-39.5 overflow-hidden rounded-full border inset-ring"
      >
        <div className="motion-safe:animate-boot-bar absolute top-0.75 flex gap-0.5">
          {[1, 2, 3].map((block) => (
            <span key={block} className="bg-boot-bar-block h-2.75 w-2" />
          ))}
        </div>
      </div>
      <div className="absolute inset-x-7 bottom-6 flex items-end justify-between max-md:inset-x-4">
        <p className="font-logon-book text-boot-corner leading-4.5 max-md:text-sm">
          Copyright © 2026
          <br />
          {userName}
        </p>
        <p className="font-logo text-boot-name font-extrabold italic max-md:text-base">
          {userName}
        </p>
      </div>
    </main>
  );
}
