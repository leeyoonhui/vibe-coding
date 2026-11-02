# PRD: 임재정 개인 포트폴리오 사이트

> 원본 요구사항: [`docs/Profile_요구사항.txt`](docs/Profile_요구사항.txt)

## 1. 개요

| 항목 | 내용 |
|---|---|
| 제품명 | 임재정 개인 Portfolio 사이트 |
| 목적 | 본인의 프로필, 학교 활동, 수상·경력을 한 페이지로 소개하고 연락 창구를 제공 |
| 주요 방문자 | 채용 담당자, 인턴·대외활동 심사자, 동아리·학회 관계자, 동료 학생 |
| 페이지 형식 | 원 페이지(One Page): 하위 페이지로 이동하지 않고 한 페이지를 스크롤하며 모든 콘텐츠를 확인 |

### 성공 기준
- 방문자가 스크롤만으로 1분 안에 이 사람이 누구인지, 무엇을 했는지 파악할 수 있다.
- 연락처(전화, 이메일)와 문의 폼으로 바로 연락할 수 있다.
- 프론트엔드와 백엔드가 각각 Vercel에 배포되어 정상 동작한다.
- 이후 DB를 연동할 때 프론트엔드 코드를 크게 바꾸지 않아도 된다.

## 2. 프로필 데이터

### 2.1 개인정보
| 항목 | 값 |
|---|---|
| 이름 | 임재정 |
| 학교 | 서울시립대학교 |
| 전공 | 경영학부 |
| 학번 | 199526000 |
| Tel | 010-0000-0000 |
| E-Mail | limjj157@naver.com |

### 2.2 자기소개 (원문)
> 안녕하세요!
> 서울시립대학교에서 경영학을 전공 중인 95학번 임재정 입니다.
> 데이터 분석과 MIS에 관심이 많아 시경연에서 2기 회장으로 활발히 활동하고 있습니다.
> 긍정적인 에너지와 논리적 사고로 팀의 성장을 돕는 인재입니다!!

### 2.3 학교 활동내역
1. 시립대경영정보연구회 2기 회장
2. 중앙 동아리 연극반 10기 연출 담당
3. 경영학부 학생회 부회장
4. 경영학부 사람사랑 소모임 창립멤버

### 2.4 주요 수상 및 외부 경력
| 내용 | 기간 |
|---|---|
| (주)원스텝 인턴 | 2025.01 ~ 2025.07 |
| 2025 KOICA 글로벌 서포터즈 참여 | 2025.08 |
| 2026 서울시립대학교 해커톤 경진대회 3위 입상 | 2026.07 |
| 대한민국 모두의 창업 2기 프로젝트 지원 | 2026.09 |

### 2.5 에셋
- 프로필 사진: `docs/프로필사진.png`
- Figma 원본: `docs/Portfolio (Community).fig`

## 3. 페이지 구성 (원 페이지)

상단에 고정 네비게이션 바를 두고, 메뉴를 누르면 해당 섹션으로 부드럽게 스크롤한다(앵커 링크).

| 순서 | 섹션 (id) | 내용 |
|---|---|---|
| 1 | Hero (`#home`) | 프로필 사진, 이름, 학교·전공, 한 줄 소개 ("긍정적인 에너지와 논리적 사고로 팀의 성장을 돕는 인재"), 연락하기 버튼 |
| 2 | About (`#about`) | 자기소개 원문, 개인정보 요약(학교, 전공, 학번), 관심 분야 키워드(데이터 분석, MIS) |
| 3 | Activities (`#activities`) | 학교 활동 4건을 카드 형태로 표시 |
| 4 | Awards & Experience (`#experience`) | 수상·외부 경력 4건을 날짜 순 타임라인으로 표시 |
| 5 | Contact (`#contact`) | Tel, E-Mail 표시(클릭 시 `tel:`, `mailto:` 동작), 문의 폼(이름, 이메일, 메시지) |
| 6 | Footer | 저작권 표기, 맨 위로 이동 버튼 |

## 4. 디자인

