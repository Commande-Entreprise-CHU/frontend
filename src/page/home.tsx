import React from "react";
import { Link } from "react-router-dom";
import { UserPlus, Search, Edit3, Activity, ArrowRight } from "lucide-react";

const Home: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-base-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-12">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center p-4 bg-primary/5 rounded-full">
            <Activity className="text-primary w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Consultation <span className="text-primary">Maxillo-Faciale</span>
          </h1>
          <p className="text-lg text-base-content/60 max-w-xl mx-auto">
            Gestion des dossiers patients et suivi des consultations.
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/patient/new" className="group block">
            <div className="flex items-center gap-6 p-6 rounded-xl border border-base-200 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 bg-base-100 shadow-sm hover:shadow-md">
              <div className="p-4 bg-base-200 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                <UserPlus size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Nouveau Patient</h3>
                <p className="text-base-content/60 mt-1">
                  Créer un dossier pour une première consultation
                </p>
              </div>
              <ArrowRight className="text-base-content/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          <Link to="/search" className="group block">
            <div className="flex items-center gap-6 p-6 rounded-xl border border-base-200 hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-200 bg-base-100 shadow-sm hover:shadow-md">
              <div className="p-4 bg-base-200 rounded-xl group-hover:bg-secondary group-hover:text-white transition-colors">
                <Search size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Consultation</h3>
                <p className="text-base-content/60 mt-1">
                  Rechercher un patient existant
                </p>
              </div>
              <ArrowRight className="text-base-content/30 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          <Link to="/search?edit=true" className="group block">
            <div className="flex items-center gap-6 p-6 rounded-xl border border-base-200 hover:border-accent/50 hover:bg-accent/5 transition-all duration-200 bg-base-100 shadow-sm hover:shadow-md">
              <div className="p-4 bg-base-200 rounded-xl group-hover:bg-accent group-hover:text-white transition-colors">
                <Edit3 size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Modifier Dossier</h3>
                <p className="text-base-content/60 mt-1">
                  Mise à jour administrative
                </p>
              </div>
              <ArrowRight className="text-base-content/30 group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>

        <div className="text-center text-xs text-base-content/30 font-mono">
          CHU Nantes • v0.1.0
        </div>
      </div>
    </div>
  );
};

export default Home;
