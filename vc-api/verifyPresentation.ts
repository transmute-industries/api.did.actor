import { getSuite } from "./getSuite";
import { documentLoader } from "../core/documentLoader";

import vc from "@digitalbazaar/vc";
import { checkStatus } from "vc-revocation-list";
export const verifyPresentation = async ({
  verifiablePresentation,
  options,
}: // format,
any) => {
  const suite = await getSuite();
  const result = await vc.verify({
    presentation: verifiablePresentation,
    domain: options.domain,
    challenge: options.challenge,
    suite,
    checkStatus,
    documentLoader,
  });
  return result;
};
