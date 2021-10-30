import { Ed25519VerificationKey2018 } from "@digitalbazaar/ed25519-verification-key-2018";
import { Ed25519Signature2018 } from "@digitalbazaar/ed25519-signature-2018";

export const getSuite = async (key?: any) => {
  return new Ed25519Signature2018({
    key: !key ? undefined : await Ed25519VerificationKey2018.from(key),
  });
};
