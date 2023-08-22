import { useState } from "react";
import ThemeSwitcher from "./components/ThemeSwitcher";
import AppTitle from "./components/AppTitle";
import { BsGithub } from "react-icons/bs";
import SelectMonth from "./components/SelectMonth";
import issueData from "./components/issueData";

function App() {
  return (
    <main className="w-screen h-screen bg-slate-100 dark:bg-zinc-900 flex flex-col p-5 items-center">
      <ThemeSwitcher />
      <AppTitle />

      <SelectMonth />

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
