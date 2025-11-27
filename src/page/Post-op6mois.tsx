import DynamicForm from "../components/DynamicForm";
import PostOpConfig from "../utils/Postop6mConsult.json" with { type: "json" };
import type { FormConfig } from "../types/formTypes";

const Postop6mois = () => {
  return <DynamicForm config={PostOpConfig as FormConfig} />;
};

export default Postop6mois;