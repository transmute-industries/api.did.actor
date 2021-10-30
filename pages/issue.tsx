import type { NextPage } from "next";
import Head from "next/head";
import { AppPage } from "../components/app-page";
import React from "react";

import { Typography, Link, Hidden, Box, TextField } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import InputAdornment from "@mui/material/InputAdornment";
import { defaultMnemonic } from "../core/defaultMnemonic";
import dynamic from "next/dynamic";

const JsonCredentialIssuer = dynamic(
  () => import("../components/json-credential-issuer"),
  {
    ssr: false,
  }
);

const example = {
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  id: "urn:uuid:07aa969e-b40d-4c1b-ab46-ded252003ded",
  type: ["VerifiableCredential"],
  issuer: { id: "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn" },
  issuanceDate: "2010-01-01T19:23:24Z",
  credentialSubject: { id: "did:example:123" },
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
          <JsonCredentialIssuer value={example} />
        </Box>
      </AppPage>
    </>
  );
};

export default Issue;
