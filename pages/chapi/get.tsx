/* eslint-disable @next/next/no-sync-scripts */
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";

import { ChapiPage } from "../../components/ChapiPage";
import { Stack, Button, Typography } from "@mui/material";

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
  proof: {
    type: "JsonWebSignature2020",
    created: "2022-07-12T19:24:18Z",
    verificationMethod:
      "did:key:zQ3shrnCZq3R7vLvDeWQFnxz5HMKqP9JoiMonzYJB4TGYnftL#zQ3shrnCZq3R7vLvDeWQFnxz5HMKqP9JoiMonzYJB4TGYnftL",
    proofPurpose: "authentication",
    challenge: "3ae2e18d-6d4f-42b3-a8b6-60981eac11cb",
    jws: "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..DxTbBf0eMiSl-kRnqobMCc7ftJ_f6QKKdb4o23P4-ONiSRdHjFo9Zu3ZfVNivFt-iSfT6SYP2yZ-aqcx3T27eQ",
  },
};

const ChapiWallet: NextPage = (props: any) => {
  const [chapiState, setChapiState]: any = useState({});
  useEffect(() => {
    (async () => {
      const { WebCredentialHandler } = window;
      const event = await WebCredentialHandler.receiveCredentialEvent();
      setChapiState({ event });
    })();
  }, []);

  const handleSubmitPresenstation = async () => {
    chapiState.event.respondWith(
      new Promise((resolve) => {
        return resolve({
          dataType: "VerifiablePresentation",
          data: verifiablePresentation,
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
