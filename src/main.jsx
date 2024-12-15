import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LocationProvider } from "./contexts/LocationProvider.jsx";

// 서비스 워커 초기화
// if (!import.meta.env.DEV) {
const { worker } = await import("./mocks/browser.js");
await worker.start({
  onUnhandledRequest: "warn",
});
// }

// if (import.meta.env.VITE_ENABLE_MOCKS === "true") {
//   const { worker } = await import("./mocks/browser.js");
//   await worker.start({
//     onUnhandledRequest: "warn",
//   });
// }

// import("./mocks/browser").then(({ worker }) => {
//   worker.start({
//     onUnhandledRequest: "bypass", // 처리되지 않은 요청은 실제 네트워크 요청으로 전달
//   });
//   console.log("MSW가 실행되었습니다.");
// });

// React 애플리케이션 렌더링
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocationProvider>
      <App />
    </LocationProvider>
  </StrictMode>
);
