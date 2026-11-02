import Image from "next/image";
import type { Profile } from "@/types";

const buttonBase = "inline-flex h-12 flex-1 items-center justify-center px-7 text-[15px] transition-colors sm:min-w-[143px] sm:flex-none";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="home" aria-label="소개" className="container-page flex flex-col gap-8 pt-10 pb-[72px] lg:flex-row lg:items-center lg:gap-16 lg:pt-24 lg:pb-[120px]">
      <div className="flex min-w-0 flex-col gap-3.5 lg:flex-1 lg:gap-5">
        <p className="text-sm font-medium tracking-[1px] text-accent md:text-lg">PORTFOLIO</p>
        <h1 className="text-4xl leading-[1.2] font-bold tracking-[-1px] lg:text-[clamp(36px,4.4vw,56px)]">
          안녕하세요,
          <br />
          {profile.name}입니다
        </h1>
        <p className="text-base font-medium text-muted md:text-lg">
          {profile.school} {profile.major}
        </p>
        <p className="mt-1 max-w-[30ch] text-[17px] leading-[1.6] text-fg md:mt-2 md:text-xl">{profile.headline}</p>
        <div className="mt-[18px] flex gap-3 sm:flex-wrap sm:gap-4 lg:mt-6">
          <a href="#contact" className={`${buttonBase} bg-accent font-bold text-canvas hover:bg-[#2fc56e]`}>
            연락하기
          </a>
          <a href="#about" className={`${buttonBase} border border-fg font-medium text-white hover:border-accent hover:text-accent`}>
            더 알아보기
          </a>
        </div>
      </div>

      <div className="order-first flex justify-center lg:order-none lg:flex-1">
        <div className="aspect-square w-[280px] rounded-full border border-[#202020] bg-photo/20 p-3 lg:w-full lg:max-w-[560px] lg:p-[4.2%]">
          <div className="relative h-full w-full overflow-hidden rounded-full border border-line bg-photo">
            <Image
              src={profile.imageUrl}
              alt={`${profile.name} 프로필 일러스트`}
              fill
              priority
              sizes="(min-width: 1024px) 560px, 280px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
