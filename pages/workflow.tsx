import type { NextPage } from "next";
import Head from "next/head";
import { AppPage } from "../components/app-page";
import React from "react";

import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";

import { Button } from "@mui/material";

import { ModelHistory } from "../components/ModelHistory";

const ModelViewer: any = dynamic(() => import("../components/ModelViewer"), {
  ssr: false,
});

const Workflow: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>DID & VC Workflow</title>
        <meta name="description" content="Workflow Demo" />
        <link rel="icon" href="/favicon.ico" />

        <link
          rel="stylesheet"
          href="https://unpkg.com/bpmn-js@3.1.0/dist/assets/diagram-js.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/bpmn-js@3.1.0/dist/assets/bpmn-font/css/bpmn.css"
        />
        <script src="https://unpkg.com/bpmn-js@3.1.0/dist/bpmn-modeler.development.js"></script>
        <script src="https://unpkg.com/jquery@3.3.1/dist/jquery.js"></script>
      </Head>
      <AppPage>
        {" "}
        <Box
          style={{
            marginTop: "64px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <Button
              onClick={() => {
                router.replace("/workflow?name=linear-integration-example");
              }}
            >
              Steel Import
            </Button>
            <Button
              onClick={() => {
                router.replace("/workflow?name=exclusive-gateway");
              }}
            >
              Check Number
            </Button>
          </div>

          <Grid container>
            <Grid item xs={12} sx={{ height: "512px" }}>
              <ModelViewer name={router.asPath.split("?name=").pop()} />
            </Grid>

            <Grid item xs={12}>
              <ModelHistory />
            </Grid>
          </Grid>
        </Box>
      </AppPage>
    </>
  );
};

export default Workflow;
