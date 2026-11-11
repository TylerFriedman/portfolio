import folderIcon from '../../assets/icons/folder.webp';

interface FolderTileProps {
  name: string;
  description: string;
  onOpen: () => void;
}

// a click only selects a folder and a double-click opens it, as in xp, with focus showing the selection
export function FolderTile({ name, description, onOpen }: Readonly<FolderTileProps>) {
  return (
    <button
      type="button"
      className="button-reset group flex w-50 items-center gap-1.5 text-left"
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
