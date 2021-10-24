import { resolvers } from "../core/resolvers";
import { getKeysForMnemonic } from "../core/getKeysForMnemonic";
import { getSuite } from "./getSuite";

export const getPresentationSuite = async ({ presentation, mnemonic }: any) => {
  const holder = presentation.holder.id || presentation.holder;
  const { didDocument } = await resolvers.ed25519(holder);
  const keys = await getKeysForMnemonic(mnemonic);
  if (didDocument.verificationMethod[0].id !== keys[0].id) {
    throw new Error("mnemonic is not for holder");
  }
  //   we are exploiting the known structure of did:key here...
  const suite = await getSuite(keys[0]);
  return suite;
};
