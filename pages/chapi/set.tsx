/* eslint-disable @next/next/no-sync-scripts */
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { addToWallet } from "../../core/wallet";
import { ChapiPage } from "../../components/ChapiPage";
import { Stack, Button, Typography } from "@mui/material";
declare var window: any;

const ChapiWallet: NextPage = (props: any) => {
  const [chapiState, setChapiState]: any = useState({});
  useEffect(() => {
    (async () => {
      const { WebCredentialHandler } = window;
      const event = await WebCredentialHandler.receiveCredentialEvent();
      setChapiState({ event });
    })();
  }, []);
  const handleStoreCredential = () => {
    const {
      event: {
        credential: { data },
      },
    } = chapiState;
    console.log("wallet stored data ", data);
    for(const credential of data.verifiableCredential) {
      addToWallet(credential);
    }
    chapiState.event.respondWith(
      new Promise((resolve) => {
        return data
          ? resolve({ dataType: "VerifiablePresentation", data })
          : resolve(null);
      })
    );
  };
  return (
    <>
      <Head>
        <title>{"CHAPI SET"}</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://unpkg.com/web-credential-handler@2.0.0/dist/web-credential-handler.min.js"></script>
      </Head>
      <ChapiPage>
        <Stack sx={{ mt: 8 }}>
          <Typography>
            Below is the credential you are going to save to your CHAPI Wallet
          </Typography>
          <Button variant={"contained"} onClick={handleStoreCredential}>
            Save Credentials
          </Button>
          <pre>{JSON.stringify(chapiState?.event?.credential?.data?.verifiableCredential[0], null, 2)}</pre>
        </Stack>
      </ChapiPage>
    </>
  );
};

export default ChapiWallet;
