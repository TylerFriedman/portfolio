import type { ComponentType } from 'react';
import addressBookIcon from '../assets/icons/address-book.webp';
import myDocumentsIcon from '../assets/icons/my-documents.webp';
import notepadIcon from '../assets/icons/notepad.webp';
import outlookExpressIcon from '../assets/icons/outlook-express.webp';
import { Placeholder } from './placeholder';
import { Projects } from './projects/projects';

export const PROGRAMS = {
  about: { title: 'About Me', icon: notepadIcon, component: Placeholder },
  resume: { title: 'Resume', icon: addressBookIcon, component: Placeholder },
  projects: { title: 'Projects', icon: myDocumentsIcon, component: Projects },
  contact: { title: 'Contact', icon: outlookExpressIcon, component: Placeholder },
} satisfies Record<string, { title: string; icon: string; component: ComponentType }>;

export type ProgramId = keyof typeof PROGRAMS;

export const PROGRAM_IDS = Object.keys(PROGRAMS) as ProgramId[];
