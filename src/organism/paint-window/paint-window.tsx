import paintPalette from '../../assets/icons/paint-palette.png';
import paintToolbox from '../../assets/icons/paint-toolbox.png';
import paintIcon from '../../assets/icons/paint.webp';

const MENUS = ['File', 'Edit', 'View', 'Image', 'Colors', 'Help'];

interface PaintWindowProps {
  name: string;
  image: string;
}

// a still of paint so its chrome is for looks only
export function PaintWindow({ name, image }: Readonly<PaintWindowProps>) {
  return (
    <div className="window font-xp text-xp w-full max-w-max">
      <div inert className="title-bar brightness-125 saturate-50">
        <div className="title-bar-text flex min-w-0 items-center gap-1">
          <img src={paintIcon} alt="" className="size-4" />
          <span className="truncate">{name} - Paint</span>
        </div>
        <div className="title-bar-controls">
          <button type="button" aria-label="Minimize" />
          <button type="button" aria-label="Maximize" />
          <button type="button" aria-label="Close" />
        </div>
      </div>
      <ul inert className="mx-0.75 flex flex-wrap">
        {MENUS.map((menu) => (
          <li key={menu} className="px-1.5 leading-5">
            {menu}
          </li>
        ))}
      </ul>
      <div className="mx-0.75 flex">
        <img src={paintToolbox} alt="" className="shrink-0 self-start" />
        <div className="bg-paint-workspace min-w-0 flex-1 border border-t-black/50 border-r-white border-b-white border-l-black/50 p-0.75">
          <img src={image} alt="" className="block w-full" />
        </div>
      </div>
      <div className="mx-0.75 overflow-hidden py-1">
        <img src={paintPalette} alt="" className="block max-w-none" />
      </div>
      <div inert className="status-bar">
        <p className="status-bar-field min-w-0 truncate">
          For Help, click Help Topics on the Help Menu.
        </p>
      </div>
    </div>
  );
}
