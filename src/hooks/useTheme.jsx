import { useEffect, useState } from "react";

function useTheme() {
  const isSystemDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const usePreferredTheme = isSystemDark ? "dark" : "light";
  const [theme, setTheme] = useState(usePreferredTheme);
  console.log(usePreferredTheme);
  console.log(theme);
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  return { theme, setTheme, usePreferredTheme };
}

export default useTheme;
