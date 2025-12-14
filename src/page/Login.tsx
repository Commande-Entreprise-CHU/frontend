import { useState, type ChangeEvent, type FormEvent, type FC } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useAuth } from "../context/AuthContext";
import { useLogin } from "../hooks/useAuthQueries";

import type { ApiErrorResponse } from "../types/api";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          if (data.success) {
            login(data.user);
            navigate("/");
          } else {
            setError(data.message || "La connexion a échoué");
          }
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError<ApiErrorResponse>;
          const backendMessage = axiosError.response?.data?.message;
          setError(backendMessage ?? "Une erreur est survenue. Veuillez réessayer.");
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">Connexion CHU</h2>
          
          {error && <div className="alert alert-error text-sm py-2 mb-4">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email@chu-nantes.fr"
                className="input input-bordered w-full max-w-xs"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-control w-full max-w-xs mt-4">
              <label className="label">
                <span className="label-text">Mot de passe</span>
              </label>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered w-full max-w-xs"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="card-actions justify-center mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "Se connecter"
                )}
              </button>
            </div>
          </form>
          
          <div className="text-center mt-4">
            <Link to="/register" className="link link-hover text-sm">
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
