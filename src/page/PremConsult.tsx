import DynamicForm from "../components/DynamicForm";
import PremConsultConfig from "../utils/PremConsult/PremConsult.json" with { type: "json" };
import type { FormConfig } from "../types/formTypes";
import PremConsultTemplate from "../utils/PremConsult/PremConsultTemplate.txt" with { type: "text" };
const PremConsult = () => {
  return <DynamicForm config={PremConsultConfig as FormConfig} templateSrc={PremConsultTemplate} />;
};

export default PremConsult;
