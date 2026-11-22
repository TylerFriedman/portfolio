import informationIcon from '../../assets/icons/information.webp';
import { PROFILE } from '../../content/profile';
import { RESUME } from '../../content/resume';
import { GroupBox } from '../../organism/group-box/group-box';

// laid out like the general tab of xp's system properties with my photo where the windows logo sits
export function ResumeGeneral() {
  return (
    <div className="space-y-5">
      <div className="flex gap-6 pt-3 pl-2">
        <img
          src={PROFILE.picture}
          alt=""
          className="mt-3 h-30.5 w-26 rounded-sm border-3 border-white object-cover shadow-md"
        />
        <dl className="min-w-0 space-y-3">
          {Object.entries(RESUME.general).map(([label, lines]) => (
            <div key={label}>
              <dt>{label}:</dt>
              {lines.map((line) => (
                <dd key={line} className="mt-1 ml-5.5">
                  {line}
                </dd>
              ))}
            </div>
          ))}
        </dl>
      </div>
      <GroupBox title="About me" icon={informationIcon}>
        <p>{RESUME.about}</p>
      </GroupBox>
    </div>
  );
}
