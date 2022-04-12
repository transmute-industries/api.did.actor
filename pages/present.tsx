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
