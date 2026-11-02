# CLAUDE.md

이 프로젝트는 임재정(서울시립대학교 경영학부)의 **원 페이지 개인 포트폴리오 사이트**이다. 제품 요구사항은 [PRD.md](PRD.md)를, 원본 요구사항은 [`docs/Profile_요구사항.txt`](docs/Profile_요구사항.txt)를 참고한다.

## 반드시 지킬 제약
- **원 페이지**: 하위 라우트(페이지)를 만들지 않는다. 모든 콘텐츠는 `/` 한 페이지의 섹션으로 구성하고, 네비게이션은 앵커(`#about` 등)로 이동한다.
- **FE/BE 분리**: 프론트엔드(`frontend/`)와 백엔드(`backend/`)를 별도 프로젝트로 개발하고, 각각 Vercel에 배포한다.
- **정적 HTML만으로 만들지 않음**: 향후 DB 연동을 위해 콘텐츠 데이터는 백엔드 API에서 제공한다.
- **Java 계열 사용 안 함**: Java, Spring, JSP 등을 쓰지 않는다. 언어는 TypeScript로 통일한다.
- **Vercel 호환**: Vercel에 배포할 수 없는 구성(상주 서버 프로세스, 로컬 파일 쓰기 등)을 쓰지 않는다.

## 기술 스택
| 구분 | 스택 |
|---|---|
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS |
| Backend | Node.js, Express, TypeScript (Vercel Serverless Function) |
| Database (향후) | PostgreSQL (Vercel Postgres 또는 Neon), Prisma |

## 디렉터리 구조
```
.
├── CLAUDE.md
├── PRD.md
├── docs/                      # 요구사항, Figma 파일, 프로필 사진 (원본 보관, 수정하지 않음)
├── frontend/                  # Next.js 앱 (Vercel 프로젝트 1)
│   ├── public/images/profile.png
│   └── src/
│       ├── app/               # layout.tsx, page.tsx (단일 페이지)
│       ├── app/globals.css    # Tailwind v4 디자인 토큰(@theme), 스크롤 애니메이션
│       ├── components/
│       │   ├── layout/        # Header(네비게이션, 현재 섹션 강조), Footer
│       │   ├── sections/      # Hero, About, Activities, Experience, Contact(+ContactForm)
│       │   └── ui/            # icons, Reveal(스크롤 등장), SectionTitle
│       ├── lib/
│       │   ├── api.ts         # 백엔드 API 호출 함수
│       │   └── contactValidation.ts  # 문의 폼 클라이언트 검증
│       └── types/             # Profile, Activity, Award 등 공용 타입
└── backend/                   # Express API (Vercel 프로젝트 2)
    ├── api/index.ts           # Vercel 진입점 (Express app export)
    ├── vercel.json            # @vercel/node 빌드 + 모든 요청을 api/index.ts 로 라우팅
    ├── tests/                 # Vitest + Supertest API 테스트
    └── src/
        ├── app.ts             # Express 앱 생성, CORS, 라우터 등록
        ├── routes/            # portfolio.ts(profile·activities·awards), contact.ts
        ├── repositories/      # 데이터 접근 계층 (정적 데이터 → 향후 DB)
        ├── data/              # 초기 정적 데이터 (*.ts)
        ├── types/
        └── server.ts          # 로컬 개발용 서버 (listen)
```

## 개발 명령어
각 폴더에서 실행한다.

```bash
# Frontend (http://localhost:3000)
cd frontend
npm install
npm run dev
npm run build
npm run lint

# Backend (http://localhost:4000)
cd backend
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
npm test
```

로컬에서는 백엔드를 먼저 켜고 프론트엔드를 켠다. 백엔드가 꺼져 있으면 페이지에 "콘텐츠를 불러오지 못했습니다" 안내가 표시된다.

## 환경변수
| 위치 | 변수 | 로컬 기본값 | 설명 |
|---|---|---|---|
| `frontend/.env.local` | `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:4000` | 백엔드 URL |
| `frontend/.env.local` | `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | 사이트 URL (Open Graph 절대경로) |
| `backend/.env` | `CORS_ORIGIN` | `http://localhost:3000` | 허용할 프론트엔드 URL (여러 개면 쉼표로 구분) |
| `backend/.env` | `PORT` | `4000` | 로컬 개발 포트 |
| `backend/.env` (향후) | `DATABASE_URL` | | PostgreSQL 연결 문자열 |

`.env*` 파일은 커밋하지 않는다(`.env.example` 제외). 필요한 키는 `.env.example`에 정리한다.

