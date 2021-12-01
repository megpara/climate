import { motion } from "framer-motion";
import homeStyles from "../../styles/Home.module.css";
import { buttonText } from "./constants";
import styles from "./EmailSignup.module.css";
import Spinner from "./spinner";
import useApi from "./useApi";

export default function EmailSignup() {
  const api = useApi();
  const onChange = (e) => {
    api.updateField(e.target.name, e.target.value);
  };
  return (
    <div className={homeStyles.emailContainer}>
      <motion.div className={homeStyles.emailDiv}>
        {api.state.buttonText === buttonText.success ? (
          <div style={{ textAlign: "center", margin: 20 }}>
            <div
              dangerouslySetInnerHTML={{ __html: api.state.message }}
              className={homeStyles.boldSubtitle}
            />
          </div>
        ) : (
          <>
            <div className={homeStyles.boldSubtitle}>
              Leave your email for more information
            </div>
            <input
              onChange={onChange}
              name="email"
              className={homeStyles.emailInput}
              type="email"
            />
          </>
        )}
        <motion.button
          layout
          onClick={api.signup}
          disabled={
            !api.state.email || api.state.buttonText === buttonText.success
          }
          className={`${homeStyles.mainButton} ${
            styles[api.state.buttonText.toLowerCase()]
          }`}
          style={{ transition: "background 500ms", fontWeight: "bold" }}
        >
          {api.state.fetching ? <Spinner /> : api.state.buttonText}
        </motion.button>
        <div className={styles.errorMessage}>{api.state.error}</div>
      </motion.div>
    </div>
  );
}
