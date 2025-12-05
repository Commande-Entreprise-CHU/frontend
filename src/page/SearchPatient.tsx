import { useState } from "react";
import Input from "../components/Input";
import Radio from "../components/Radio";
import Card from "../components/Card";
import { Search, User, FileText, Hash } from "lucide-react";
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

  const { data: resultados = [], isLoading: loading } =
    useSearchPatients(searchQuery);

  const handleInputChange = (data: {
    name: string;
    value: string | number | boolean | null;
  }) => {
    setFormData((prev) => ({ ...prev, [data.name]: data.value }));
  };

  const handleBuscar = () => {
    const query =
      `${formData.name} ${formData.sexe} ${formData.ipp} ${formData.motifConsultation}`.trim();
    if (!query) {
      // Optional: Show a toast or less intrusive alert
      return;
    }
    setSearchQuery(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleBuscar();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-base-200/30 p-6 md:p-12">
      <div className="w-full mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-base-content">
            Recherche de Patient
          </h1>
          <p className="text-base-content/60">
            Retrouvez un dossier patient en utilisant les filtres ci-dessous
          </p>
        </div>

        {/* Search Form */}
        <Card
          className="shadow-lg"
          bodyClassName="p-6 md:p-8"
          actions={
            <button
              className="btn btn-primary w-full md:w-auto gap-2"
              onClick={handleBuscar}
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <Search size={20} />
              )}
              Rechercher
            </button>
          }
        >
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            onKeyDown={handleKeyDown}
          >
            <Input
              label="Nom"
              name="name"
              placeholder="Ex: Jean"
              value={formData.name}
              setFormData={handleInputChange}
              icon={<User size={18} />}
            />

            <Radio
              label="Sexe"
              name="sexe"
              value={formData.sexe}
              setFormData={handleInputChange}
              options={[
                { label: "Tous", value: "" },
                { label: "Homme", value: "Homme" },
                { label: "Femme", value: "Femme" },
              ]}
            />

            <Input
              label="IPP"
              name="ipp"
              placeholder="Ex: 1234567"
              value={formData.ipp}
              setFormData={handleInputChange}
              icon={<Hash size={18} />}
            />
          </div>
        </Card>

        {/* Results Section */}
        {searchQuery && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-semibold px-2">
              Résultats ({resultados.length})
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {resultados.map((patient: any) => (
                <Card
                  key={patient.id}
                  onClick={() => navigate(`/patient/${patient.id}`)}
                  className="shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
                  bodyClassName="p-6 flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg group-hover:bg-primary group-hover:text-primary-content transition-colors">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                        {patient.name} {patient.prenom}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-base-content/60 mt-1">
                        <span className="flex items-center gap-1">
                          <Hash size={14} /> {patient.ipp || "N/A"}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={14} /> {patient.sexe}
                        </span>
                        <span>Né(e) le {formatDate(patient.dob)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center text-base-content/40 group-hover:translate-x-1 transition-transform">
                    <FileText size={24} />
                  </div>
                </Card>
              ))}

              {resultados.length === 0 && !loading && (
                <div className="text-center py-12 text-base-content/50 bg-base-100 rounded-xl border border-dashed border-base-300">
                  <Search size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Aucun patient trouvé pour cette recherche.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPatient;
