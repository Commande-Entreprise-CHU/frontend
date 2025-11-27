import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <h1 className="text-primary text-center">
        Outil de consultation pour la chirurgie maxillo-faciale
      </h1>
      <h2 className="text-secondary text-center">
        Outil en cours de développement...
      </h2>
      <h3 className="text-center mt-4 max-w-2xl">
        Consultations disponibles :
      </h3>
      <div className=" text-center mt-2">
        <Link to="/PremConsult">
          <li className="btn ">1 er consultation</li>
        </Link>
        <Link to="/Pré-op">
          <li className="btn "> consultation pré-op</li>
        </Link>
      </div>
    </div>
  );
};

export default Home;
