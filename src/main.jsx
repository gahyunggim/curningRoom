import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LocationProvider } from "./contexts/LocationProvider.jsx";

// 서비스 워커 초기화
// if (import.meta.env.DEV) {
const { worker } = await import("./mocks/browser.js");
await worker.start({
  onUnhandledRequest: "warn",
});
// }

// React 애플리케이션 렌더링
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocationProvider>
      <App />
    </LocationProvider>
  </StrictMode>
);
