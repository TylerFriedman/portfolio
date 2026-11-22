import { useState } from 'react';
import { LINKS } from '../../content/profile';
import { PropertySheet } from '../../organism/property-sheet/property-sheet';
import { ResumeEducation } from './resume-education';
import { ResumeExperience } from './resume-experience';
import { ResumeGeneral } from './resume-general';
import { ResumeLeadership } from './resume-leadership';
import { ResumeProjects } from './resume-projects';
import { ResumeSkills } from './resume-skills';

const TABS = {
  General: <ResumeGeneral />,
  Experience: <ResumeExperience />,
  Education: <ResumeEducation />,
  Skills: <ResumeSkills />,
  Projects: <ResumeProjects />,
  Leadership: <ResumeLeadership />,
};

type Tab = keyof typeof TABS;

export function Resume() {
  const [tab, setTab] = useState<Tab>('General');

  return (
    <PropertySheet
      tabs={Object.keys(TABS) as Tab[]}
      selectedTab={tab}
      onSelectTab={setTab}
      buttons={LINKS.map((link) => (
        <a key={link.title} href={link.href} target="_blank" rel="noreferrer" className="xp-button">
          {link.title}
        </a>
      ))}
    >
      {TABS[tab]}
    </PropertySheet>
  );
}
