import { getCredentialSuite } from "./getCredentialSuite";
import { documentLoader } from "../core/documentLoader";

import vc from "@digitalbazaar/vc";

export const issueCredential = async ({
  credential,
  mnemonic,
  format,
}: any) => {
  const suite = await getCredentialSuite({ credential, mnemonic });
  const signedVC = await vc.issue({ credential, suite, documentLoader });
  return signedVC;
};
