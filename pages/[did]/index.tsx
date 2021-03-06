import type { NextPage } from "next";
import Head from "next/head";
import { AppPage } from "../../components/app-page";
import React from "react";
import { Box, Grid } from "@mui/material";
import { ResolutionResult } from "../../components/did-resolution-result";
import { DIDAsTextField } from "../../components/did-as-textfield";
import { config } from "../../components/config";

export async function getServerSideProps(context: any) {
  return {
    props: {
      did: context.params.did,
    }, // will be passed to the page component as props
  };
}

const Resolve: NextPage = (props: any) => {
  const did: any = props.did;
  const title = config.env_config.domain; // did ? did.substr(0, 9) + "..." + did.substr(-4) : "unknown";

  // DEBUG:
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
                <DIDAsTextField did={did} />
                <>
                  <Box style={{ marginTop: "32px" }}>
                    <ResolutionResult did={did} />
                  </Box>
                </>
              </Box>
            </div>
          </Grid>
        </Grid>
      </AppPage>
    </>
  );
};

export default Resolve;
