// Vercel Serverless Function 진입점. 모든 요청을 Express 앱으로 넘긴다 (vercel.json 참고).
import { createApp } from "../src/app";

export default createApp();
