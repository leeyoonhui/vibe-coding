// 로컬 개발용 진입점. Vercel 에서는 api/index.ts 를 사용한다.
try {
  process.loadEnvFile();
} catch {
  // .env 가 없으면 기본값을 사용한다.
}

import { createApp } from "./app";

const port = Number(process.env.PORT ?? 4000);

createApp().listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
