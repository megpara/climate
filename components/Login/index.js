import { useState } from "react";
import { Magic } from "magic-sdk";
import { mutate } from "swr";
import useAuth from "../../hooks/useAuth";
import PageLayout from "../PageLayout";
import LoginForm from "./Form";

const ButtonText = {
  Login: "Login",
  Check: "Check your email!",
  Success: "Success!",
};

export default function Login() {
  const { user, loading } = useAuth();
  const [buttonText, setButtonText] = useState(ButtonText.Login);
  const login = async (values) => {
    const { email } = values;
    setButtonText(ButtonText.Check);
    const did = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
    ).auth.loginWithMagicLink({
      email,
      redirectURI:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/callback"
          : "https://westcoastclimatecrisis.org/callback",
    });
    const authRequest = await fetch("/api/login", {
      method: "POST",
      headers: { Authorization: `Bearer ${did}` },
    });

    if (authRequest.ok) {
      setButtonText(ButtonText.Success);
      mutate("/api/user");
    }
  };
  const logout = async () => {
    await fetch("/api/logout").then(() => {
      window.location.reload();
    });
  };
  return (
    <PageLayout>
      <div>
        {!user && <LoginForm buttonText={buttonText} submit={login} />}
        {!loading && user && user.email && (
          <>
            <div className="text-block">You are logged in as:</div>
            <h3>{user.email}</h3>
            <div className="text-block">
              You will be able to select items from the schedule
            </div>
            <button
              style={{ marginTop: 30 }}
              className="mainButton"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </PageLayout>
  );
}
