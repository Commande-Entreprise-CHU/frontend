import DynamicForm from "../components/DynamicForm";
import PostOpConfig from "../utils/Postop3mConsult.json" with { type: "json" };
import type { FormConfig } from "../types/formTypes";

const Postop3mois = () => {
  return <DynamicForm config={PostOpConfig as FormConfig} templateSrc="" />;
};

export default Postop3mois;