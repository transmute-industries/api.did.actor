export const DID_KEY_BIP44_COIN_TYPE = "0";

import { verifyCredential } from "../vc-api/verifyCredential";
export const verify = async (verifiableCredential: any) => {
  const format = "vc";
  const res = await verifyCredential({
    verifiableCredential,
    format,
  });
  return {
    verified: res.verified,
    issuer: verifiableCredential.issuer.id || verifiableCredential.issuer,
    subject:
      verifiableCredential.credentialSubject.id ||
      verifiableCredential.credentialSubject,
  };
};
