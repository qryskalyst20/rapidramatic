import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  return (
    <div className="w-screen h-screen bg-slate-400 dark:bg-zinc-900 flex items-center justify-center">
      <ThemeSwitcher />
      <p className="text-blue-700 dark:text-white">Vite test</p>
    </div>
  );
}

export default App;
