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
  "eJyVUtuSojAU_Bf2cceqgREKfQOFsDJyNQhsbVlIMhITmIhRkan59w37B_uWc-nq7tP5Unj_KXAtMFKWCn5u2LHdkpBsinj89YCrzUJ5UXpcE05wJ67K8veX0uAK4V5ZfimUTChE0JLi53I0tlSQdLy4C3p5IGhmFNn-oBtOMeYf_NQFEbTA2HFSB2T_0f0YjfdUmCuK1RwYd9HsOMJ0MQxGpQf-aJ6cWxHF3iZqkvNH4lgrKaViJ8norNbezEl_Wppu-HvZxpz-0yOechr6kWzV_V2-c03X1cnDIIuoFvDVVW1dAyMD3KHMrWxjW3aPYnMN7_GlLrZWOfi1Wyjfkovf_hM0YSbWEjAatoLhHTcCqvYIsB3uXBDuxYC0JAvdsi-dzTteQ1kxYw_KR6npIXQzO3njtxqw865lednOz_hcbuFbPI81wbZZ4wVd-Vq5yaMEWR_mzTxoHXVHhREC5KKMxRA2PgRNWrVlmkB3PTnBXd0_ucz4IHOS-sRwA85waUUzpHpoqWARHCvfVo9z4VnmKcpyEaD1Qr-S1-7T5MQ7cBdZyvefF4VM_u5ODyGZp9S_j1ms3TIEAt-e6Z5me7q7N6bzE97gXuBBTD_EyRM-1p6ZpQVI3sM4pg2qrnJNVFOeBVLXnslnC9I8u-AZs8Mhyk_K918q09pd";

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
