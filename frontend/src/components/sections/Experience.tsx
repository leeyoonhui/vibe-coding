import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Award } from "@/types";

export function Experience({ awards }: { awards: Award[] }) {
  return (
    <section id="experience" aria-labelledby="experience-title" className="container-page py-14 md:py-24">
      <Reveal className="flex flex-col gap-8 md:gap-[72px]">
        <SectionTitle id="experience-title">Awards &amp; Experience</SectionTitle>
        <div className="border border-edge bg-surface py-7 pr-6 pl-11 lg:px-[clamp(24px,4vw,64px)] lg:py-14">
          {/* 모바일·태블릿: 세로 타임라인 / 데스크톱: 가로 타임라인 */}
          <ol className="flex flex-col gap-7 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:border-t lg:border-line">
            {awards.map((award) => (
              <li key={award.id} className="relative flex flex-col gap-1.5 lg:gap-3 lg:pt-8">
                <span aria-hidden="true" className="absolute top-1.5 -left-[26px] size-2.5 rounded-full bg-accent lg:-top-[7px] lg:left-0 lg:size-3" />
                <time dateTime={award.startDate.replace(".", "-")} className="text-2xl leading-none font-bold text-muted lg:text-[40px]">
                  {award.startDate}
                </time>
                <span className="text-xs font-bold tracking-[1px] text-accent lg:text-sm">
                  {award.category.toUpperCase()}
                  {award.endDate && ` · ~ ${award.endDate}`}
                </span>
                <span className="text-base leading-[1.5] font-medium text-white lg:text-lg">{award.title}</span>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
