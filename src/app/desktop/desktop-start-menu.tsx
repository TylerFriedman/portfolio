import { LINKS, PROFILE } from '../../content/profile';
import { StartMenu } from '../../organism/start-menu/start-menu';
import { PROGRAMS, type ProgramId } from '../../programs/registry';
import { useWindowActions } from './store/window-store';

// pinned programs sit on the left and documents on the right, like xp's my documents
const PINNED: { id: ProgramId; description: string }[] = [
  { id: 'about', description: 'Who I am' },
  { id: 'contact', description: 'Get in touch' },
];
const PLACES: { id: ProgramId; title: string }[] = [
  { id: 'projects', title: 'My Projects' },
  { id: 'resume', title: 'My Resume' },
];

export function DesktopStartMenu() {
  const { open } = useWindowActions();

  return (
    <StartMenu
      userName={PROFILE.name}
      userPicture={PROFILE.picture}
      programs={PINNED.map(({ id, description }) => ({
        ...PROGRAMS[id],
        description,
        onOpen: () => open(id),
      }))}
      places={PLACES.map(({ id, title }) => ({ ...PROGRAMS[id], title, onOpen: () => open(id) }))}
      links={LINKS}
    />
  );
}
