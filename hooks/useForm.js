import { generateForm } from "../components/Form/utils";

export default function useForm(keys) {
  const data = generateForm(keys);
  return data;
}
