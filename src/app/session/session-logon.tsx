import startupSound from '../../assets/sounds/startup.mp3';
import { PROFILE } from '../../content/profile';
import { useTimeout } from '../../hooks/use-timeout';
import { LogonScreen } from '../../organism/logon-screen/logon-screen';
import { useSessionActions, useSessionStore } from './store/session-store';

export function SessionLogon() {
  const isLoggingOn = useSessionStore((s) => s.phase === 'welcome');
  const { logOn, showDesktop, turnOff } = useSessionActions();
  useTimeout(showDesktop, isLoggingOn ? 1500 : null);

  function handleLogOn() {
    // browsers only allow sound inside a click so it plays here and a failed play is ignored
    new Audio(startupSound).play().catch(() => {});
    logOn();
  }

  return (
    <LogonScreen
      userName={PROFILE.name}
      userPicture={PROFILE.picture}
      isLoggingOn={isLoggingOn}
      onLogOn={handleLogOn}
      onTurnOff={turnOff}
    />
  );
}
