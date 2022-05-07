import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { Theme, theme } from "../components/theme";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="shortcut icon" href={(theme as any).favicon} />
        </Head>
        <body>
          <Theme>
            <Main />
            <NextScript />
          </Theme>
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
  };
};
