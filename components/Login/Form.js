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
    <div>
      <div className="text-block" style={{ textAlign: "center" }}>
        If you registered on a different computer, you can login here to view
        your schedule
      </div>
      <Form
        initialValues={initialValues}
        submit={submit}
        buttonText={buttonText}
        schema={LoginSchema}
      >
        <FieldItem data={fields.email} />
      </Form>
      <div className="text-block" style={{ textAlign: "center" }}>
        After clicking Login, please check your email for a verification link
      </div>
    </div>
  );
}
