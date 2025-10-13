import Button from "./components/Button";
import Input from "./components/Input";
import Navbar from "./components/Navbar";
import RevealCheckBox from "./components/RevealCheckBox";
import { createPdf } from "./utils/pdfLogic/createPdf";
function App() {
  return (
    <div className="bg-base-100 ">
      <Navbar />
      <div className="w-full h-full p-4">
        <h1 className="text-3xl font-bold underline w-full text-center">
          1ère Consultation
        </h1>
        <Input label="Nom" placeholder="Nom" className="m-4" />
        <Input label="Prénom" placeholder="Prénom" className="m-4" />
        <Input label="Date de naissance" type="date" className="m-4" />
        <RevealCheckBox
          categoryLabel="Medecin Orthodontiste"
          label="Suivi par un médecin orthodontiste ?"
          className="flex-row items-center w-full"
        >
          <Input label="Nom du médecin" placeholder="Nom du médecin" />
        </RevealCheckBox>
        <Button className="m-4" onClick={createPdf}>
          Create PDF
        </Button>
      </div>
    </div>
  );
}

export default App;
