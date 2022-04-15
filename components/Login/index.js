import { useState } from "react";
import { Magic } from "magic-sdk";
import useAuth from "../../hooks/useAuth";
import useAttendees from "../../hooks/useAttendees";
import PageLayout from "../PageLayout";
import LoginForm from "./Form";
import Schedule from "../../components/Schedule";
import { useEffect } from "react";
import Link from "next/link";
import { getHost } from "../../lib/utils";

const ButtonText = {
  Login: "Login",
  Check: "Check your email!",
  Success: "Success!",
};

const endpoints = {
  user: "/api/user",
  registration: "/api/get-registration",
};

export default function Login({ schedule }) {
  const { user, loading, registration } = useAuth();
  const { attendees, mutate } = useAttendees();
  const [buttonText, setButtonText] = useState(ButtonText.Login);
  const [userSchedule, setUserSchedule] = useState([]);
  const login = async (values) => {
    const { email } = values;
    setButtonText(ButtonText.Check);
    const did = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
    ).auth.loginWithMagicLink({
      email,
      redirectURI: `${getHost()}/callback`,
    });
    const authRequest = await fetch("/api/login", {
      method: "POST",
      headers: { Authorization: `Bearer ${did}` },
    });
    if (authRequest.ok) {
      setButtonText(ButtonText.Success);
      mutate(endpoints.user);
      mutate(endpoints.registration);
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      }, 1000);
    }
  };
  const logout = async () => {
    await fetch("/api/logout").then(() => {
      window.location.reload();
    });
  };
  useEffect(() => {
    // so confused -- while fetching, attendees is equal to the path-- I guess this is related to mutate calling it declaratively?
    if (user && schedule.length > 0 && typeof attendees === "object") {
      const userSchedule = schedule.filter((s) =>
        attendees[s.slug].includes(user.email)
      );
      setUserSchedule(userSchedule);
    }
  }, [user, attendees]);
  return (
    <PageLayout>
      <div style={{ maxWidth: 350, margin: "auto", fontWeight: "bold" }}>
        {!user && <LoginForm buttonText={buttonText} submit={login} />}
        {!loading && user && user.email && (
          <>
            <div className="text-block">You are logged in as:</div>
            <h3>{user.email}</h3>
            {registration && (
              <div className="text-block">
                You will be able to select items from the{" "}
                <Link href="/schedule">
                  <span className="linkButton">Schedule</span>
                </Link>
              </div>
            )}
            {!registration && (
              <>
                <div className="text-block">
                  You still need to register{" "}
                  <div>
                    <Link href="/register">
                      <div className="linkButton">Go to Register</div>
                    </Link>
                  </div>
                </div>
                <div className="text-block">
                  Once you are registered you will be able to select items from
                  the schedule!
                </div>
              </>
            )}
            <button
              style={{ margin: "30px auto", fontSize: "1rem", width: 140 }}
              className="mainButton"
              onClick={logout}
            >
              Logout
            </button>
            <div>
              <Schedule
                schedule={userSchedule}
                attendees={attendees}
                registration={registration}
                mutate={mutate}
              />
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
}
