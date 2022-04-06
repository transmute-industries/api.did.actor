/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-sync-scripts */
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { config } from "../components/config";

export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

const ApidDocs: NextPage = (props: any) => {
  const title = config.theme_config.title;
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="module"
          src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"
        ></script>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <>
        <rapi-doc
          spec-url="/spec/openapi.yml"
          schema-style="table"
          show-header={config.theme_config.header_show}
          show-info="true"
          allow-authentication="true"
          allow-server-selection="true"
          allow-api-list-style-selection="true"
          render-style="read"
          nav-bg-color={config.theme_config.bg}
          header-color={config.theme_config.header_color}
          primary-color={config.theme_config.primary}
          regular-font={config.theme_config.font}
          mono-font={config.theme_config.mono}
          theme={config.theme_config.theme}
        >
          <img
            alt="brand"
            src={config.theme_config.logo}
            style={{ maxWidth: "256px", marginLeft: "64px" }}
          />

          <p slot="footer">
            {config.theme_config.footer}
          </p>
        </rapi-doc>
      </>
    </>
  );
};

export default ApidDocs;
