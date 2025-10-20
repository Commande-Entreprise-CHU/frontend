import RevealCheckBox from "../components/RevealCheckBox";
import { createPdf } from "../utils/pdfLogic/createPdf";
import Radio from "../components/Radio";
import Button from "../components/Button";
import Input from "../components/Input";
import Range from "../components/Range";

const PremConsult = () => {
  return (
    <>
      <div className="w-full h-full p-4">
        <h1 className="text-4xl font-bold text-primary w-full text-center">
          1ère Consultation
        </h1>
        <fieldset className="fieldset mt-4 border-base-300 rounded-box border p-4">
          <legend className="fieldset-legend text-xl text-primary">
            Informations Personnelles{" "}
          </legend>

          <Input label="Nom" placeholder="Nom" />
          <Input label="Prénom" placeholder="Prénom" />
          <Input label="Date de naissance" type="date" />
          <Input label="IPP" placeholder="IPP" />
          <Radio
            label="Sexe"
            options={[
              { value: "homme", label: "Homme", default: true },
              { value: "femme", label: "Femme" },
            ]}
          />
          <Input label="Profession" placeholder="Profession" />
        </fieldset>
        <RevealCheckBox
          categoryLabel="Medecin Orthodontiste"
          label="Suivi par un médecin orthodontiste ?"
          className="flex-row items-center w-full"
        >
          <Input label="Nom du médecin" placeholder="Nom du médecin" />
        </RevealCheckBox>
        <Range
          steps={[
            "pas de douleur",
            "douleur",
            "douleur extreme ",
            "aiiii j'ai mal",
            "ca pique",
          ]}
        />
        <Button className="m-4" onClick={createPdf}>
          Create PDF
        </Button>
      </div>
    </>
  );
};
export default PremConsult;
