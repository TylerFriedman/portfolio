import programsIcon from '../../assets/icons/programs.webp';
import { RESUME } from '../../content/resume';
import { GroupBox } from '../../organism/group-box/group-box';

export function ResumeSkills() {
  return Object.entries(RESUME.skills).map(([group, skills]) => (
    <GroupBox key={group} title={group} icon={programsIcon}>
      <p>{skills.join(', ')}</p>
    </GroupBox>
  ));
}
