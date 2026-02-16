import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import App from "./App.tsx";
import "./index.css";
import "./styles/accessibility.css";
import { getSetting } from "./lib/storage";

function ThemeSync() {
  const { setTheme } = useTheme();
  useEffect(() => {
    getSetting("theme").then((stored) => {
      if (stored === "light" || stored === "dark") setTheme(stored);
    });
  }, [setTheme]);
  return null;
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="flagsense-theme">
    <ThemeSync />
    <App />
  </ThemeProvider>
);