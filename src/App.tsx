import { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import Navbar from "./components/Navbar";
import RevealCheckBox from "./components/RevealCheckBox";
import { createPdf } from "./utils/pdfLogic/createPdf";

function App() {
  const [activeTab, setActiveTab] = useState("consultation"); // "consultation" ou "preop"

  return (
    <div className="bg-base-100 min-h-screen">
      <Navbar />

      <div className="w-full h-full p-4">
        {/* --- Onglets --- */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("consultation")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === "consultation"
                ? "bg-primary text-white"
                : "bg-gray-200 text-primary hover:bg-gray-300"
            }`}
          >
            1ère Consultation
          </button>

          <button
            onClick={() => setActiveTab("preop")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === "preop"
                ? "bg-primary text-white"
                : "bg-gray-200 text-primary hover:bg-gray-300"
            }`}
          >
            Pré-op
          </button>
        </div>

        {/* --- Section 1ère Consultation --- */}
        {activeTab === "consultation" && (
          <div>
            <h1 className="text-4xl font-bold text-primary w-full text-center mb-4">
              1ère Consultation
            </h1>

            <fieldset className="fieldset mt-4 border-base-300 rounded-box border p-4">
              <legend className="fieldset-legend text-xl text-primary">
                Informations Personnelles
              </legend>

              <Input label="Nom" placeholder="Nom" className="m-4" />
              <Input label="Prénom" placeholder="Prénom" className="m-4" />
              <Input label="Date de naissance" type="date" className="m-4" />
            </fieldset>

            <RevealCheckBox
              categoryLabel="Médecin Orthodontiste"
              label="Suivi par un médecin orthodontiste ?"
              className="flex-row items-center w-full"
            >
              <Input label="Nom du médecin" placeholder="Nom du médecin" />
            </RevealCheckBox>

            <Button className="m-4" onClick={createPdf}>
              Create PDF
            </Button>
          </div>
        )}

        {/* --- Section Pré-op --- */}
        {activeTab === "preop" && (
          <div>
            <h1 className="text-4xl font-bold text-primary w-full text-center mb-4">
              Pré-op
            </h1>

            <fieldset className="fieldset mt-4 border-base-300 rounded-box border p-4">
              <legend className="fieldset-legend text-xl text-primary">
                Informations Pré-opératoires
              </legend>

              <Input label="Date de l'opération" type="date" className="m-4" />
              <Input label="Chirurgien" placeholder="Nom du chirurgien" className="m-4" />
              <Input label="Type d'opération" placeholder="Type" className="m-4" />
            </fieldset>

            <RevealCheckBox
              categoryLabel="Anesthésie"
              label="Anesthésie prévue ?"
              className="flex-row items-center w-full"
            >
              <Input label="Type d'anesthésie" placeholder="Générale, locale..." />
            </RevealCheckBox>

            <Button className="m-4" onClick={createPdf}>
              Create PDF
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
