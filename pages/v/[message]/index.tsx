/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { AppPage } from "../../../components/app-page";
import React from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";

import { expand } from "../../../io/expand";

import { verifyCredential } from "../../../vc-api";
import { verifyPresentation } from "../../../vc-api";

import { CredentialPreview } from "../../../components/credential-preview";
import { PresentationPreview } from "../../../components/presentation-preview";

export async function getServerSideProps(context: any) {
  return {
    props: {
      message: context.params.message,
      //   recipient: getRecipient(context.params.message),
    }, // will be passed to the page component as props
  };
}

const Verify: NextPage = (props: any) => {
  const message: any = props.message;
  const title = "verify:..." + message.substr(-4);
  const expanded = expand(message);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppPage>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "5vh" }}
        >
          <Grid item xs={3}>
            <div style={{ width: "100%", maxWidth: "640px" }}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                {expanded.type === "VerifiablePresentation" ||
                expanded.type.includes("VerifiablePresentation") ? (
                  <PresentationPreview
                    presentation={expanded}
                    verifyPresentation={verifyPresentation}
                  />
                ) : (
                  <CredentialPreview
                    credential={expanded}
                    verifyCredential={verifyCredential}
                  />
                )}
              </Box>
            </div>
          </Grid>
        </Grid>
      </AppPage>
    </>
  );
};

export default Verify;
