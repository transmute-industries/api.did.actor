import type { NextPage } from "next";
import Head from "next/head";
import { AppPage } from "../../components/app-page";
import React from "react";
import { Box } from "@mui/material";

import dynamic from "next/dynamic";
const JsonEditor = dynamic(() => import("../../components/json-verifier"), {
  ssr: false,
});

const example = {
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  id: "urn:uuid:07aa969e-b40d-4c1b-ab46-ded252003ded",
  type: ["VerifiablePresentation"],
  holder: "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn",
  proof: {
    type: "Ed25519Signature2018",
    created: "2021-10-30T18:32:51Z",
    verificationMethod:
      "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn#z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn",
    proofPurpose: "authentication",
    challenge: "123",
    jws: "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..TJhzZQQgnHUUg8J5QHwVIPDLXtLaVtxIV8pzm9WrckMsr3fsGXSuYAgkFVouzx_Xymyla-JHZKvUrAPW-3fHDg",
  },
};
const Verify: NextPage = () => {
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
          <JsonEditor value={example} />
        </Box>
      </AppPage>
    </>
  );
};

export default Verify;
