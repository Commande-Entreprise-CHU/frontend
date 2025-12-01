import DynamicForm from "../../components/DynamicForm";
import PostOP6Json from "../../utils/json/PostOp6.json";
import type { FormConfig } from "../../types";

const PostOP6Config = PostOP6Json as unknown as FormConfig;

export default function PostOP6() {
  return <DynamicForm config={PostOP6Config} />;
}
