import ThemeSwitcher from "./components/ThemeSwitcher";
import AppTitle from "./components/AppTitle";

function App() {
  return (
    <main className="w-screen h-screen bg-slate-100 dark:bg-zinc-900 flex flex-col p-5 items-center">
      <ThemeSwitcher />
      <AppTitle />
    </main>
  );
}

export default App;
