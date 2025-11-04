import React from "react";
import PremConsult from "../utils/PremConsult.json";
import DynamicForm from "../components/DynamicForm";

const PremConsultDyn: React.FC = () => {
  return <DynamicForm config={PremConsult} />;
};

export default PremConsultDyn;
