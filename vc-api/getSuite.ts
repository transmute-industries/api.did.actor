import { Ed25519Signature2018, Ed25519VerificationKey2018 } from "./facade";
export const getSuite = async (key?: any) => {
  return new Ed25519Signature2018({
    key: !key ? undefined : await Ed25519VerificationKey2018.from(key),
  });
};
