import userAccountsIcon from '../../assets/icons/user-accounts.webp';
import { RESUME } from '../../content/resume';
import { GroupBox } from '../../organism/group-box/group-box';

export function ResumeLeadership() {
  return RESUME.leadership.map((position) => (
    <GroupBox key={position.role} title={position.role} icon={userAccountsIcon}>
      <p>
        {position.organisation}
        {position.period && ` · ${position.period}`}
      </p>
    </GroupBox>
  ));
}
