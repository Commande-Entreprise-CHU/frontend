import { useState } from "react";
import Input from "../components/Input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSearchPatients } from "../hooks/patientHooks";
import { formatDate } from "../utils/date";

function SearchPatient() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    sexe: "",
    ipp: "",
    motifConsultation: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: resultados = [],
    isLoading: loading,
    error,
  } = useSearchPatients(searchQuery);

  const handleInputChange = (data: { name: string; value: string | null }) => {
    setFormData((prev) => ({ ...prev, [data.name]: data.value }));
  };

  const handleBuscar = () => {
    const query =
      `${formData.name} ${formData.sexe} ${formData.ipp} ${formData.motifConsultation}`.trim();
    if (!query) {
      alert("Veuillez entrer quelque chose pour rechercher.");
      return;
    }
    setSearchQuery(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleBuscar();
  };

  return (
    <div className="flex flex-col items-center p-8 bg-base-100 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary">
          Recherche de Patient
        </h1>
        <p className="text-sm opacity-70 mt-1">
          Entrez le nom, le sexe, l'IPP ou le motif de consultation pour
          rechercher.
        </p>
      </div>

      <div
        onKeyDown={handleKeyDown}
        className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-4xl bg-base-200 p-5 rounded-lg shadow-sm"
      >
        <Input
          label="Nom"
          name="name"
          placeholder="Ex: Jean"
          value={formData.name}
          setFormData={handleInputChange}
        />

        <Input
          label="Sexe"
          name="sexe"
          placeholder="Ex: Femme"
          value={formData.sexe}
          setFormData={handleInputChange}
        />

        <Input
          label="IPP"
          name="ipp"
          placeholder="Ex: 1234567"
          value={formData.ipp}
          setFormData={handleInputChange}
        />

        <Input
          label="Motif de Consultation"
          name="motifConsultation"
          placeholder="Ex: Esthétique"
          value={formData.motifConsultation}
          setFormData={handleInputChange}
        />
      </div>

      <div className="mt-5">
        <button
          onClick={handleBuscar}
          className="btn btn-primary btn-md flex items-center gap-2"
          disabled={loading}
        >
          <Search size={18} />
          {loading ? "Recherche..." : "Rechercher"}
        </button>
      </div>

      <div className="mt-8 w-full max-w-6xl">
        {error ? (
          <div className="text-center text-error font-semibold">
            Erreur lors de la recherche.
          </div>
        ) : loading ? (
          <div className="text-center text-primary font-semibold">
            Chargement des résultats...
          </div>
        ) : resultados.length > 0 ? (
          <div className="space-y-3">
            {resultados.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-between items-start md:items-center bg-base-200 border border-base-300 rounded-lg px-6 py-3 shadow-sm hover:bg-primary hover:text-white cursor-pointer transition-all duration-200"
                onClick={() => {
                  navigate(`/patient/${item.id}`);
                }}
              >
                <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
                  <div className="text-primary font-semibold text-lg">
                    {item.name || "—"} {item.prenom || ""}
                  </div>

                  <div className="text-sm opacity-80 flex flex-wrap gap-x-6 gap-y-1">
                    <p>
                      <strong>IPP:</strong> {item.ipp || "—"}
                    </p>
                    <p>
                      <strong>Sexe:</strong> {item.sexe || "—"}
                    </p>
                    <p>
                      <strong>Date de naissance:</strong>{" "}
                      {formatDate(item.dob) || "—"}
                    </p>
                    <p>
                      <strong>Motif de consultation:</strong>{" "}
                      {item.preConsult?.motifConsultation || "—"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="opacity-70 text-center mt-6">Aucun résultat trouvé.</p>
        )}
      </div>
    </div>
  );
}

export default SearchPatient;
