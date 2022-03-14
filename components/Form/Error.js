import { ErrorMessage } from "formik";
import formStyles from "../../styles/Form.module.css";

export default function Error({ name }) {
  return (
    <ErrorMessage
      name={name}
      render={(msg) => <div className={formStyles.errorMessage}>{msg}</div>}
    />
  );
}
