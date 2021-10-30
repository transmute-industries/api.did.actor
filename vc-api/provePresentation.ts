// import { verifiable } from "@transmute/vc.js";
import { getPresentationSuite } from "./getPresentationSuite";
import { documentLoader } from "../core/documentLoader";

import vc from "@digitalbazaar/vc";

export const provePresentation = async ({
  presentation,
  options,
  mnemonic,
}: // format,
any) => {
  const suite = await getPresentationSuite({ presentation, mnemonic });
  const result = await vc.signPresentation({
    presentation,
    domain:
      options.domain === "" || options.domain === undefined
        ? undefined
        : options.domain,
    challenge: options.challenge,
    suite,
    documentLoader,
  });
  return result;
};
