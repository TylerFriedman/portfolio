import { Desktop } from './desktop/desktop';
import { SessionBoot } from './session/session-boot';
import { SessionLogon } from './session/session-logon';
import { useSessionStore } from './session/store/session-store';

export function App() {
  const phase = useSessionStore((s) => s.phase);

  if (phase === 'boot') return <SessionBoot />;
  if (phase === 'desktop') return <Desktop />;
  return <SessionLogon />;
}
