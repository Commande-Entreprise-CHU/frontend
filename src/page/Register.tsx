import { useState, type ChangeEvent, type FormEvent, type FC } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useChus } from "../hooks/useChus";
import { useRegister } from "../hooks/useAuthQueries";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  nom: string;
  prenom: string;
  chuId: string;
}

interface ValidationErrors {
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
  nom?: string[];
  prenom?: string[];
  chuId?: string[];
}

import type { ApiErrorResponse } from "../types/api";

const PASSWORD_RULES = [
  { regex: /.{12,}/, message: "Au moins 12 caractères" },
  { regex: /[A-Z]/, message: "Au moins une majuscule" },
  { regex: /[a-z]/, message: "Au moins une minuscule" },
  { regex: /[0-9]/, message: "Au moins un chiffre" },
  { regex: /[^A-Za-z0-9]/, message: "Au moins un caractère spécial" },
] as const;

const validateEmail = (email: string): string[] => {
  if (!email) return ["L'adresse email est requise"];
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return ["Adresse email invalide"];
  return [];
};

const validatePassword = (password: string): string[] => {
  return PASSWORD_RULES
    .filter(({ regex }) => !regex.test(password))
    .map(({ message }) => `Le mot de passe doit contenir ${message.toLowerCase()}`);
};

const validateForm = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  const emailErrors = validateEmail(formData.email);
  if (emailErrors.length) errors.email = emailErrors;

  const passwordErrors = validatePassword(formData.password);
  if (passwordErrors.length) errors.password = passwordErrors;

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = ["Les mots de passe ne correspondent pas"];
  }

  if (!formData.nom?.trim()) errors.nom = ["Le nom est requis"];
  if (!formData.prenom?.trim()) errors.prenom = ["Le prénom est requis"];
  if (!formData.chuId) errors.chuId = ["Le CHU est requis"];

  return errors;
};

const FieldError: FC<{ errors?: string[] }> = ({ errors }) => {
  if (!errors?.length) return null;
  return (
    <label className="label">
      <span className="label-text-alt text-error">{errors[0]}</span>
    </label>
  );
};

const PasswordStrengthIndicator: FC<{ password: string }> = ({ password }) => {
  if (!password) return null;
  
  return (
    <div className="mt-2 text-xs">
      <p className="font-medium mb-1">Exigences du mot de passe :</p>
      <ul className="space-y-1">
        {PASSWORD_RULES.map(({ regex, message }) => {
          const isValid = regex.test(password);
          return (
            <li key={message} className={isValid ? "text-success" : "text-error"}>
              {isValid ? "✓" : "✗"} {message}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Register: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    nom: "",
    prenom: "",
    chuId: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});

  const { data: chus } = useChus();
  const registerMutation = useRegister();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name as keyof ValidationErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationErrors = validateForm(formData);
    setFieldErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.values(validationErrors).flat()[0];
      setError(firstError ?? "Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    registerMutation.mutate(formData, {
      onSuccess: (data) => {
        if (data.success) {
          setSuccess(data.message);
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setError(data.message || "L'inscription a échoué");
        }
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        const backendMessage = axiosError.response?.data?.message;
        setError(backendMessage ?? "Une erreur est survenue. Veuillez réessayer.");
      },
    });
  };

  const inputClassName = (hasError: boolean) =>
    `input input-bordered w-full max-w-xs ${hasError ? "input-error" : ""}`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">Créer un compte</h2>

          {error && <div className="alert alert-error text-sm py-2 mb-4">{error}</div>}
          {success && <div className="alert alert-success text-sm py-2 mb-4">{success}</div>}

          <form onSubmit={handleSubmit}>
            {/* Nom */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Nom</span>
              </label>
              <input
                type="text"
                name="nom"
                placeholder="Votre nom"
                className={inputClassName(!!fieldErrors.nom)}
                value={formData.nom}
                onChange={handleChange}
                required
              />
              <FieldError errors={fieldErrors.nom} />
            </div>

            {/* Prénom */}
            <div className="form-control w-full max-w-xs mt-2">
              <label className="label">
                <span className="label-text">Prénom</span>
              </label>
              <input
                type="text"
                name="prenom"
                placeholder="Votre prénom"
                className={inputClassName(!!fieldErrors.prenom)}
                value={formData.prenom}
                onChange={handleChange}
                required
              />
              <FieldError errors={fieldErrors.prenom} />
            </div>

            {/* CHU */}
            <div className="form-control w-full max-w-xs mt-2">
              <label className="label">
                <span className="label-text">CHU</span>
              </label>
              <select
                name="chuId"
                className={`select select-bordered w-full max-w-xs ${
                  fieldErrors.chuId ? "select-error" : ""
                }`}
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
              <FieldError errors={fieldErrors.chuId} />
            </div>

            {/* Email */}
            <div className="form-control w-full max-w-xs mt-2">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email@chu-nantes.fr"
                className={inputClassName(!!fieldErrors.email)}
                value={formData.email}
                onChange={handleChange}
                required
              />
              <FieldError errors={fieldErrors.email} />
            </div>

            {/* Mot de passe */}
            <div className="form-control w-full max-w-xs mt-2">
              <label className="label">
                <span className="label-text">Mot de passe</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="********"
                className={inputClassName(!!fieldErrors.password)}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <PasswordStrengthIndicator password={formData.password} />
              {!formData.password && <FieldError errors={fieldErrors.password} />}
            </div>

            {/* Confirmer le mot de passe */}
            <div className="form-control w-full max-w-xs mt-2">
              <label className="label">
                <span className="label-text">Confirmer le mot de passe</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="********"
                className={inputClassName(!!fieldErrors.confirmPassword)}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <FieldError errors={fieldErrors.confirmPassword} />
            </div>

            {/* Submit */}
            <div className="card-actions justify-center mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "S'inscrire"
                )}
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
