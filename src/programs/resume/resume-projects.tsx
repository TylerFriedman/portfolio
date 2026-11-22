import folderIcon from '../../assets/icons/folder.webp';
import { PROJECTS } from '../../content/projects';
import { GroupBox } from '../../organism/group-box/group-box';

export function ResumeProjects() {
  return PROJECTS.map((project) => (
    <GroupBox key={project.id} title={project.title} icon={folderIcon}>
      <p>{project.details.join(' · ')}</p>
      <p>{project.stack.join(', ')}</p>
    </GroupBox>
  ));
}
