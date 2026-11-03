import addressBookIcon from '../assets/icons/address-book.webp';
import myDocumentsIcon from '../assets/icons/my-documents.webp';
import notepadIcon from '../assets/icons/notepad.webp';
import outlookExpressIcon from '../assets/icons/outlook-express.webp';

export const PROGRAMS = {
  about: { title: 'About Me', icon: notepadIcon },
  resume: { title: 'Resume', icon: addressBookIcon },
  projects: { title: 'Projects', icon: myDocumentsIcon },
  contact: { title: 'Contact', icon: outlookExpressIcon },
} satisfies Record<string, { title: string; icon: string }>;

export type ProgramId = keyof typeof PROGRAMS;

export const PROGRAM_IDS = Object.keys(PROGRAMS) as ProgramId[];
