import { issueCredential } from "../vc-api/issueCredential";

import base64url from "base64url";

import pako from "pako";

const compact = (content: any) => {
  return base64url.encode(pako.deflate(Buffer.from(JSON.stringify(content))));
};

export const issueTo = async (
  didDocument: any,
  document: any,
  mnemonic: string
) => {
  const credential = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://w3id.org/security/suites/jws-2020/v1",
    ],
    id: "urn:uuid:07aa969e-b40d-4c1b-ab46-ded252003ded",
    type: ["VerifiableCredential"],
    issuer: { id: didDocument.id },
    issuanceDate: "2010-01-01T19:73:24Z",
    credentialSubject: { id: document.subject },
  };

  const format = "vc";
  const vc = await issueCredential({ credential, mnemonic, format });
  if (format === "vc") {
    return compact(vc);
  }
  return vc;
};
