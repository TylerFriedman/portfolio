import { PROFILE } from './profile';

interface Job {
  role: string;
  company: string;
  period: string;
  highlights?: string[];
}

interface Qualification {
  name: string;
  institution: string;
  year: string;
  result?: string;
}

interface Position {
  role: string;
  organisation: string;
  period?: string;
}

interface Resume {
  general: Record<string, string[]>;
  about: string;
  experience: Job[];
  education: Qualification[];
  skills: Record<string, string[]>;
  leadership: Position[];
}

export const RESUME: Resume = {
  general: {
    System: [PROFILE.name, 'Software Developer', 'React · TypeScript'],
    'Registered to': ['Sunstone Logistic Systems', 'Since April 2025'],
    Computer: ['Honours in Computer and Information Sciences', 'Varsity College, 2025'],
  },
  about:
    'I build web applications in React and TypeScript. This portfolio is one of them: a working Windows XP desktop, built from scratch.',
  experience: [
    {
      role: 'Software Developer',
      company: 'Sunstone Logistic Systems',
      period: 'Jan 2026 - Present',
      highlights: [
        'Build features end to end in React and TypeScript from the UI down to the API calls.',
        'Build complex forms with validation and bulk editing of many records at once using React Hook Form and Zod.',
        'Build data-heavy screens with search, filters and pagination that stay in sync with the server through TanStack Query.',
        'Work on interactive views such as a Gantt chart and a map.',
        'Build pages for a Next.js marketing site from CMS content with SEO metadata.',
        'Write unit tests with Vitest and Testing Library and document shared components in Storybook.',
      ],
    },
    {
      role: 'Developer Intern',
      company: 'Sunstone Logistic Systems',
      period: 'Apr 2025 - Dec 2025',
      highlights: [
        'Built screens to create, edit and bulk update records with form validation and empty states.',
        'Built reusable UI components with Storybook stories and unit tests for each one.',
      ],
    },
    { role: 'Tutor', company: 'Varsity College', period: 'Mar 2023 - Dec 2024' },
  ],
  education: [
    {
      name: 'Bachelor of Computer and Information Sciences (Honours)',
      institution: 'Varsity College',
      year: '2025',
      result: '85% average',
    },
    {
      name: 'Bachelor of Computer and Information Sciences in Application Development',
      institution: 'Varsity College',
      year: '2024',
      result: '90.5% average',
    },
    { name: 'Matric', institution: 'Torah Academy Boys High School', year: '2021' },
  ],
  skills: {
    Languages: ['TypeScript', 'JavaScript', 'C#', 'Java', 'Kotlin', 'SQL', 'HTML', 'CSS'],
    'Front end': [
      'React',
      'Next.js',
      'Tailwind CSS',
      'TanStack Query',
      'Zustand',
      'React Hook Form',
      'Zod',
      'Storybook',
    ],
    'Back end and data': ['Node.js', 'Express', 'ASP.NET Core MVC', 'Firebase', 'MySQL'],
    'Testing and tools': [
      'Vitest',
      'Jest',
      'Testing Library',
      'Git',
      'GitHub Actions',
      'Azure Pipelines',
      'Nx',
      'Vite',
    ],
  },
  leadership: [
    {
      role: 'Vice Chairman',
      organisation: 'SAUJS Private Universities',
      period: '2023 - 2025',
    },
    { role: 'Volunteer', organisation: 'Yad Aharon' },
    { role: 'Class Representative', organisation: 'Varsity College', period: '2022' },
  ],
};
