import windowsFlag from '../../assets/icons/windows-flag.webp';

export function MenuBar({ menus }: Readonly<{ menus: string[] }>) {
  return (
    <div aria-hidden className="flex h-6 shrink-0 border-b border-white/70">
      <ul className="flex flex-1 items-center overflow-hidden border-r border-b border-black/10 px-0.5">
        {menus.map((menu) => (
          <li key={menu} className="px-1.5">
            {menu}
          </li>
        ))}
      </ul>
      <img
        src={windowsFlag}
        alt=""
        className="border-b border-l border-b-black/10 border-l-white"
      />
    </div>
  );
}
