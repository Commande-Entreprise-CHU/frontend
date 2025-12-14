import { useNavigate } from "react-router-dom";
import { MoveLeft, AlertCircle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200/50 p-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl border border-base-300">
        <div className="card-body items-center text-center py-12">
          
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary animate-bounce">
             <AlertCircle size={48} />
          </div>

          <h2 className="card-title text-4xl font-bold mb-2">404</h2>
          <h3 className="text-xl font-semibold mb-4">Page introuvable</h3>
          
          <p className="text-base-content/70 mb-8 max-w-sm">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>

          <div className="card-actions">
            <button 
              onClick={() => navigate("/")} 
              className="btn btn-primary gap-2"
            >
              <MoveLeft size={18} />
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
