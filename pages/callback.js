import { useRouter } from "next/router";
import { useEffect } from "react";
import { Magic } from "magic-sdk";

export default function Callback() {
  const router = useRouter();

  const onCreds = async (cred) => {
    const did = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
    ).auth.loginWithCredential(cred);

    const authRequest = await fetch("/api/login", {
      method: "POST",
      headers: { Authorization: `Bearer ${did}` },
    });

    if (authRequest.ok) {
      router.push("/");
      // mutate("/api/user");
    }
  };

  useEffect(() => {
    const { magic_credential } = router.query;
    if (magic_credential) {
      onCreds(magic_credential);
    }
  }, [router.query]);
  return <div></div>;
}
