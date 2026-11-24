import turnOffIcon from '../../assets/icons/turn-off.webp';
import portfolioLogo from '../../assets/portfolio-logo.webp';

interface LogonScreenProps {
  userName: string;
  userPicture: string;
  // after the click xp says welcome and loads the user's settings
  isLoggingOn: boolean;
  onLogOn: () => void;
  onTurnOff: () => void;
}

// sized in xp's 800x600 pixels and scaled to fill the screen from tablet width up
export function LogonScreen({
  userName,
  userPicture,
  isLoggingOn,
  onLogOn,
  onTurnOff,
}: Readonly<LogonScreenProps>) {
  return (
    <main className="bg-logon-stage font-logon md:xp-screen flex h-dvh flex-col text-white">
      <div className="bg-logon-band h-19.5 shrink-0 max-md:h-20" />
      <hr className="bg-logon-header-rule h-0.5 shrink-0 border-0" />
      {/* phones stack the two halves with the divider lying flat between them */}
      <div className="flex flex-1 items-center max-md:flex-col max-md:justify-center max-md:gap-8">
        <div className="flex flex-1 flex-col items-end pr-12 max-md:flex-none max-md:items-center max-md:pr-0">
          {isLoggingOn ? (
            <h1 className="text-shadow-logon text-logon-welcome font-medium italic">welcome</h1>
          ) : (
            <>
              <img src={portfolioLogo} alt="" className="mb-5 w-37.5 max-md:mb-0 max-md:w-52" />
              <h1 className="font-logon-book text-logon-large max-md:sr-only">
                To begin, click your user name
              </h1>
            </>
          )}
        </div>
        <div className="from-logon to-logon h-7/10 w-0.5 bg-linear-to-b via-white/60 max-md:h-0.5 max-md:w-7/10 max-md:bg-linear-to-r" />
        <div className="flex-1 pl-9 max-md:flex-none max-md:pl-0">
          <button
            type="button"
            disabled={isLoggingOn}
            className="button-reset font-logon group enabled:hover:bg-logon-tile focus-visible:bg-logon-tile flex h-17.5 w-93.75 items-start gap-3 rounded-md pt-2.25 pl-2.5 text-left text-white max-md:h-auto max-md:w-auto max-md:flex-col max-md:items-center max-md:p-0 max-md:text-center"
            onClick={onLogOn}
          >
            <img
              src={userPicture}
              alt=""
              className="shadow-logon-picture group-enabled:group-hover:border-logon-picture-hot-border group-enabled:group-hover:bg-logon-picture-hot size-13 rounded-sm border border-white/85 bg-white p-px max-md:size-24"
            />
            <span className="flex flex-col">
              <span className="font-logon-book text-logon-name max-md:text-2xl">{userName}</span>
              {isLoggingOn && (
                <span className="font-logon-small text-logon-small text-logon-band font-bold">
                  Loading your personal settings...
                </span>
              )}
            </span>
          </button>
        </div>
      </div>
      <hr className="bg-logon-footer-rule h-0.5 shrink-0 border-0" />
      <div className="bg-logon-footer flex h-23.5 shrink-0 items-start justify-between gap-4 pt-5 pr-12.5 pl-6.75 max-md:h-20 max-md:items-center max-md:px-4 max-md:py-0">
        {!isLoggingOn && (
          <>
            <button
              type="button"
              className="button-reset font-logon group flex shrink-0 items-center gap-2 text-white"
              onClick={onTurnOff}
            >
              <img
                src={turnOffIcon}
                alt=""
                className="size-6 group-active:brightness-85 max-md:size-5"
              />
              <span className="text-logon-large font-medium group-hover:underline max-md:text-sm">
                Turn off computer
              </span>
            </button>
            <p className="font-logon-small text-logon-small mt-0.75 leading-3.5 max-md:mt-0">
              After you log on, you can open my projects, resume and contact details.
              <br />
              Just double-click an icon on the desktop.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
