import { Link } from "react-router-dom";
import ThemeController from "./ThemeController";

const Navbar: React.FC = () => {
  return (
    <div className="navbar shadow-sm">
      <div className="flex-1">
        <img src="/CHU.png" className="h-16 w-auto" alt="CHU Logo" />
      </div>
      <Link to="/" className="btn btn-ghost">
        Accueil
      </Link>
      <Link to="/PremConsult" className="btn btn-ghost">
        1ère Consultation
      </Link>
      <div className="flex-none">
        <ThemeController />
      </div>
    </div>
  );
};

export default Navbar;
