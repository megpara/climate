import { ErrorMessage } from "formik";
import formStyles from "../../styles/Form.module.css";

export default function Error({ name }) {
  return (
    <ErrorMessage
      name={name}
      render={(msg) => {
        let message = msg;
        console.log(msg);
        if (msg.includes("phone must be a")) {
          message = "Phone number is invalid";
        }
        return <div className={formStyles.errorMessage}>{message}</div>;
      }}
    />
  );
}
