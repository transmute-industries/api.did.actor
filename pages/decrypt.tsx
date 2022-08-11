import type { NextPage } from "next";
import Head from "next/head";
import { AppPage } from "../components/app-page";
import React from "react";
import { Box } from "@mui/material";

import dynamic from "next/dynamic";
const DecryptWith = dynamic(() => import("../components/decrypt-with"), {
  ssr: false,
});

const example =
  "eyJraWQiOiJkaWQ6a2V5Ono2TWt0aVN6cUY5a3F3ZFU4VmtkQkt4NTZFWXpYZnBnbk5QVUFHem5waWNOaVdmbiN6NkxTdDhDa2UxWEc2dnRoVHBkZWs5eHg2YTVOS3o4Z0V1WVBRSEpQaFJqZlJFQUMiLCJhbGciOiJFQ0RILUVTK0EyNTZLVyIsImVuYyI6IkEyNTZHQ00iLCJlcGsiOnsieCI6Ijl3TW03VG9OVlVNZGloMHdXRWxucndEaVJ3UEZ3VWRLdkFFQlFsd2oxVXMiLCJjcnYiOiJYMjU1MTkiLCJrdHkiOiJPS1AifX0.4GMLpeNDH0M9JPjjrE-Ud8wrP1r_XIMuAq_fjnj2QEbiymTb1DGBVQ.6jo-sd-Kt0HOrEfG.ILoTc2_n6SjZ2omOjBsiqorYHAB1lCC5tbJSNvmbG4OfJw5tsJWmC3shGRGx5kZCjmPDnahb_LBw_AsFtiHfvGL-.GyrURkn3qHS-Gc_aH0scrA";

const Encrypt: NextPage = () => {
  return (
    <>
      <Head>
        <title>did actor</title>
        <meta name="description" content="Decentralized identifiers api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppPage>
        {" "}
        <Box
          style={{
            marginTop: "64px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <DecryptWith value={example} />
        </Box>
      </AppPage>
    </>
  );
};

export default Encrypt;
