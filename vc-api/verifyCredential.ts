import { getSuite } from "./getSuite";
import { documentLoader } from "../core/documentLoader";
import vc from "@digitalbazaar/vc";
import { checkStatus } from "vc-revocation-list";
export const verifyCredential = async ({
  verifiableCredential,
}: // format,
any) => {
  const suite = await getSuite();
  const verification = await vc.verifyCredential({
    credential: verifiableCredential,
    suite,
    checkStatus,
    documentLoader,
  });
  return verification;
};
