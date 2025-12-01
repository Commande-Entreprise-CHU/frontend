import DynamicForm from "../../components/DynamicForm";
import PreOpJson from "../../utils/json/PreOp.json";
import type { FormConfig } from "../../types";

const PreOpConfig = PreOpJson as unknown as FormConfig;

export default function PreOp() {
  return <DynamicForm config={PreOpConfig} />;
}
