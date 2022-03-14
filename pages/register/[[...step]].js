import Head from "next/head";
import useApi from "../../hooks/useApi";
import RegisterForm from "../../components/Register/Form";
import { endpoints } from "../../lib/constants";
import { useRouter } from "next/router";
import useAuth from "../../hooks/useAuth";
import RegisterSuccess from "../../components/Register/Success";
import useView from "../../hooks/useView";

const views = {
  registerForm: "1",
  success: "2",
};

export default function Register() {
  const { user, registration } = useAuth();
  const router = useRouter();
  const view = useView(views, router.query.step);
  const api = useApi();

  const submit = async (values) => {
    const data =
      user && user.publicAddress
        ? { ...values, publicAddress: user.publicAddress }
        : values;
    await api.post(data, endpoints.climateRegister);
    router.push("/register/2");
  };

  const isRegistered = Boolean(registration);

  return (
    <div>
      <Head>
        <title>Registration - The West Coast Climate Crisis Symposium</title>
        <meta
          name="description"
          content="Register for The West Coast Climate Crisis Symposium"
        />
      </Head>
      {isRegistered ? <h3>You are already registered</h3> : ""}
      {view.registerForm && (
        <RegisterForm
          submit={submit}
          buttonText={api.state.buttonText}
          email={user ? user.email : ""}
          registration={registration}
        />
      )}
      {view.success && <RegisterSuccess />}
    </div>
  );
}
