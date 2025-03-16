import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const StoredTheme = localStorage.getItem("theme");
    if (StoredTheme) {
      setTheme(StoredTheme);
      document.documentElement.classList = StoredTheme;
    } else {
      setTheme("light");
      document.documentElement.classList = theme;
      localStorage.setItem("theme", theme);
    }
  }, [theme, setTheme]);

  return { theme, setTheme };
};

export default useTheme;
