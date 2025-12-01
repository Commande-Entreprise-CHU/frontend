import React from "react";
import { Link } from "react-router-dom";
import { UserPlus, Search, Edit3 } from "lucide-react"; // íconos elegantes

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-10 space-y-6">

      <h1 className="text-primary text-center text-3xl font-bold">
        Outil de consultation pour la chirurgie maxillo-faciale
      </h1>

      <h2 className="text-secondary text-center text-lg font-medium opacity-80">
        Outil en cours de développement...
      </h2>

      <h3 className="text-center mt-4 font-semibold text-lg">
        Actions disponibles :
      </h3>

      {/* BOTONES ELEGANTES */}
      <div className="flex flex-col gap-4 mt-4 w-full max-w-md">

        <Link
          to="/patient/new/prem-consult"
           className="btn btn-primary btn-lg shadow-md rounded-xl w-full text-lg font-semibold"
        >
          <UserPlus size={22} />
          <span className="text-lg">Nouveau patient</span>
        </Link>

        <Link
          to="/Find"
           className="btn btn-primary btn-lg shadow-md rounded-xl w-full text-lg font-semibold"
        >
          <Search size={22} />
          <span className="text-lg">Continuer consultation</span>
        </Link>

        <Link
          to="/Find?edit=true"
          className="btn btn-primary btn-lg shadow-md rounded-xl w-full text-lg font-semibold"
        >
          <Edit3 size={22} />
          <span className="text-lg">Modifier un patient</span>
        </Link>

      </div>
    </div>
  );
};

export default Home;