- 화면 디자인: 루트의 `임재정 포트폴리오.html` (Desktop · Mobile · Style Guide)
- 기준 디자인: [Figma: Portfolio (Community)](https://www.figma.com/design/isMqGYYV6k9IWap1589ORk/Portfolio--Community-?node-id=0-1&p=f&t=47WdNGMriZQpG8xD-0), 로컬 파일 `docs/Portfolio (Community).fig`
- 레이아웃, 색상, 타이포그래피, 여백은 Figma 디자인을 따른다.
- 여러 하위 페이지 없이 하나의 긴 페이지에서 스크롤하며 모든 콘텐츠를 확인하는 방식이다.
- 반응형: 모바일(< 768px), 태블릿(768–1023px), 데스크톱(≥ 1024px)
- 스크롤 시 섹션이 나타나는 애니메이션(fade/slide-in)을 적용한다. `prefers-reduced-motion` 설정을 존중한다.
- 현재 보고 있는 섹션에 해당하는 네비게이션 메뉴를 강조한다.

## 5. 요구사항

### 5.1 기능 요구사항 (FR)
| ID | 요구사항 |
|---|---|
| FR-01 | 모든 콘텐츠를 하나의 페이지에서 스크롤로 확인할 수 있다. |
| FR-02 | 고정 네비게이션의 메뉴를 클릭하면 해당 섹션으로 부드럽게 스크롤한다. |
| FR-03 | 프로필, 활동, 수상·경력 데이터는 백엔드 API에서 받아와 렌더링한다. |
| FR-04 | 전화번호와 이메일을 클릭하면 각각 전화 앱, 메일 앱이 열린다. |
| FR-05 | 문의 폼을 제출하면 백엔드 `POST /api/contact`로 전송하고 성공/실패 메시지를 보여준다. |
| FR-06 | 문의 폼은 클라이언트와 서버 양쪽에서 입력값을 검증한다(필수값, 이메일 형식, 길이 제한). |
| FR-07 | 모바일에서는 네비게이션이 햄버거 메뉴로 바뀐다. |
| FR-08 | API 호출에 실패해도 페이지가 깨지지 않고 대체 상태(로딩/오류 메시지)를 보여준다. |

### 5.2 비기능 요구사항 (NFR)
| ID | 요구사항 |
|---|---|
| NFR-01 | 성능: Lighthouse Performance 90점 이상, 이미지 최적화(`next/image`) |
| NFR-02 | 접근성: 시맨틱 태그 사용, 이미지 alt, 키보드 탐색 가능, 충분한 색 대비 |
| NFR-03 | SEO: title, description, Open Graph 메타 태그 설정 |
| NFR-04 | 반응형: 주요 브레이크포인트에서 레이아웃이 깨지지 않음 |
| NFR-05 | 확장성: 데이터 접근을 리포지토리 계층으로 분리해 정적 데이터를 DB로 교체할 수 있음 |
| NFR-06 | 보안: CORS로 허용된 프론트엔드 도메인만 API 호출 가능, 문의 폼 입력값 검증 |

## 6. 시스템 아키텍처

### 6.1 개발 방식 제약 (원문 요구사항)
- 향후 Database 연동을 위해 단순 HTML 형태로 개발하지 않는다.
- Vercel 배포를 위해 FrontEnd와 BackEnd로 분리해서 개발한다.
- FrontEnd와 BackEnd 모두 Vercel에 배포할 수 있는 기술 스택을 사용한다.
- 원 페이지 형식으로 개발한다.
- Java 관련 기술은 사용하지 않는다.

### 6.2 기술 스택
| 구분 | 스택 | 배포 |
|---|---|---|
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS | Vercel 프로젝트 1 (Root: `frontend/`) |
| Backend | Node.js, Express, TypeScript | Vercel 프로젝트 2 (Root: `backend/`, Serverless Function) |
| Database (향후) | Vercel Postgres 또는 Neon(PostgreSQL), Prisma ORM | Vercel 연동 |

### 6.3 구조
```
[Browser] ──> [Frontend: Next.js @ Vercel]
                    │  fetch(NEXT_PUBLIC_API_BASE_URL + /api/...)
                    ▼
              [Backend: Express @ Vercel Serverless]
                    │  Repository 계층
                    ▼
              [정적 데이터(src/data)] ──(향후 교체)──> [PostgreSQL]
```

### 6.4 API 명세
| Method | Endpoint | 설명 | 응답 |
|---|---|---|---|
| GET | `/api/health` | 상태 확인 | `{ status: "ok" }` |
| GET | `/api/profile` | 개인정보 + 자기소개 | `Profile` |
| GET | `/api/activities` | 학교 활동 목록 | `Activity[]` |
| GET | `/api/awards` | 수상·외부 경력 목록 | `Award[]` |
| POST | `/api/contact` | 문의 전송 `{ name, email, message }` | `201 { ok: true }` / `400 { error }` |

### 6.5 데이터 모델 (향후 DB 스키마 초안)
- **profile**: id, name, school, major, student_id, phone, email, intro, image_url
- **activities**: id, title, role, order
- **awards**: id, title, category(intern/activity/award/project), start_date, end_date, order
- **contact_messages**: id, name, email, message, created_at

## 7. 배포

- Vercel 프로젝트를 2개 만들고, 같은 저장소에서 Root Directory를 각각 `frontend/`, `backend/`로 지정한다.
- 환경변수

| 프로젝트 | 변수 | 설명 |
|---|---|---|
| Frontend | `NEXT_PUBLIC_API_BASE_URL` | 백엔드 배포 URL |
| Backend | `CORS_ORIGIN` | 허용할 프론트엔드 URL |
| Backend (향후) | `DATABASE_URL` | PostgreSQL 연결 문자열 |

## 8. 범위 밖 항목과 향후 계획
- 이번 범위 밖: 관리자 페이지, 로그인, 다국어, 블로그
- 향후 계획
  1. PostgreSQL + Prisma 연동, 문의 내용 DB 저장
  2. 관리자 페이지에서 활동·경력 데이터 편집
  3. 문의 접수 시 이메일 알림

## 9. 미확정 사항
- 전화번호 `010-0000-0000`이 자리표시자로 보인다. 실제 번호를 쓸지, 공개하지 않을지 확인이 필요하다.
- 학번 `199526000`과 자기소개의 "95학번" 표기가 맞는지 확인이 필요하다.
- 문의 폼 데이터: 현재는 백엔드 메모리 저장 + 서버 로그로 처리한다(Vercel 로그에서 확인 가능, 영구 저장 아님). DB 저장 또는 이메일 알림 중 무엇을 붙일지 정해야 한다.
