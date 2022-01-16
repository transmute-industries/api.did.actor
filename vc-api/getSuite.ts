import {
  Ed25519Signature2018,
  Ed25519VerificationKey2018,
  JsonWebKey,
  JsonWebSignature,
} from "./facade";

export const getSuite = async (
  key: any,
  proofType: string = "Ed25519Signature2018"
) => {
  if (proofType === "Ed25519Signature2018") {
    return new Ed25519Signature2018({
      key: await Ed25519VerificationKey2018.from(key),
    });
  }

  if (proofType === "JsonWebSignature2020") {
    return new JsonWebSignature({
      key: await JsonWebKey.from(key),
    });
  }
  throw new Error("Unsupported proof type: " + proofType);
};
