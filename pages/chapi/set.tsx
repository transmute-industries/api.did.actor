/* eslint-disable @next/next/no-sync-scripts */
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";

import { ChapiPage } from "../../components/ChapiPage";
import { Stack, Button, Typography } from "@mui/material";

export async function getServerSideProps(context: any) {
  var props = {
    //    server side props here.
  };

  return {
    props, // will be passed to the page component as props
  };
}

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
    // TODO: save local storage
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
            TODO: Implement /presentations/verify ui here.
          </Typography>
          <Button variant={"contained"} onClick={handleStoreCredential}>
            Save Credentials
          </Button>
          <pre>{JSON.stringify(chapiState, null, 2)}</pre>
        </Stack>
      </ChapiPage>
    </>
  );
};

export default ChapiWallet;
