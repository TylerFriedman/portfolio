import wallpaper from '../../assets/wallpaper.webp';
import { DesktopIcons } from './desktop-icons';
import { DesktopTaskbar } from './desktop-taskbar';
import { DesktopWindows } from './desktop-windows';

export function Desktop() {
  return (
    <main className="flex h-dvh flex-col">
      <div className="bg-desktop relative flex-1 overflow-hidden">
        <img src={wallpaper} alt="" className="absolute inset-0 size-full object-cover" />
        <DesktopIcons />
        <DesktopWindows />
      </div>
      <DesktopTaskbar />
    </main>
  );
}
