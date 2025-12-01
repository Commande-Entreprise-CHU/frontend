import { useState } from "react";
import Input from "../components/Input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Find() {
  const navigate = useNavigate();  // Usado para redirigir a la página del paciente seleccionado
  const [formData, setFormData] = useState({
    name: "",
    sexe: "",
    ipp: "",
    motifConsultation: ""
  });  // Datos del formulario para la búsqueda

  const [resultados, setResultados] = useState<any[]>([]);  // Almacena los resultados de búsqueda
  const [loading, setLoading] = useState(false);  // Estado de carga

  // Función para manejar los cambios de los campos de entrada
  const handleInputChange = (data: { name: string; value: string }) => {
    setFormData((prev) => ({ ...prev, [data.name]: data.value }));
  };

  // Función para manejar la búsqueda cuando el usuario hace clic en el botón de buscar
  const handleBuscar = async () => {
  const query = `${formData.name} ${formData.sexe} ${formData.ipp} ${formData.motifConsultation}`.trim();
  if (!query) {
    alert("Veuillez entrer quelque chose pour rechercher.");
    return;
  }

  setLoading(true);
  try {
    const res = await fetch(
      `http://localhost:5000/api/search?q=${encodeURIComponent(query)}`
    );
    const json = await res.json();
    setResultados(json);  // Mostrar los resultados de búsqueda
  } catch (error) {
    alert("Erreur lors de la recherche des données.");
    console.error(error);
  } finally {
    setLoading(false);  // Desactivar el estado de carga
  }
};


  // Función para manejar la búsqueda cuando el usuario presiona Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleBuscar();  // Llama a handleBuscar cuando se presiona Enter
  };

  return (
    <div className="flex flex-col items-center p-8 bg-base-100 min-h-screen">
      {/* Encabezado */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Recherche de Patient</h1>
        <p className="text-sm opacity-70 mt-1">
          Entrez le nom, le sexe, l'IPP ou le motif de consultation pour rechercher.
        </p>
      </div>

      {/* Campos de búsqueda */}
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

      {/* Botón de búsqueda */}
      <div className="mt-5">
        <button
          onClick={handleBuscar}
          className="btn btn-primary btn-md flex items-center gap-2"
          disabled={loading}  // Deshabilita el botón mientras está cargando
        >
          <Search size={18} />
          {loading ? "Recherche..." : "Rechercher"}
        </button>
      </div>

      {/* Resultados */}
      <div className="mt-8 w-full max-w-6xl">
        {loading ? (
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
                      {item.dob || "—"}
                    </p>
                    <p>
                      <strong>Motif de consultation:</strong>{" "}
                      {item.motifConsultation || "—"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="opacity-70 text-center mt-6">
            Aucun résultat trouvé.
          </p>
        )}
      </div>
    </div>
  );
}

export default Find;
