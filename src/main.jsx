import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import WeatherApp from "./components/WeatherApp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <WeatherApp /> */}
    <App />
  </StrictMode>,
);
