import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

const ThemeSwitcher = ({ handleThemeSwitch, theme }) => {
  return (
    <button
      onClick={handleThemeSwitch}
      className="focus:outline-none w-10 h-10 grid place-items-center p-2 bg-yellow-300 dark:bg-zinc-700 rounded-xl absolute right-5 top-2 hover:scale-110 active:translate-y-1"
    >
      {theme === "dark" ? <FaMoon /> : <BsSunFill />}
    </button>
  );
};

export default ThemeSwitcher;
