import { Link, useLocation } from "react-router-dom";
import ThemeController from "./ThemeController";
import { Home, UserPlus, Search, FileText } from "lucide-react";

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "btn-active" : "";
  };

  return (
    <div className="navbar sticky top-0 h-20 z-50 bg-base-100/80 backdrop-blur-md shadow-sm border-b border-base-200 px-4">
      <div className="flex-1">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img
            src="/CHU.png"
            className="h-10 w-auto object-contain"
            alt="CHU Logo"
          />
          <span className="font-bold text-xl text-primary hidden sm:block">
            CHU Nantes
          </span>
        </Link>
      </div>
      <div className="flex-none flex items-center gap-1">
        <Link to="/" className={`btn btn-ghost btn-sm gap-2 ${isActive("/")}`}>
          <Home size={18} />
          <span className="hidden md:inline">Accueil</span>
        </Link>
        <Link
          to="/patient/new"
          className={`btn btn-ghost btn-sm gap-2 ${isActive("/patient/new")}`}
        >
          <UserPlus size={18} />
          <span className="hidden md:inline">Nouveau patient</span>
        </Link>
        <Link
          to="/search"
          className={`btn btn-ghost btn-sm gap-2 ${isActive("/search")}`}
        >
          <Search size={18} />
          <span className="hidden md:inline">Consultation</span>
        </Link>
        <Link
          to="/templates"
          className={`btn btn-ghost btn-sm gap-2 ${isActive("/templates")}`}
        >
          <FileText size={18} />
          <span className="hidden md:inline">Modèles</span>
        </Link>

        <div className="h-6 w-px bg-base-300 mx-2"></div>

        <ThemeController />
      </div>
    </div>
  );
};

export default Navbar;
