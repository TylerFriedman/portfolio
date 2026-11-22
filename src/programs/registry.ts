import type { ComponentType } from 'react';
import addressBookIcon from '../assets/icons/address-book.webp';
import myDocumentsIcon from '../assets/icons/my-documents.webp';
import notepadIcon from '../assets/icons/notepad.webp';
import outlookExpressIcon from '../assets/icons/outlook-express.webp';
import type { WindowProps } from '../organism/window/window';
import { Contact } from './contact/contact';
import { Placeholder } from './placeholder';
import { Projects } from './projects/projects';

interface Program {
  title: string;
  windowTitle?: string;
  icon: string;
  component: ComponentType;
  minSize: WindowProps['minSize'];
}

const PLACEHOLDER_MIN_SIZE = { width: 200, height: 160 };

export const PROGRAMS = {
  about: {
    title: 'About Me',
    icon: notepadIcon,
    component: Placeholder,
    minSize: PLACEHOLDER_MIN_SIZE,
  },
  resume: {
    title: 'Resume',
    icon: addressBookIcon,
    component: Placeholder,
    minSize: PLACEHOLDER_MIN_SIZE,
  },
  projects: {
    title: 'Projects',
    icon: myDocumentsIcon,
    component: Projects,
    minSize: { width: 400, height: 300 },
  },
  contact: {
    title: 'Contact',
    windowTitle: 'New Message',
    icon: outlookExpressIcon,
    component: Contact,
    minSize: { width: 320, height: 280 },
  },
} satisfies Record<string, Program>;

export type ProgramId = keyof typeof PROGRAMS;

export const PROGRAM_IDS = Object.keys(PROGRAMS) as ProgramId[];

export function windowTitle(id: ProgramId) {
  const program: Program = PROGRAMS[id];
  return program.windowTitle ?? program.title;
}
