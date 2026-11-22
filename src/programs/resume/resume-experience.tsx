import briefcaseIcon from '../../assets/icons/briefcase.webp';
import { RESUME } from '../../content/resume';
import { BulletList } from '../../organism/bullet-list/bullet-list';
import { GroupBox } from '../../organism/group-box/group-box';

export function ResumeExperience() {
  return RESUME.experience.map((job) => (
    <GroupBox key={job.role} title={job.role} icon={briefcaseIcon}>
      <p>
        {job.company} · {job.period}
      </p>
      {job.highlights && <BulletList items={job.highlights} />}
    </GroupBox>
  ));
}
