import { RegisterSchema } from "../Form/schemas";
import Form from "../Form";
import FieldItem from "../Form/FormItem";
import useForm from "../../hooks/useForm";

// Provide the form keys and a label if it does not convert from camel case
const keys = [
  "firstName",
  "lastName",
  "email",
  { name: "phone", label: "Phone Number" },
];

export default function RegisterForm({
  submit,
  buttonText,
  email,
  registration,
}) {
  // Generate objects to pass into Formik and FormItem
  let { initialValues, fields } = useForm(keys);
  // If they are logged in fill the email field
  if (email) {
    initialValues.email = email;
  }
  // Override from cookies/db
  if (registration) {
    initialValues = registration;
  }
  return (
    // Convenient Form that includes Submit button and basic container styling
    // For more customization-- use the Formik pattern inside
    <Form
      initialValues={initialValues}
      submit={submit}
      buttonText={buttonText}
      schema={RegisterSchema}
    >
      <FieldItem data={fields.firstName} />
      <FieldItem data={fields.lastName} />
      <FieldItem data={fields.email} />
      <FieldItem data={fields.phone} />
    </Form>
  );
}
