import DynamicForm from "../components/DynamicForm";
import PremConsultConfig from "../utils/TestConsult.json" with { type: "json" };
import type { FormConfig } from "../types/formTypes";

const PremConsult = () => {
  return <DynamicForm config={PremConsultConfig as FormConfig} />;
};

export default PremConsult;
