import Head from "next/head";
import useApi from "../../hooks/useApi";
import RegisterForm from "../../components/Register/Form";
import Schedule from "../../components/Register/Schedule";
import { endpoints } from "../../lib/constants";
import { useRouter } from "next/router";
import useAuth from "../../hooks/useAuth";
import RegisterSuccess from "../../components/Register/Success";
import useView from "../../hooks/useView";
import PageLayout from "../../components/PageLayout";

import styles from "../../styles/Register.module.css";
import { useEffect } from "react";
import Contentful from "../../lib/contentful";
import useAttendees from "../../hooks/useAttendees";

import ErrorPage from "next/error";
import useScrolled from "../../hooks/useScrolled";

const views = {
  registerForm: "1",
  schedule: "2",
  success: "3",
};

export default function Register({ schedule }) {
  const { mutate, attendees } = useAttendees();
  const { user, registration, registerMutate } = useAuth();
  const router = useRouter();
  const view = useView(views, router.query.step);
  const api = useApi();

  const scrolled = useScrolled(20);

  const submit = async (values) => {
    const data =
      user && user.publicAddress
        ? { ...values, publicAddress: user.publicAddress }
        : values;
    await api.post(data, endpoints.climateRegister);
    registerMutate();
    mutate();
    router.push("/register/2");
  };

  const isRegistered = Boolean(registration);
  // Jank
  // if (!schedule) {
  //   return <ErrorPage status={404} />;
  // }

  return (
    <PageLayout>
      <Head>
        <title>Registration - The West Coast Climate Crisis Symposium</title>
        <meta
          name="description"
          content="Register for The West Coast Climate Crisis Symposium"
        />
      </Head>
      {isRegistered && view.registerForm ? (
        <h3 className={styles.message}>You are registered</h3>
      ) : (
        ""
      )}
      {view.registerForm && (
        <RegisterForm
          submit={submit}
          buttonText={api.state.buttonText}
          email={user ? user.email : ""}
          registration={registration}
        />
      )}
      {schedule && view.schedule && (
        <Schedule
          schedule={schedule}
          registration={registration}
          mutate={mutate}
          attendees={attendees}
        />
      )}
      {view.success && <RegisterSuccess />}
    </PageLayout>
  );
}

const c = new Contentful();
export async function getStaticProps() {
  const schedule = await c.getAllScheduleEntries();
  return {
    props: {
      schedule,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
