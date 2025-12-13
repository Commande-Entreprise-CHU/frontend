import { Link, useLocation } from "react-router-dom";
import ThemeController from "./ThemeController";
import { Home, UserPlus, Search, FileText, LogOut, Shield } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const location = useLocation();
  const { logout, user, isMasterAdmin, isAdmin } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path ? "btn-active" : "";
  };

  return (
    <div className="navbar sticky top-0 h-20 z-10 bg-base-100/80 backdrop-blur-md shadow-sm border-b border-base-200 px-4">
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
        <div className="mr-4 text-sm font-medium hidden lg:block">
          {user?.prenom} {user?.nom}
        </div>
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
        
        {/* Modèles - Master Admin only */}
        {isMasterAdmin && (
          <Link
            to="/templates"
            className={`btn btn-ghost btn-sm gap-2 ${isActive("/templates")}`}
          >
            <FileText size={18} />
            <span className="hidden md:inline">Modèles</span>
          </Link>
        )}

        {/* Administration - Master Admin and CHU Admin */}
        {isAdmin && (
          <Link
            to="/admin"
            className={`btn btn-ghost btn-sm gap-2 ${isActive("/admin")}`}
          >
            <Shield size={18} />
            <span className="hidden md:inline">Administration</span>
          </Link>
        )}

        <div className="h-6 w-px bg-base-300 mx-2"></div>

        <ThemeController />

        <button
          onClick={logout}
          className="btn btn-ghost btn-sm gap-2 text-error ml-2"
        >
          <LogOut size={18} />
          <span className="hidden md:inline">Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;

