import { resolvers } from "../core/resolvers";
import { getKeysForMnemonic } from "../core/getKeysForMnemonic";
import { getSuite } from "./getSuite";

export const getCredentialSuite = async ({
  credential,
  mnemonic,
  keyType,
  hdpath,
  proofType,
}: any) => {
  const keys = await getKeysForMnemonic(keyType, mnemonic, hdpath);
  if (credential.issuer.id) {
    credential.issuer.id = keys[0].controller;
  } else {
    credential.issuer = keys[0].controller;
  }

  //   we are exploiting the known structure of did:key here...
  const suite = await getSuite(keys[0], proofType);
  return suite;
};
