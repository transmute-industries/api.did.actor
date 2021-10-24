import type { NextPage } from "next";
import Head from "next/head";
import { AppPage } from "../components/app-page";
import React from "react";
import { CreateDidForm } from "../components/create-did-form";
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>did actor</title>
        <meta name="description" content="Decentralized identifiers api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppPage>
        <CreateDidForm />
      </AppPage>
    </>
  );
};

export default Home;
