import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Activities } from "@/components/sections/Activities";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { getPortfolio } from "@/lib/api";

// 요청마다 렌더링하고, API 응답은 fetch 캐시(60초)로 재사용한다.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getPortfolio();

  if (!data) {
    return (
      <>
        <Header name="Portfolio" />
        <main id="home" className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 py-24 text-center">
          <h1 className="text-2xl font-bold md:text-3xl">콘텐츠를 불러오지 못했습니다</h1>
          <p className="text-muted">잠시 후 다시 시도해 주세요.</p>
          <a href="" className="mt-4 inline-flex h-12 items-center border border-fg px-7 text-[15px] font-medium hover:border-accent hover:text-accent">
            새로고침
          </a>
        </main>
        <Footer name="Portfolio" />
      </>
    );
  }

  const { profile, activities, awards } = data;

  return (
    <>
      <Header name={profile.name} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Activities activities={activities} />
        <Experience awards={awards} />
        <Contact profile={profile} />
      </main>
      <Footer name={profile.name} />
    </>
  );
}
