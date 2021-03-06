import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/square_logo.png" />
        <meta
          property="og:image"
          content="https://westcoastclimatecrisis.org/og-image.png"
        />
        <link rel="stylesheet" href="https://use.typekit.net/qfx7urw.css" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,900&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js"
          charset="UTF-8"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
