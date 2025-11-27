<<<<<<< HEAD
import { NavLink } from "react-router-dom";
import ThemeController from "./ThemeController";

const Navbar: React.FC = () => {
  return (
    <div className="navbar min-h-0 shadow-sm">
      <div className="flex-1">
        <img src="/CHU.png" className="m-0 h-12" alt="CHU Logo" />
      </div>

      <div className="flex space-x-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `btn btn-ghost relative ${
              isActive ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary" : ""
            }`
          }
        >
          Accueil
        </NavLink>

        <NavLink
          to="/PremConsult"
          className={({ isActive }) =>
            `btn btn-ghost relative ${
              isActive ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary" : ""
            }`
          }
        >
          1ère Consultation
        </NavLink>

        <NavLink
          to="/Pré-op"
          className={({ isActive }) =>
            `btn btn-ghost relative ${
              isActive ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary" : ""
            }`
          }
        >
          Consultation pré-op
        </NavLink>
      </div>

      <div className="flex-none">
        <ThemeController />
      </div>
    </div>
  );
};

export default Navbar;
=======
import { NavLink } from "react-router-dom";
import ThemeController from "./ThemeController";

const Navbar: React.FC = () => {
  return (
    <div className="navbar min-h-0 shadow-sm">
      <div className="flex-1">
        <img src="/CHU.png" className="m-0 h-12" alt="CHU Logo" />
      </div>

      <div className="flex space-x-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `btn btn-ghost relative ${
              isActive ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary" : ""
            }`
          }
        >
          Accueil
        </NavLink>

        <NavLink
          to="/PremConsult"
          className={({ isActive }) =>
            `btn btn-ghost relative ${
              isActive ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary" : ""
            }`
          }
        >
          1ère Consultation
        </NavLink>

        <NavLink
          to="/Pré-op"
          className={({ isActive }) =>
            `btn btn-ghost relative ${
              isActive ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary" : ""
            }`
          }
        >
          Consultation pré-op
        </NavLink>

        <NavLink
          to="/Post-op3mois"
          className={({ isActive }) =>
            `btn btn-ghost relative ${
              isActive ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary" : ""
            }`
          }
        >
          Consultation post opératoire 3 mois
        </NavLink>

        <NavLink
          to="/Post-op6mois"
          className={({ isActive }) =>
            `btn btn-ghost relative ${
              isActive ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary" : ""
            }`
          }
        >
          Consultation post opératoire 6 mois
        </NavLink>
      </div>

      <div className="flex-none">
        <ThemeController />
      </div>
    </div>
  );
};

export default Navbar;
>>>>>>> cb63b7e4e3587e6e50384fa784672f07c571f104
