/* eslint-disable @next/next/no-sync-scripts */
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { defaultMnemonic } from "../../core/defaultMnemonic";
import { ChapiPage } from "../../components/ChapiPage";
import { Stack, Button, Typography } from "@mui/material";
import { config } from '../../components/config';

export async function getServerSideProps(context: any) {
  var props = {
    //    server side props here.
  };

  return {
    props, // will be passed to the page component as props
  };
}

declare var window: any;

const verifiablePresentation = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/security/suites/jws-2020/v1",
  ],
  id: "urn:uuid:3a6d6697-e94c-4230-b18c-8c420c56f144",
  type: ["VerifiablePresentation"],
  holder: "did:key:zQ3shrnCZq3R7vLvDeWQFnxz5HMKqP9JoiMonzYJB4TGYnftL",
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
    },
  ]
};

const ChapiWallet: NextPage = (props: any) => {
  const [chapiState, setChapiState]: any = useState({});
  const [mnemonic] = React.useState(defaultMnemonic);
  const queryVp: any =
  chapiState && chapiState.credentialRequestOptions
      ? chapiState.credentialRequestOptions.web.VerifiablePresentation
      : null;
  let query: any = null;
  let domain: any = null;
  let challenge: any = null;
  if (queryVp) {
    query = (Array.isArray(queryVp.query) ? queryVp.query[0] : queryVp.query) as any;
    domain = queryVp.domain ? queryVp.domain : config.env_config.domain;
    challenge = queryVp.challenge ? queryVp.challenge : '12345';
  }
  useEffect(() => {
    (async () => {
      const { WebCredentialHandler } = window;
      const event = await WebCredentialHandler.receiveCredentialEvent();
      setChapiState(event);
    })();
  }, []);

  const handleSubmitPresenstation = async () => {
    const signPresentationRequest = {
      presentation: verifiablePresentation,
      options: {
        proofPurpose: 'authentication',
        domain: domain as string,
        challenge: challenge as string,
      },
    };
    const endpoint = "/api/presentations/prove";
    const response = await fetch(endpoint, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        hdpath: `m/44'/0'/0'/0/0`,
        mnemonic: mnemonic,
      },
      cache: "no-cache",
      body: JSON.stringify(signPresentationRequest),
    });
    const data = await response.json();
    chapiState.respondWith(
      new Promise((resolve) => {
        return resolve({
          dataType: "VerifiablePresentation",
          data: data,
        });
      })
    );
  };

  return (
    <>
      <Head>
        <title>{"CHAPI GET"}</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://unpkg.com/web-credential-handler@2.0.0/dist/web-credential-handler.min.js"></script>
      </Head>
      <ChapiPage>
        <Stack sx={{ mt: 8 }}>
          <Typography>TODO: Implement /present ui here.</Typography>
          <Button variant={"contained"} onClick={handleSubmitPresenstation}>
            Present Credentials
          </Button>
          <pre>{JSON.stringify(chapiState, null, 2)}</pre>
        </Stack>
      </ChapiPage>
    </>
  );
};

export default ChapiWallet;
