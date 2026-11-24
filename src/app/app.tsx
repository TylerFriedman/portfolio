import { lazy, Suspense, useEffect } from 'react';
import { SessionBoot } from './session/session-boot';
import { SessionLogon } from './session/session-logon';
import { useSessionStore } from './session/store/session-store';

const loadDesktop = () => import('./desktop/desktop');
const Desktop = lazy(() => loadDesktop().then(({ Desktop }) => ({ default: Desktop })));

export function App() {
  const phase = useSessionStore((s) => s.phase);

  useEffect(() => {
    if (phase !== 'boot') void loadDesktop();
  }, [phase]);

  if (phase === 'boot') return <SessionBoot />;
  if (phase === 'desktop') {
    return (
      <Suspense>
        <Desktop />
      </Suspense>
    );
  }
  return <SessionLogon />;
}
