/* eslint-disable @next/next/no-sync-scripts */
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { defaultMnemonic } from "../../core/defaultMnemonic";
import { ChapiPage } from "../../components/ChapiPage";
import { Stack, Button, Typography } from "@mui/material";
import { config } from '../../components/config';
import { v4 as uuidv4 } from "uuid";
import { getWalletContents } from "../../core/wallet";
declare var window: any;

const defaultVerifiableCredential = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/vc-revocation-list-2020/v1"
  ],
  "id": "urn:uuid:6d7919fa-916c-406d-8f9a-9afc327b91b3",
  "type": [
    "VerifiableCredential"
  ],
  "issuer": "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn",
  "issuanceDate": "2010-01-01T19:23:24Z",
  "credentialStatus": {
    "id": "https://api.did.actor/revocation-lists/1.json#0",
    "type": "RevocationList2020Status",
    "revocationListIndex": 0,
    "revocationListCredential": "https://api.did.actor/revocation-lists/1.json"
  },
  "credentialSubject": {
    "id": "did:example:123"
  },
  "proof": {
    "type": "Ed25519Signature2018",
    "created": "2022-09-20T17:00:06Z",
    "verificationMethod": "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn#z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn",
    "proofPurpose": "assertionMethod",
    "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..u8_1DoAPlbtmmQzH-cT57sYTBSngWS4WBtnsUtkQkJGEqoVhIgBrQguUBPEvVmKdfgF-BMjdxtfhmYAtpVQiCA"
  }
}

const verifiablePresentation = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/security/suites/jws-2020/v1",
  ],
  id: "urn:uuid:3a6d6697-e94c-4230-b18c-8c420c56f144",
  type: ["VerifiablePresentation"],
  holder: "did:key:zQ3shrnCZq3R7vLvDeWQFnxz5HMKqP9JoiMonzYJB4TGYnftL",
  verifiableCredential: [
    defaultVerifiableCredential,
  ]
};

const ChapiWallet: NextPage = (props: any) => {
  const [chapiState, setChapiState]: any = useState({});
  const [mnemonic] = React.useState(defaultMnemonic);
  const [walletContents, setWalletContents] = useState([])
  const queryVp: any =
  chapiState && chapiState.credentialRequestOptions
      ? chapiState.credentialRequestOptions.web.VerifiablePresentation
      : null;
  let query: any = null;
  let domain: any = config.env_config.domain;
  let challenge: any = uuidv4();
  if (queryVp) {
    query = (Array.isArray(queryVp.query) ? queryVp.query[0] : queryVp.query) as any;
    domain = queryVp.domain ? queryVp.domain : config.env_config.domain;
    challenge = queryVp.challenge ? queryVp.challenge : challenge;
  }
  useEffect(() => {
    setWalletContents(getWalletContents());
    (async () => {
      const { WebCredentialHandler } = window;
      const event = await WebCredentialHandler.receiveCredentialEvent();
      setChapiState(event);
    })();
  }, []);

  const handleSubmitPresenstation = async (credential: any) => {
    const signPresentationRequest = {
      presentation: { 
        ...verifiablePresentation,
        verifiableCredential: [credential]
      },
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
          <Typography>Select the credential you want to present</Typography>
          {walletContents.length > 0 &&
            <div>
              {walletContents.map((c: any, index: any) => <div key={index}>
              <Button variant={"contained"} onClick={() => handleSubmitPresenstation(c)}>Present The Credentail Below</Button>
              <pre>{JSON.stringify(c, null, 2)}</pre>
              </div>)}
            </div>
          }
          <Button variant={"contained"} onClick={() => handleSubmitPresenstation(defaultVerifiableCredential)}>
            Present The Credential Below
          </Button>
          <pre>{JSON.stringify(defaultVerifiableCredential, null, 2)}</pre>
        </Stack>
      </ChapiPage>
    </>
  );
};

export default ChapiWallet;
