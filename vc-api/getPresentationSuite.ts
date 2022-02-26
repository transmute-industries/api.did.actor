import { resolvers } from "../core/resolvers";
import { getKeysForMnemonic } from "../core/getKeysForMnemonic";
import { getSuite } from "./getSuite";

export const getPresentationSuite = async ({
  presentation,
  mnemonic,
  hdpath,
  proofType,
}: any) => {
  const holder = presentation.holder.id || presentation.holder;
  const { didDocument } = await resolvers.resolve(holder);
  const keys = await getKeysForMnemonic(mnemonic, hdpath);
  if (didDocument.verificationMethod[0].id !== keys[0].id) {
    throw new Error("mnemonic is not for holder");
  }
  //   we are exploiting the known structure of did:key here...
  const suite = await getSuite(keys[0], proofType);
  return suite;
};
