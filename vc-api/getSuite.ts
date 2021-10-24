// import { JsonWebKey, JsonWebSignature } from "@transmute/json-web-signature";
import {
  Ed25519VerificationKey2018,
  Ed25519Signature2018,
} from "@transmute/ed25519-signature-2018";

export const getSuite = async (key?: any) => {
  return new Ed25519Signature2018({
    key: !key ? undefined : await Ed25519VerificationKey2018.from(key),
  });
};
