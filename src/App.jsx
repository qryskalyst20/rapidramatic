import { useState, useEffect } from "react";
import ThemeSwitcher from "./components/ThemeSwitcher";
import AppTitle from "./components/AppTitle";
import { BsGithub } from "react-icons/bs";
import SelectMonth from "./components/SelectMonth";

function App() {
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

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <main className="w-screen h-screen bg-slate-100 dark:bg-zinc-900 flex flex-col p-5 items-center">
      <ThemeSwitcher handleThemeSwitch={handleTheme} theme={theme} />
      <AppTitle />

      <SelectMonth theme={theme} />

      <BsGithub
        size={30}
        className="absolute bottom-5 hover:cursor-pointer hover:scale-105 dark:text-white"
        onClick={() =>
          window.open("https://github.com/qryskalyst20/rapidramatic", "_blank")
        }
      />
    </main>
  );
}

export default App;
