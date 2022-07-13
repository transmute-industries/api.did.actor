/* eslint-disable @next/next/no-sync-scripts */
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";

import { AppPage } from "../../components/app-page";
import { Stack, Button } from "@mui/material";
declare var window: any;
export async function getServerSideProps(context: any) {
  var props = {
    //    server side props here.
  };

  return {
    props, // will be passed to the page component as props
  };
}

const testCredential = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/security/suites/jws-2020/v1",
  ],
  id: "urn:uuid:5901e1f6-be78-4464-95b2-cbd8a80a1928",
  type: ["VerifiableCredential"],
  issuer: "did:key:zQ3shrnCZq3R7vLvDeWQFnxz5HMKqP9JoiMonzYJB4TGYnftL",
  issuanceDate: "2010-01-01T19:23:24Z",
  credentialSubject: { id: "did:example:123" },
  proof: {
    type: "JsonWebSignature2020",
    created: "2022-07-12T20:09:26Z",
    verificationMethod:
      "did:key:zQ3shrnCZq3R7vLvDeWQFnxz5HMKqP9JoiMonzYJB4TGYnftL#zQ3shrnCZq3R7vLvDeWQFnxz5HMKqP9JoiMonzYJB4TGYnftL",
    proofPurpose: "assertionMethod",
    jws: "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..lqpGe1FUiQPs9OZca3L5QirbcgB2q0Xa4o2T38k1z_5t-oqW0M54RmTTaKDrB8-H-HnILWkFN9tqMK6c7WKPdQ",
  },
};

const ChapiWallet: NextPage = (props: any) => {
  const [isWalletInitialized, setWalletIsInitialized] = useState(false);
  const [isPresentationReceived, setIsPresentationReceived] = useState(false);
  const [isCredentialReceived, setIsCredentialReceived] = useState(false);

  const handleChapiWalletInit = async () => {
    if (!window.__hasWallet) {
      console.log("invoke chapi wallet init");
      window.__hasWallet = true;
      const polyfill = await window.credentialHandlerPolyfill.load();
      const { CredentialManager } = polyfill;
      const result = await CredentialManager.requestPermission();
      if (result !== "granted") {
        throw new Error("Permission denied.");
      } else {
        setWalletIsInitialized(true);
      }
    }
  };

  const handleReceivePresentationFromChapi = async () => {
    console.log("invoke chapi get");
    const credentialQuery: any = {
      web: {
        VerifiablePresentation: {
          query: [
            {
              type: "QueryByExample",
              credentialQuery: {
                reason:
                  "Please present a University Degree Credential for Jane Doe.",
                example: {
                  "@context": [
                    "https://w3id.org/credentials/v1",
                    "https://www.w3.org/2018/credentials/examples/v1",
                  ],
                  type: ["UniversityDegreeCredential"],
                  credentialSubject: {
                    id: "did:example:ebfeb1f712ebc6f1c276e12ec21",
                  },
                },
              },
            },
          ],
        },
        recommendedHandlerOrigins: ["https://api.did.actor/chapi"],
      },
    };
    const chapiVerifiablePresentationResponse = await navigator.credentials.get(
      credentialQuery
    );
    if (!chapiVerifiablePresentationResponse) {
      console.log("no credentials received");
    } else {
      console.log(chapiVerifiablePresentationResponse);
      setIsPresentationReceived(true);
    }
  };

  const handleChapiSet = async () => {
    console.log("invoke chapi set");
    const polyfill = await window.credentialHandlerPolyfill.load();
    const { WebCredential } = polyfill;
    const credentialType = "VerifiablePresentation";
    const webCredentialWrapper = new WebCredential(
      credentialType,
      testCredential,
      {
        recommendedHandlerOrigins: ["https://api.did.actor/chapi"],
      }
    );
    const result = await navigator.credentials.store(webCredentialWrapper);
    if (!result) {
      console.log("no credentials stored");
    } else {
      console.log(result);
      setIsCredentialReceived(true);
    }
  };

  useEffect(() => {
    handleChapiWalletInit();
  }, []);

  return (
    <>
      <Head>
        <title>{"CHAPI"}</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://unpkg.com/credential-handler-polyfill@2.1.0/dist/credential-handler-polyfill.min.js"></script>
      </Head>
      <AppPage>
        <Stack sx={{ mt: 8 }} spacing={2}>
          <Button
            variant={"contained"}
            onClick={handleChapiWalletInit}
            disabled={isWalletInitialized}
          >
            Initialize Wallet
          </Button>

          <Button
            variant={"contained"}
            onClick={handleReceivePresentationFromChapi}
            disabled={isPresentationReceived}
          >
            Import Credentials from Wallet
          </Button>

          <Button
            variant={"contained"}
            onClick={handleChapiSet}
            disabled={isCredentialReceived}
          >
            Export Credential to Wallet
          </Button>
        </Stack>
      </AppPage>
    </>
  );
};

export default ChapiWallet;
