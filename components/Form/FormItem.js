import { Field } from "formik";
import _ from "lodash";
import formStyles from "../../styles/Form.module.css";
import Error from "./Error";

export default function FieldItem({ data, isSelect = false, options = [] }) {
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
      {isSelect && (
        <Field as={"select"} className={formStyles.input} id={name} name={name}>
          {options.map((option) => (
            <option value={option}>{_.startCase(option)}</option>
          ))}
        </Field>
      )}

      {!isSelect && (
        <Field className={formStyles.input} id={name} name={name}></Field>
      )}
      <Error name={name} />
    </div>
  );
}
