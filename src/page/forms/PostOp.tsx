import DynamicForm from "../../components/DynamicForm";
import PostOPJson from "../../utils/json/PostOp3.json";
import type { FormConfig } from "../../types";

const PostOPConfig = PostOPJson as unknown as FormConfig;

export default function PostOP() {
  return <DynamicForm config={PostOPConfig} />;
}
