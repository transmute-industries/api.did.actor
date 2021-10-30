import { getSuite } from "./getSuite";
import { documentLoader } from "../core/documentLoader";
import vc from "@digitalbazaar/vc";

export const verifyCredential = async ({
  verifiableCredential,
}: // format,
any) => {
  const suite = await getSuite();
  const verification = await vc.verifyCredential({
    credential: verifiableCredential,
    suite,
    documentLoader,
  });
  return verification;
};
