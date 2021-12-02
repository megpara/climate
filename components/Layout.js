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
        <link rel="icon" href="/square_logo.png" />
        <link rel="stylesheet" href="https://use.typekit.net/qfx7urw.css" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      {children}
    </div>
  );
}
