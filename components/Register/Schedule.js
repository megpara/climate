import useScrolled from "../../hooks/useScrolled";
import SchedulePage from "../../components/Schedule";
import styles from "../../styles/Register.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
export default function Schedule({
  schedule,
  registration,
  mutate,
  attendees,
}) {
  const scrolled = useScrolled(20);
  const router = useRouter();
  return (
    <>
      <AnimatePresence>
        {scrolled && (
          <motion.button
            onClick={() => router.push("/register/3")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: "0.5" }}
            className={`mainButton ${styles.floating}`}
          >
            Finish registering
          </motion.button>
        )}
      </AnimatePresence>
      <div
        className={styles.message}
        style={{
          maxWidth: 500,
          fontWeight: "bold",
          fontSize: "1.3rem",
          margin: "10px auto",
        }}
      >
        Please select items from the schedule you would like to attend
      </div>
      <SchedulePage
        schedule={schedule}
        registration={registration}
        mutate={mutate}
        attendees={attendees}
      />
    </>
  );
}
