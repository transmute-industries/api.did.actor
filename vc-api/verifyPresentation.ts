import { getSuite } from "./getSuite";
import { documentLoader } from "../core/documentLoader";

import vc from "@digitalbazaar/vc";

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
    documentLoader,
  });
  return result;
};
