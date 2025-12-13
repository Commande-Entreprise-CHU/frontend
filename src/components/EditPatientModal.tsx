import { useState, useEffect } from "react";
import { useUpdatePatientCore, type Patient } from "../hooks/patientHooks";
import { useToast } from "../context/ToastContext";
import Button from "./Button";
import { X, Save } from "lucide-react";

interface EditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient;
}

export default function EditPatientModal({
  isOpen,
  onClose,
  patient,
}: EditPatientModalProps) {
  const { mutate: updatePatient, isPending } = useUpdatePatientCore();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    prenom: "",
    ipp: "",
    dob: "",
    sexe: "M",
  });

  useEffect(() => {
    if (isOpen && patient) {
      setFormData({
        name: patient.name,
        prenom: patient.prenom,
        ipp: patient.ipp || "",
        dob: patient.dob,
        sexe: patient.sexe,
      });
    }
  }, [isOpen, patient]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.prenom || !formData.dob) {
      showToast("Veuillez remplir tous les champs obligatoires", "error");
      return;
    }

    updatePatient(
      { id: patient.id, data: formData },
      {
        onSuccess: () => {
          showToast("Informations du patient mises à jour avec succès", "success");
          onClose();
        },
        onError: (err) => {
          console.error(err);
          showToast("Erreur lors de la mise à jour", "error");
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-base-100 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-base-200 bg-base-200/50">
          <h2 className="text-xl font-bold">Modifier le patient</h2>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-square rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nom</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Prénom</span>
              </label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="form-control">
              <label className="label">
                <span className="label-text">IPP</span>
              </label>
              <input
                type="text"
                name="ipp"
                value={formData.ipp}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Optionnel"
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Sexe</span>
              </label>
              <select
                name="sexe"
                value={formData.sexe}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Date de naissance</span>
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={onClose}>
              Annuler
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isPending}
              loading={isPending}
            >
              <Save size={18} className="mr-2" />
              Enregistrer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
