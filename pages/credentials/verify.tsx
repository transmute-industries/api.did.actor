import type { NextPage } from "next";
import Head from "next/head";
import { AppPage } from "../../components/app-page";
import React from "react";
import { Box } from "@mui/material";

import dynamic from "next/dynamic";
const JsonVerifier = dynamic(() => import("../../components/json-verifier"), {
  ssr: false,
});

const example = {
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  id: "urn:uuid:07aa969e-b40d-4c1b-ab46-ded252003ded",
  type: ["VerifiableCredential"],
  issuer: { id: "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn" },
  issuanceDate: "2010-01-01T19:23:24Z",
  credentialSubject: { id: "did:example:123" },
  proof: {
    type: "Ed25519Signature2018",
    created: "2021-10-30T17:32:33Z",
    verificationMethod:
      "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn#z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn",
    proofPurpose: "assertionMethod",
    jws: "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..YSJ1frCj50u2ZU7m5FkK1pShjHUsuieL3-6L9XLhGiBU6HNGezd2f5HGRDAhXbHLQfXrmkdUIUGzvnR0ST--Dw",
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
          <JsonVerifier value={example} />
        </Box>
      </AppPage>
    </>
  );
};

export default Verify;
