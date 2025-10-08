import ThemeController from "./ThemeController";

const Navbar: React.FC = () => {
  return (
    <div className="navbar shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">CHU </a>
      </div>
      <div className="flex-none">
        <ThemeController />
      </div>
    </div>
  );
};

export default Navbar;
