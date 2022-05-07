/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-sync-scripts */
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { config } from "../components/config";

export async function getServerSideProps(context: any) {
  var props = {
    config,
  };
  // DEBUG: console.log(props);
  return {
    props, // will be passed to the page component as props
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
        <link href={props.config.theme_config.font_link} rel="stylesheet" />
        <link
          href={props.config.theme_config.font_link_mono}
          rel="stylesheet"
        />
      </Head>
      <>
        <rapi-doc
          spec-url="/spec/openapi.yml"
          schema-style="table"
          show-header={props.config.theme_config.header_show}
          show-info="true"
          allow-authentication="true"
          allow-server-selection="true"
          allow-api-list-style-selection="true"
          render-style="read"
          bg-color={props.config.theme_config.bg}
          nav-bg-color={props.config.theme_config.bg_nav}
          header-color={props.config.theme_config.header_color}
          primary-color={props.config.theme_config.primary}
          regular-font={props.config.theme_config.font}
          mono-font={props.config.theme_config.mono}
          theme={props.config.theme_config.theme}
        >
          <img
            alt="brand"
            src={props.config.theme_config.logo}
            style={{ maxWidth: "256px", marginLeft: "72px", marginTop: "24px" }}
          />

          <p slot="footer">{props.config.theme_config.footer}</p>
        </rapi-doc>
      </>
    </>
  );
};

export default ApidDocs;
