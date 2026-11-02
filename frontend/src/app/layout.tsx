import type { Metadata } from "next";
import { DM_Sans, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const description = "서울시립대학교 경영학부 임재정의 포트폴리오. 데이터 분석과 MIS에 관심이 많은, 긍정적인 에너지와 논리적 사고로 팀의 성장을 돕는 인재입니다.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "임재정 | Portfolio",
  description,
  openGraph: {
    title: "임재정 | Portfolio",
    description,
    type: "website",
    locale: "ko_KR",
    images: [{ url: "/images/profile.png", width: 1536, height: 1024, alt: "임재정 프로필 일러스트" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className={`${dmSans.variable} ${notoSansKr.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
