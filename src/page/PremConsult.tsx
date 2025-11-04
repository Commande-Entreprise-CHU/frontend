import DynamicForm from "../components/DynamicForm";
import PremConsultConfig from "../utils/PremConsult.json";

const PremConsult = () => {
  return <DynamicForm config={PremConsultConfig} />;
};

export default PremConsult;
