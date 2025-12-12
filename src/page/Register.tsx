import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useChus } from "../hooks/useChus";
import { useRegister } from "../hooks/useAuthQueries";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nom: "",
    prenom: "",
    chuId: "",
  });
  const { data: chus } = useChus();
  const registerMutation = useRegister();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    registerMutation.mutate(formData, {
      onSuccess: (data) => {
        if (data.success) {
          setSuccess(data.message);
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setError(data.message || "Registration failed");
        }
      },
      onError: () => {
        setError("An error occurred. Please try again.");
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">Créer un compte</h2>
          {error && (
            <div className="alert alert-error text-sm py-2 mb-4">{error}</div>
          )}
          {success && (
            <div className="alert alert-success text-sm py-2 mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Nom</span>
              </label>
              <input
                type="text"
                name="nom"
                placeholder="Votre nom"
                className="input input-bordered w-full max-w-xs"
                value={formData.nom}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control w-full max-w-xs mt-2">
              <label className="label">
                <span className="label-text">Prénom</span>
              </label>
              <input
                type="text"
                name="prenom"
                placeholder="Votre prénom"
                className="input input-bordered w-full max-w-xs"
                value={formData.prenom}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control w-full max-w-xs mt-2">
              <label className="label">
                <span className="label-text">CHU</span>
              </label>
              <select
                name="chuId"
                className="select select-bordered w-full max-w-xs"
                value={formData.chuId}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez votre CHU</option>
                {chus?.map((chu) => (
                  <option key={chu.id} value={chu.id}>
                    {chu.name} ({chu.city})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full max-w-xs mt-2">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email@chu-nantes.fr"
                className="input input-bordered w-full max-w-xs"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control w-full max-w-xs mt-2">
              <label className="label">
                <span className="label-text">Mot de passe</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="********"
                className="input input-bordered w-full max-w-xs"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="card-actions justify-center mt-6">
              <button type="submit" className="btn btn-primary w-full">
                S'inscrire
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <Link to="/login" className="link link-hover text-sm">
              Déjà un compte ? Se connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
