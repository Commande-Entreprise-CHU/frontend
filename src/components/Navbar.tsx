import { Link } from "react-router-dom";
import ThemeController from "./ThemeController";

const Navbar: React.FC = () => {
  return (
    <div className="navbar min-h-0 shadow-sm ">
      <div className="flex-1">
        <img src="/CHU.png" className="m-0 h-12" alt="CHU Logo" />
      </div>
      <Link to="/" className="btn btn-ghost">
        Accueil
      </Link>
      <Link to="/PremConsult" className="btn btn-ghost">
        1ère Consultation
      </Link>
      <Link to="/Pré-op" className="btn btn-ghost">
        Consultation pré-op
      </Link>
      <div className="flex-none">
        <ThemeController />
      </div>
    </div>
  );
};

export default Navbar;
