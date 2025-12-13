import { useState } from "react";
import Input from "../components/Input";
import Radio from "../components/Radio";
import Card from "../components/Card";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import PatientCard from "../components/PatientCard";
import { Search, User, Hash } from "lucide-react";
import { useSearchPatients } from "../hooks/patientHooks";

function SearchPatient() {
  const [formData, setFormData] = useState({
    name: "",
    sexe: "",
    ipp: "",
    motifConsultation: "",
  });
  const [searchParams, setSearchParams] = useState<{
    name?: string;
    sexe?: string;
    ipp?: string;
  }>({});

  const { data: resultados = [], isLoading: loading } =
    useSearchPatients(searchParams);

  const handleInputChange = (data: {
    name: string;
    value: string | number | boolean | null;
  }) => {
    setFormData((prev) => ({ ...prev, [data.name]: data.value }));
  };

  const handleBuscar = () => {
    setSearchParams({
      name: formData.name,
      sexe: formData.sexe,
      ipp: formData.ipp,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleBuscar();
  };

  const hasSearch = Object.values(searchParams).some((v) => !!v);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-base-200/30 p-6 md:p-12">
      <div className="w-full mx-auto space-y-8">
        {/* Header */}
        <PageHeader
          icon={Search}
          title="Recherche de Patient"
          subtitle="Retrouvez un dossier patient en utilisant les filtres ci-dessous"
        />

        {/* Search Form */}
        <Card
          className="shadow-lg"
          bodyClassName="p-6 md:p-8"
          actions={
            <Button
              variant="primary"
              onClick={handleBuscar}
              loading={loading}
              startIcon={Search}
              className="w-full md:w-auto"
            >
              Rechercher
            </Button>
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
                { label: "Homme", value: "homme" },
                { label: "Femme", value: "femme" },
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
        {hasSearch && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-semibold px-2">
              Résultats ({resultados.length})
            </h2>

            <div className="grid grid-cols-1 gap-4">
            {resultados.map((patient: any) => (
                <PatientCard
                  key={patient.id}
                  id={patient.id}
                  name={patient.name}
                  prenom={patient.prenom}
                  ipp={patient.ipp}
                  sexe={patient.sexe}
                  dob={patient.dob}
                />
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
