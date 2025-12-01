import { Link } from "react-router-dom";
import ThemeController from "./ThemeController";

const Navbar: React.FC = () => {
  return (
    <div className="navbar min-h-0 shadow-sm ">
      <div className="flex-1">
        <img src="/CHU.png" className="m-0 h-12" alt="CHU Logo" />
      </div>
      <Link to="/" className="btn btn-ghost">
        <span className="text-small">Accueil</span>
      </Link>
      <Link to="/patient/new/prem-consult" className="btn btn-ghost">
        <span className="text-small">Nouveau patient</span>
      </Link>
      <Link to="/Find" className="btn btn-ghost">
        <span className="text-small">Continuer consultation</span>
      </Link>
      <Link to="/Find?edit=true" className="btn btn-ghost">
        <span className="text-small">Modifier un patient</span>
      </Link>
      <div className="flex-none">
        <ThemeController />
      </div>
    </div>
  );
};

export default Navbar;
