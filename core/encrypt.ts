import { resolvers } from "../core/resolvers";
import * as jose from "jose";

const alg = "ECDH-ES+A256KW";

// this won't run client side.
export const encryptTo = async (recipient: string, document: any) => {
  const { didDocument } = await resolvers.resolve(recipient);
  const keyAgreementKey = didDocument.verificationMethod[1];
  const publicKeyJwk = {
    ...keyAgreementKey.publicKeyJwk,
    alg,
  };

  const jwe = await new jose.CompactEncrypt(
    new TextEncoder().encode(JSON.stringify(document))
  )
    .setProtectedHeader({ kid: keyAgreementKey.id, alg, enc: "A256GCM" })
    .encrypt(await jose.importJWK(publicKeyJwk));
  return jwe;
};
