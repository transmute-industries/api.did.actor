import type { NextPage } from "next";
import Head from "next/head";
import { AppPage } from "../components/app-page";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Box } from "@mui/material";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { config } from "../components/config";
const JsonCredentialIssuer = dynamic(
  () => import("../components/json-credential-issuer"),
  {
    ssr: false,
  }
);

const Issue: NextPage = () => {
  const router = useRouter();
  const example = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://w3id.org/vc-revocation-list-2020/v1",
    ],
    id: "urn:uuid:" + uuidv4(),
    type: ["VerifiableCredential"],
    issuer: "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn",
    issuanceDate: "2010-01-01T19:23:24Z",
    credentialStatus: {
      id: "https://" + config.env_config.domain + "/revocation-lists/1.json#0",
      type: "RevocationList2020Status",
      revocationListIndex: 0,
      revocationListCredential: "https://" + config.env_config.domain + "/revocation-lists/1.json",
    },
    credentialSubject: { id: router.query.subject || "did:example:123" },
  };
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
          <JsonCredentialIssuer value={example} />
        </Box>
      </AppPage>
    </>
  );
};

export default Issue;
