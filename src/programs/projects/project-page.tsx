import type { Project } from '../../content/projects';
import { ExplorerSection } from '../../organism/explorer/explorer';
import { PaintWindow } from '../../organism/paint-window/paint-window';

function BulletList({ items }: Readonly<{ items: string[] }>) {
  return (
    <ul className="max-w-160 list-disc space-y-1 pl-4">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ProjectPage({ project }: Readonly<{ project: Project }>) {
  return (
    <>
      {project.image && (
        <div className="p-4">
          <PaintWindow name={project.title} image={project.image} />
        </div>
      )}
      <ExplorerSection title="Overview">
        <div className="max-w-160 space-y-2">
          {project.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </ExplorerSection>
      <ExplorerSection title="How It Works">
        <ol className="max-w-160 list-decimal space-y-1 pl-4">
          {project.howItWorks.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </ExplorerSection>
      <ExplorerSection title="What Was Built">
        <div className="space-y-3">
          {Object.entries(project.built).map(([part, items]) => (
            <div key={part}>
              <h3 className="text-xp mb-1 font-bold">{part}</h3>
              <BulletList items={items} />
            </div>
          ))}
        </div>
      </ExplorerSection>
      <ExplorerSection title="Key Features">
        <BulletList items={project.features} />
      </ExplorerSection>
      <ExplorerSection title="Built With">
        <p>{project.stack.join(', ')}</p>
      </ExplorerSection>
    </>
  );
}
