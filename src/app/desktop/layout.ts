export const TASKBAR_HEIGHT = 30;

// the desktop fills the viewport above the taskbar
export function desktopSize() {
  return { width: window.innerWidth, height: window.innerHeight - TASKBAR_HEIGHT };
}
