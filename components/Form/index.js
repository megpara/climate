import { Formik, Form } from "formik";
import formStyles from "../../styles/Form.module.css";
import SubmitButton from "./SubmitButton";
// Not being used, but could be a way to abstract from boilerplate-- but it is currently identical to the Formik api setup
// The buttons could be attached to this
// Fields could be optionally children or data
export default function ({
  submit,
  initialValues,
  children,
  schema,
  buttonText = "Submit",
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={submit}
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form className={formStyles.form}>
            {children}
            <SubmitButton
              disabled={!(formik.isValid && formik.dirty)}
              isSubmitting={formik.isSubmitting}
              buttonText={buttonText}
            />
          </Form>
        );
      }}
    </Formik>
  );
}