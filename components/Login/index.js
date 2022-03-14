import { Magic } from "magic-sdk";
import { mutate } from "swr";
import useAuth from "../../hooks/useAuth";
import PageLayout from "../PageLayout";

export default function Login() {
  const { user, loading } = useAuth();
  const login = async () => {
    const did = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
    ).auth.loginWithMagicLink({
      email: "arielklevecz@gmail.com",
      redirectURI: "http://localhost:3000/callback",
    });
    const authRequest = await fetch("/api/login", {
      method: "POST",
      headers: { Authorization: `Bearer ${did}` },
    });

    if (authRequest.ok) {
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
        <div>{!loading && user && user.email}</div>

        {!user && <button onClick={login}>Login</button>}
        {user && user.email && <button onClick={logout}>Logout</button>}
      </div>
    </PageLayout>
  );
}
