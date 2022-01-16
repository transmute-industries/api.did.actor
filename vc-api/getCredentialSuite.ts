import { resolvers } from "../core/resolvers";
import { getKeysForMnemonic } from "../core/getKeysForMnemonic";
import { getSuite } from "./getSuite";

export const getCredentialSuite = async ({
  credential,
  mnemonic,
  hdpath,
}: any) => {
  const issuer = credential.issuer.id || credential.issuer;
  const { didDocument } = await resolvers.ed25519(issuer);
  const keys = await getKeysForMnemonic(mnemonic, hdpath);

  if (didDocument.verificationMethod[0].id !== keys[0].id) {
    throw new Error("mnemonic is not for issuer");
  }
  //   we are exploiting the known structure of did:key here...
  const suite = await getSuite(keys[0]);
  return suite;
};
