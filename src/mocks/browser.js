// src/mocks/browser.js
import { setupWorker } from "msw/browser";
import { handlers } from "./handler"; // 방금 작성한 핸들러 파일을 가져옵니다.

// 서비스 워커 생성
export const worker = setupWorker(...handlers);
