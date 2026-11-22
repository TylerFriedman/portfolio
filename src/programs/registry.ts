import type { ComponentType } from 'react';
import myDocumentsIcon from '../assets/icons/my-documents.webp';
import notepadIcon from '../assets/icons/notepad.webp';
import outlookExpressIcon from '../assets/icons/outlook-express.webp';
import systemPropertiesIcon from '../assets/icons/system-properties.webp';
import type { WindowProps } from '../organism/window/window';
import { Contact } from './contact/contact';
import { Notepad } from './notepad/notepad';
import { Projects } from './projects/projects';
import { Resume } from './resume/resume';

interface Program {
  title: string;
  windowTitle?: string;
  icon: string;
  component: ComponentType;
  size?: WindowProps['minSize'];
  minSize: WindowProps['minSize'];
}

export const PROGRAMS = {
  notepad: {
    title: 'Notepad',
    windowTitle: 'Untitled - Notepad',
    icon: notepadIcon,
    component: Notepad,
    minSize: { width: 200, height: 160 },
  },
  resume: {
    title: 'Resume',
    windowTitle: 'Resume Properties',
    size: { width: 460, height: 480 },
    icon: systemPropertiesIcon,
    component: Resume,
    minSize: { width: 460, height: 300 },
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

export function openSize(id: ProgramId) {
  const program: Program = PROGRAMS[id];
  return program.size ?? { width: 640, height: 480 };
}
