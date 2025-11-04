import React from "react";
import PremConsult from "../utils/PremConsult.json" with { type: "json" };
import type { FormConfig } from "../types/formTypes";
import DynamicForm from "../components/DynamicForm";

const PremConsultDyn: React.FC = () => {
  return <DynamicForm config={PremConsult as FormConfig} />;
};

export default PremConsultDyn;
