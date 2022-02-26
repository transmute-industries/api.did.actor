import { X25519KeyPair } from "@transmute/x25519-key-pair";

import { JWE } from "@transmute/jose-ld";

import { compact } from "./compact";
import { resolvers } from "../core/resolvers";
export const encryptTo = async (recipient: string, document: any) => {
  const { didDocument } = await resolvers.resolve(recipient);
  const keyAgreementKey = didDocument.verificationMethod[1];
  const cipher = new JWE.Cipher(X25519KeyPair);
  const recipients = [
    {
      header: {
        kid: keyAgreementKey.id,
        alg: "ECDH-ES+A256KW",
      },
    },
  ];
  const jwe = await cipher.encryptObject({
    obj: document,
    recipients,
    publicKeyResolver: async (id: string) => {
      if (id === keyAgreementKey.id) {
        return keyAgreementKey;
      }
      throw new Error(
        "publicKeyResolver does not suppport IRI " + JSON.stringify(id)
      );
    },
  });
  return compact(jwe);
};
