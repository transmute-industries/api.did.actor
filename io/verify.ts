export const DID_KEY_BIP44_COIN_TYPE = "0";

import pako from "pako";

const expand = (message: string) => {
  const expanded = pako.inflate(Buffer.from(message, "base64"));
  return JSON.parse(Buffer.from(expanded).toString());
};

import { verifyCredential } from "../vc-api/verifyCredential";
export const verify = async (message: string) => {
  const expandedMessage = expand(message);
  const format = "vc";
  const res = await verifyCredential({
    verifiableCredential: expandedMessage,
    format,
  });
  console.log(res);
  return {
    vc: expandedMessage,
    issuer: "did:example:123",
    // issuer: expandedMessage.issuer.id || expandedMessage.issuer,
  };
};
