import Head from "next/head";
import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Head>
        <title>The West Coast Climate Crisis Symposium</title>
        <meta
          name="description"
          content="The West Coast Climate Crisis Symposium"
        />
      </Head>
      {children}
    </div>
  );
}
