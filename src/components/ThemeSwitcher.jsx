import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState();

  useEffect(() => {
    if (window.matchMedia("prefer-color-scheme: dark").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <button
      onClick={handleThemeSwitch}
      className="w-10 h-10 grid place-items-center p-2 bg-yellow-300 dark:bg-zinc-700 rounded-xl absolute right-5 top-2 hover:scale-110"
    >
      {theme === "dark" ? <FaMoon /> : <BsSunFill />}
    </button>
  );
};

export default ThemeSwitcher;
