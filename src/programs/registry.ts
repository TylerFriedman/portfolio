export const PROGRAMS = {
  about: { title: 'About Me' },
  resume: { title: 'Resume' },
  projects: { title: 'Projects' },
  contact: { title: 'Contact' },
} satisfies Record<string, { title: string }>;

export type ProgramId = keyof typeof PROGRAMS;
