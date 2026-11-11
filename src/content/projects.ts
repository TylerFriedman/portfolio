import projectPlaceholder from '../assets/project-placeholder.svg';

export interface Project {
  id: string;
  title: string;
  image: string;
}

export const PROJECTS: Project[] = [
  { id: 'payment-portal', title: 'Payment Portal', image: projectPlaceholder },
  { id: 'alleysway', title: 'Alleysway', image: projectPlaceholder },
  { id: 'fusion', title: 'Fusion', image: projectPlaceholder },
  { id: 'clockit', title: 'ClockIT', image: projectPlaceholder },
];
