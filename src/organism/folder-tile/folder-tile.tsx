import folderIcon from '../../assets/icons/folder.webp';
import { useTap } from '../../hooks/use-tap';

interface FolderTileProps {
  name: string;
  description: string;
  onOpen: () => void;
}

// a click selects and a double-click opens, as in xp, but a finger has no double-click so a tap opens
export function FolderTile({ name, description, onOpen }: Readonly<FolderTileProps>) {
  const tap = useTap(onOpen);

  return (
    <button
      type="button"
      className="button-reset group flex w-50 items-center gap-1.5 text-left"
      onPointerDown={tap.onPointerDown}
      onClick={tap.onClick}
      onDoubleClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter') onOpen();
      }}
    >
      <img src={folderIcon} alt="" className="size-12" />
      <span className="group-focus:bg-highlight flex flex-col px-0.5 group-focus:text-white">
        <span>{name}</span>
        <span className="text-black/50 group-focus:text-white/80">{description}</span>
      </span>
    </button>
  );
}
