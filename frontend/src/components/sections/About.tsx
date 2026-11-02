import { BarChartIcon, BriefcaseIcon, IdCardIcon, SchoolIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Profile } from "@/types";

function InfoItem({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2.5 text-center md:gap-4 lg:max-w-[240px] lg:flex-1">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-accent md:h-[62px] md:w-[62px]">{icon}</span>
      <dt className="text-base font-bold md:text-lg">{label}</dt>
      <dd className="text-[15px] text-soft md:text-[17px]">{children}</dd>
    </div>
  );
}

export function About({ profile }: { profile: Profile }) {
  return (
    <section id="about" aria-labelledby="about-title" className="container-page py-14 md:py-24">
      <Reveal className="flex flex-col items-center gap-8 md:gap-12">
        <SectionTitle id="about-title">About</SectionTitle>
        <p className="max-w-[760px] text-center text-base leading-[1.8] text-fg md:text-lg">
          {profile.intro.map((line, i) => (
            <span key={i} className="md:block">
              {line}{" "}
            </span>
          ))}
        </p>
        <dl className="grid w-full grid-cols-2 gap-x-4 gap-y-7 md:mt-4 lg:flex lg:justify-center lg:gap-6">
          <InfoItem icon={<SchoolIcon />} label="학교">
            {profile.school}
          </InfoItem>
          <InfoItem icon={<BriefcaseIcon />} label="전공">
            {profile.major}
          </InfoItem>
          <InfoItem icon={<IdCardIcon />} label="학번">
            {profile.studentId}
          </InfoItem>
          <InfoItem icon={<BarChartIcon />} label="관심 분야">
            <span className="flex flex-wrap justify-center gap-2">
              {profile.interests.map((interest) => (
                <span key={interest} className="border border-edge px-3 py-1.5 text-sm font-medium text-fg">
                  {interest}
                </span>
              ))}
            </span>
          </InfoItem>
        </dl>
      </Reveal>
    </section>
  );
}
