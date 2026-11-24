import { PROFILE } from '../../content/profile';
import { useTimeout } from '../../hooks/use-timeout';
import { BootScreen } from '../../organism/boot-screen/boot-screen';
import { useSessionActions } from './store/session-store';

export function SessionBoot() {
  const { showLogon } = useSessionActions();
  useTimeout(showLogon, 3000);

  return <BootScreen userName={PROFILE.name} onSkip={showLogon} />;
}
