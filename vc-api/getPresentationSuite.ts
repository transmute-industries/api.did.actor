import { getKeysForMnemonic } from "../core/getKeysForMnemonic";
import { getSuite } from "./getSuite";

export const getPresentationSuite = async ({
  presentation,
  mnemonic,
  keyType,
  hdpath,
  proofType,
}: any) => {
  const keys = await getKeysForMnemonic(keyType, mnemonic, hdpath);

  if (presentation.holder && presentation.holder.id) {
    presentation.holder.id = keys[0].controller;
  } else {
    presentation.holder = keys[0].controller;
  }

  //   we are exploiting the known structure of did:key here...
  const suite = await getSuite(keys[0], proofType);
  return suite;
};
