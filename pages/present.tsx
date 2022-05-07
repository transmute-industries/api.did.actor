import type { NextPage } from "next";
import Head from "next/head";
import { AppPage } from "../components/app-page";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Box } from "@mui/material";

import dynamic from "next/dynamic";

const JsonPresentationHolder = dynamic(
  () => import("../components/json-presentation-holder"),
  {
    ssr: false,
  }
);

const example = {
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  id: "urn:uuid:" + uuidv4(),
  type: ["VerifiablePresentation"],
  holder: "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn",
  verifiableCredential: [
    {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/vc-revocation-list-2020/v1",
      ],
      id: "urn:uuid:4f1eabd0-76b7-4c8b-be72-a125b8bb9c48",
      type: ["VerifiableCredential"],
      issuer: "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn",
      issuanceDate: "2010-01-01T19:23:24Z",
      credentialStatus: {
        id: "https://api.did.actor/revocation-lists/1.json#0",
        type: "RevocationList2020Status",
        revocationListIndex: 0,
        revocationListCredential:
          "https://api.did.actor/revocation-lists/1.json",
      },
      credentialSubject: { id: "did:example:123" },
      proof: {
        type: "Ed25519Signature2018",
        created: "2022-05-07T15:30:56Z",
        verificationMethod:
          "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn#z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn",
        proofPurpose: "assertionMethod",
        jws: "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..GgO_6jlepqqhXbeSqLCfp4NEnzqi4JTmwNCDQT2hi9TR2nhQ8NhY9CTjssXrsxTSYNPED1MVmCll7Hsj33KYDQ",
      },
    },
  ],
};

const Issue: NextPage = () => {
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
          <JsonPresentationHolder value={example} />
        </Box>
      </AppPage>
    </>
  );
};

export default Issue;
