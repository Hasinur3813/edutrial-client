import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setTheme(theme);
    } else {
      setTheme("light");
    }
  }, []);

  return { theme };
};

export default useTheme;
