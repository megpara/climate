import DonateButton from "../DonateButton";
import styles from "../../styles/Register.module.css";
import { useRouter } from "next/router";
export default function RegisterSuccess() {
  const router = useRouter();
  return (
    <div className={styles.successConatiner}>
      <div className="text-block">Thank you for registering!</div>
      <div className="text-block">
        This event is free, but we greatly appreciate any donations
      </div>

      <DonateButton />
      <div className="text-block">
        You will be hearing from us soon, but in the meantime feel free to
        continue organizing your schedule
      </div>
      <button
        onClick={() => router.push("/schedule")}
        style={{ width: 250, marginTop: 10 }}
        className="mainButton"
      >
        Go To Schedule
      </button>
    </div>
  );
}
