import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../components/Layout";
import PageLayout from "../components/PageLayout";

export default function RegisterCallback() {
  const router = useRouter();
  console.log(router.query);
  useEffect(() => {
    const { email, attending } = router.query;
    if (email && attending) {
      console.log("send it");
      console.log(email, attending);
      fetch("/api/update-attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, attending }),
      }).then(console.log);
    }
  }, [router.query]);
  return (
    <PageLayout>
      <div
        style={{
          border: "3px white solid",
          width: "90%",
          maxWidth: 600,
          padding: 30,
          margin: "auto",
        }}
      >
        <div style={{ color: "white", fontSize: "3rem", textAlign: "center" }}>
          Thank you for responding!
        </div>
        <div
          style={{
            color: "white",
            fontSize: "3rem",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          You will be marked as attending{" "}
          {router.query.attending === "virtual" ? "Virtually" : "In Person"}
        </div>
      </div>
    </PageLayout>
  );
}
