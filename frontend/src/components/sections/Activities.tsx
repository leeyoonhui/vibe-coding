import { ActivityIconView } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Activity } from "@/types";

export function Activities({ activities }: { activities: Activity[] }) {
  return (
    <section id="activities" aria-labelledby="activities-title" className="container-page py-14 md:py-24">
      <Reveal className="flex flex-col gap-8 md:gap-20">
        <SectionTitle id="activities-title">Activities</SectionTitle>
        <ul className="grid gap-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className={`group flex items-center gap-5 border-b-4 bg-surface p-6 transition-colors hover:border-accent sm:min-h-[260px] sm:flex-col sm:items-start sm:gap-7 sm:border-b-[5px] sm:px-8 sm:pt-9 sm:pb-10 ${
                activity.featured ? "border-accent" : "border-surface"
              }`}
            >
              <ActivityIconView icon={activity.icon} className="size-9 shrink-0 text-accent sm:size-12" />
              <div className="flex w-full min-w-0 flex-col gap-1.5 sm:gap-3">
                <h3 className="text-[19px] leading-[1.3] font-bold text-white sm:text-[26px]">{activity.title}</h3>
                <p
                  className={`text-sm font-medium transition-colors group-hover:text-accent sm:text-base ${
                    activity.featured ? "text-accent" : "text-subtle"
                  }`}
                >
                  {activity.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
