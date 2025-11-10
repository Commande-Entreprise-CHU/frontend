import DynamicForm from "../components/DynamicForm";
import PréopConfig from "../utils/PréopConsult.json" with { type: "json" };
import type { FormConfig } from "../types/formTypes";

const Préop = () => {
  return <DynamicForm config={PréopConfig as FormConfig} />;
};

export default Préop;