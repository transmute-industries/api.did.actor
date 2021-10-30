import type { NextPage } from "next";
import Head from "next/head";
import { AppPage } from "../components/app-page";
import React from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const JsonMessageEncrypter = dynamic(
  () => import("../components/json-message-encrypter"),
  {
    ssr: false,
  }
);

const Encrypt: NextPage = () => {
  const router = useRouter();
  const recipient =
    router.query.subject ||
    "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn";
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
          <JsonMessageEncrypter
            value={{
              message: "the quieter you become the more you are able to hear",
            }}
            recipient={recipient}
          />
        </Box>
      </AppPage>
    </>
  );
};

export default Encrypt;
