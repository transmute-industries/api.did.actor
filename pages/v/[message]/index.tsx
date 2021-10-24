/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { AppPage } from "../../../components/app-page";
import React from "react";
import { TextField, Grid, Button } from "@mui/material";
import { Box } from "@mui/material";

import IconButton from "@mui/material/IconButton";

import InputAdornment from "@mui/material/InputAdornment";

import { verify } from "../../../io/verify";

import LockOpenIcon from "@mui/icons-material/LockOpen";

import { DIDAsTextField } from "../../../components/did-as-textfield";

import { defaultMnemonic } from "../../../core/defaultMnemonic";

import BiotechIcon from "@mui/icons-material/Biotech";
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

  const handleVerifyMessage = async () => {
    try {
      const { vc, issuer } = await verify(message);

      setIssuer(issuer);
    } catch (e) {
      console.error(e);
      alert("verification failed.");
    }
  };

  const [issuer, setIssuer] = React.useState("");
  const [plaintext, setPlaintext] = React.useState("");

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
                {issuer && (
                  <DIDAsTextField
                    label="Message Recipient"
                    did={issuer}
                    style={{ marginTop: "32px" }}
                  />
                )}

                <Button
                  style={{ marginLeft: "8px" }}
                  onClick={handleVerifyMessage}
                  variant="contained"
                  color={"secondary"}
                  endIcon={<BiotechIcon />}
                >
                  Verify
                </Button>
              </Box>
            </div>
          </Grid>
        </Grid>
      </AppPage>
    </>
  );
};

export default Verify;
