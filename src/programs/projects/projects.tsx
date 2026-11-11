import { useState } from 'react';
import folderSmallIcon from '../../assets/icons/folder-small.webp';
import { LINKS } from '../../content/profile';
import { PROJECTS, type Project } from '../../content/projects';
import { Explorer, ExplorerSection } from '../../organism/explorer/explorer';
import { FolderTile } from '../../organism/folder-tile/folder-tile';
import { TaskPaneDetails, TaskPaneGroup, TaskPaneLink } from '../../organism/task-pane/task-pane';

function TaskPane({ name }: Readonly<{ name: string }>) {
  return (
    <>
      <TaskPaneGroup title="Other Places">
        {LINKS.map((link) => (
          <TaskPaneLink key={link.title} {...link} />
        ))}
      </TaskPaneGroup>
      <TaskPaneGroup title="Details">
        <TaskPaneDetails name={name} details={['File Folder']} />
      </TaskPaneGroup>
    </>
  );
}

function ProjectPage({ project }: Readonly<{ project: Project }>) {
  return (
    <>
      <div className="p-4">
        <img src={project.image} alt="" className="aspect-video w-full max-w-160" />
      </div>
      <ExplorerSection title="Overview" />
      <ExplorerSection title="What I Built" />
      <ExplorerSection title="Key Features" />
      <ExplorerSection title="Built With" />
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
      taskPane={<TaskPane name={project?.title ?? 'My Projects'} />}
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
