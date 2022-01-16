/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-sync-scripts */
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

const ApidDocs: NextPage = (props: any) => {
  const title = "API";
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
          show-header="false"
          show-info="true"
          allow-authentication="true"
          allow-server-selection="true"
          allow-api-list-style-selection="true"
          render-style="read"
          header-color="#594aa8"
          primary-color="#fcb373"
          regular-font="Rajdhani"
          mono-font="Lato"
          theme="dark"
        >
          <img
            alt="brand"
            src="https://www.transmute.industries/svg/Logo-Transmute-WHT.svg"
            style={{ maxWidth: "256px", marginLeft: "64px" }}
          />

          <p slot="footer">
            © 2022 Transmute Industries, Inc. All rights reserved.
          </p>
        </rapi-doc>
      </>
    </>
  );
};

export default ApidDocs;
