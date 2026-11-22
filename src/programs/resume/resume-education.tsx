import certificateIcon from '../../assets/icons/certificate.webp';
import { RESUME } from '../../content/resume';
import { GroupBox } from '../../organism/group-box/group-box';

export function ResumeEducation() {
  return RESUME.education.map((qualification) => (
    <GroupBox key={qualification.name} title={qualification.name} icon={certificateIcon}>
      <p>
        {qualification.institution} · {qualification.year}
      </p>
      {qualification.result && <p>{qualification.result}</p>}
    </GroupBox>
  ));
}
