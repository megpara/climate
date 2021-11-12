import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>The West Coast Climate Crisis Symposium</title>
        <meta
          name="description"
          content="The West Coast Climate Crisis Symposium"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
}
