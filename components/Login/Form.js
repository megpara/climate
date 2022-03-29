import { LoginSchema, RegisterSchema } from "../Form/schemas";
import Form from "../Form";
import FieldItem from "../Form/FormItem";
import useForm from "../../hooks/useForm";

// Provide the form keys and a label if it does not convert from camel case
const keys = ["email"];

export default function LoginForm({ submit, buttonText }) {
  // Generate objects to pass into Formik and FormItem
  let { initialValues, fields } = useForm(keys);

  return (
    // Convenient Form that includes Submit button and basic container styling
    // For more customization-- use the Formik pattern inside
    <Form
      initialValues={initialValues}
      submit={submit}
      buttonText={buttonText}
      schema={LoginSchema}
    >
      <FieldItem data={fields.email} />
    </Form>
  );
}
