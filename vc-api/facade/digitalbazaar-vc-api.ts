// Digital Bazaar Suite does not work on vercel.
// https://github.com/w3c-ccg/security-vocab/issues/122
import { Ed25519VerificationKey2018 } from "@digitalbazaar/ed25519-verification-key-2018";
import { Ed25519Signature2018 } from "@digitalbazaar/ed25519-signature-2018";
import vc from "@digitalbazaar/vc";
import { checkStatus } from "vc-revocation-list";
import { JsonWebSignature } from "@transmute/json-web-signature";

import { getCredentialSuite } from "../getCredentialSuite";
import { getPresentationSuite } from "../getPresentationSuite";
import { documentLoader } from "../../core/documentLoader";
import { getSuite } from "../getSuite";

export const DOCUMENT_LOADER_TYPE = "dereferencer";

export { Ed25519VerificationKey2018, Ed25519Signature2018 };

export const suite = [new Ed25519Signature2018(), new JsonWebSignature()];

export const issueCredential = async ({ credential, mnemonic }: any) => {
  const suite = await getCredentialSuite({ credential, mnemonic });
  const signedVC = await vc.issue({ credential, suite, documentLoader });
  return signedVC;
};

export const provePresentation = async ({
  presentation,
  options,
  mnemonic,
}: any) => {
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

export const verifyCredential = async ({ verifiableCredential }: any) => {
  const verification = await vc.verifyCredential({
    credential: verifiableCredential,
    suite,
    checkStatus,
    documentLoader,
  });
  return verification;
};

export const verifyPresentation = async ({
  verifiablePresentation,
  options,
}: any) => {
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
