import { Field } from "formik";
import _ from "lodash";
import formStyles from "../../styles/Form.module.css";
import Error from "./Error";

export default function FieldItem({ data }) {
  let label = _.startCase(data);
  let name = data;
  if (typeof data === "object") {
    label = data.label;
    name = data.name;
  }
  return (
    <div className={formStyles.formItem}>
      <label className={formStyles.label} htmlFor={name}>
        {label}*
      </label>
      <Field className={formStyles.input} id={name} name={name} />
      <Error name={name} />
    </div>
  );
}
