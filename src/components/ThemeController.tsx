import { type FC, type ChangeEvent } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeController: FC = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const storedTheme = localStorage.getItem("theme");
  const isDarkMode = storedTheme ? storedTheme === "chu-dark" : prefersDark;

  const handleThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const theme = e.target.checked ? "chu-dark" : "chu-light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm">
      {/* this hidden checkbox controls the state */}
      <input
        type="checkbox"
        className="theme-controller"
        value="chu-dark"
        defaultChecked={isDarkMode}
        onChange={handleThemeChange}
      />

      {/* sun icon */}
      <Sun className="swap-off h-5 w-5 fill-current" />

      {/* moon icon */}
      <Moon className="swap-on h-5 w-5 fill-current" />
    </label>
  );
};
export default ThemeController;