## API
| Method | Endpoint | 설명 |
|---|---|---|
| GET | `/api/health` | 상태 확인 |
| GET | `/api/profile` | 개인정보 + 자기소개 |
| GET | `/api/activities` | 학교 활동 목록 |
| GET | `/api/awards` | 수상·외부 경력 목록 |
| POST | `/api/contact` | 문의 전송 `{ name, email, message }` |

API를 추가하거나 바꾸면 PRD.md의 API 명세와 `backend/tests/`도 함께 수정한다.

- 문의(`POST /api/contact`)는 DB 연동 전까지 메모리 저장 + 서버 로그만 남긴다(`createInMemoryContactRepository`). Serverless 인스턴스가 재시작되면 사라진다.
- 프론트엔드는 `page.tsx`에서 요청마다 렌더링(`force-dynamic`)하고, API 응답은 fetch 캐시(`revalidate: 60`)로 재사용한다.

## 코딩 규칙
- TypeScript `strict` 모드를 사용하고 `any`를 쓰지 않는다.
- 콘텐츠(이름, 활동, 경력 등)를 컴포넌트에 하드코딩하지 않는다. 데이터는 `backend/src/data/`에만 두고 API로 가져온다.
- 백엔드 라우트는 `repositories/`를 통해서만 데이터에 접근한다. 나중에 DB로 바꿀 때는 리포지토리 구현만 교체한다.
- `frontend/src/types`와 `backend/src/types`의 응답 타입은 같은 형태를 유지한다. 한쪽을 바꾸면 다른 쪽도 바꾼다.
- 섹션 컴포넌트는 `components/sections/`에 하나씩 두고, 섹션 루트 요소에 앵커용 `id`를 붙인다.
- 스타일은 Tailwind 유틸리티 클래스를 사용한다. Tailwind v4 이므로 `tailwind.config` 대신 `frontend/src/app/globals.css`의 `@theme` 토큰(`canvas`, `surface`, `edge`, `line`, `muted`, `subtle`, `soft`, `fg`, `accent`)으로 색상과 폰트를 관리하고, 임의의 hex 값을 새로 쓰지 않는다.
- 섹션 좌우 여백과 최대폭은 `container-page` 유틸리티를 쓴다.
- 문의 폼 입력값은 클라이언트(`lib/contactValidation.ts`)와 서버(`routes/contact.ts`의 zod 스키마) 양쪽에서 같은 규칙으로 검증한다.
- 이미지에는 의미 있는 `alt`를 넣고 `next/image`를 사용한다.

## 디자인
- 화면 디자인 기준: 루트의 `임재정 포트폴리오.html` (Desktop 1440 / Mobile 390 / Style Guide 3개 화면). 브라우저에서 열어 확인한다.
- 원본: [Figma: Portfolio (Community)](https://www.figma.com/design/isMqGYYV6k9IWap1589ORk/Portfolio--Community-?node-id=0-1&p=f&t=47WdNGMriZQpG8xD-0), 로컬 파일 `docs/Portfolio (Community).fig`
- 스타일: 다크 테마(배경 #171717, 카드 #212121, 강조 #27AE60), DM Sans + Noto Sans KR, 모서리 각진 스타일(radius 0), 섹션 간격 96px(모바일 56px)
- 브레이크포인트: 모바일 < 640px(카드 가로형), 태블릿 640–1023px, 데스크톱 ≥ 1024px(Hero 2단, 가로 타임라인). 네비게이션은 768px 미만에서 햄버거 메뉴
- 섹션 순서: Hero → About → Activities → Awards & Experience → Contact → Footer
- 모바일 우선 반응형으로 만들고, 스크롤 애니메이션은 `prefers-reduced-motion`을 존중한다.

## 에셋
- 프로필 사진 원본은 `docs/프로필사진.png`이다. `frontend/public/images/profile.png`로 복사해서 쓴다(파일명은 영문). `docs/` 안의 원본은 수정하거나 옮기지 않는다.

## 배포 (Vercel)
1. 같은 Git 저장소로 Vercel 프로젝트를 2개 만든다.
2. Frontend 프로젝트는 Root Directory를 `frontend`로, Framework Preset을 Next.js로 설정하고 `NEXT_PUBLIC_API_BASE_URL`에 백엔드 배포 URL을 넣는다.
3. Backend 프로젝트는 Root Directory를 `backend`로 설정한다. `vercel.json`이 `api/index.ts`를 `@vercel/node`로 빌드하고 모든 요청을 그쪽으로 보낸다. `CORS_ORIGIN`에 프론트엔드 배포 URL을 넣는다.
4. 배포 후 `/api/health`와 메인 페이지의 모든 섹션이 정상 표시되는지 확인한다.
