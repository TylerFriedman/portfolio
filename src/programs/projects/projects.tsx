import { useState } from 'react';
import folderSmallIcon from '../../assets/icons/folder-small.webp';
import githubIcon from '../../assets/icons/github.svg';
import { LINKS } from '../../content/profile';
import { PROJECTS, type Project } from '../../content/projects';
import { Explorer } from '../../organism/explorer/explorer';
import { FolderTile } from '../../organism/folder-tile/folder-tile';
import { TaskPaneDetails, TaskPaneGroup, TaskPaneLink } from '../../organism/task-pane/task-pane';
import { ProjectPage } from './project-page';

function TaskPane({ project }: Readonly<{ project?: Project }>) {
  return (
    <>
      <TaskPaneGroup title="Other Places">
        {LINKS.map((link) => (
          <TaskPaneLink key={link.title} {...link} />
        ))}
      </TaskPaneGroup>
      <TaskPaneGroup title="Details">
        <TaskPaneDetails
          name={project?.title ?? 'My Projects'}
          details={['File Folder', ...(project?.details ?? [])]}
        />
        {project?.repos.map((repo) => (
          <TaskPaneLink key={repo.title} {...repo} icon={githubIcon} />
        ))}
      </TaskPaneGroup>
    </>
  );
}

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const project = PROJECTS.find(({ id }) => id === openId);
  // projects sit one level down, so back and up both lead to the folder
  const goToFolder = project ? () => setOpenId(null) : undefined;

  return (
    <Explorer
      address={project ? `My Projects\\${project.title}` : 'My Projects'}
      addressIcon={folderSmallIcon}
      onBack={goToFolder}
      onUp={goToFolder}
      taskPane={<TaskPane project={project} />}
    >
      {project ? (
        <ProjectPage project={project} />
      ) : (
        <ul className="flex flex-wrap gap-4 p-4">
          {PROJECTS.map(({ id, title }) => (
            <li key={id}>
              <FolderTile name={title} description="File Folder" onOpen={() => setOpenId(id)} />
            </li>
          ))}
        </ul>
      )}
    </Explorer>
  );
}
