import { motion } from "framer-motion";
import formStyles from "../../styles/Form.module.css";
import Spinner from "../Animations/Spinner";

export default function SubmitButton({
  isSubmitting,
  disabled,
  buttonText = "Submit",
}) {
  return (
    <motion.button
      layout
      disabled={disabled}
      className={`${formStyles.submitButton} ${
        formStyles[buttonText.toLowerCase()]
      }`}
      type="submit"
    >
      {isSubmitting ? <Spinner /> : buttonText}
    </motion.button>
  );
}
