import {
  Ed25519VerificationKey2018,
  Ed25519Signature2018,
} from "@transmute/ed25519-signature-2018";

export { Ed25519VerificationKey2018, Ed25519Signature2018 };
import { verifiable } from "@transmute/vc.js";
import { checkStatus } from "vc-revocation-list";

import { getCredentialSuite } from "../getCredentialSuite";
import { getPresentationSuite } from "../getPresentationSuite";
import { documentLoader } from "../../core/documentLoader";
import { getSuite } from "../getSuite";

export const DOCUMENT_LOADER_TYPE = "resolver";

export const issueCredential = async ({ credential, mnemonic }: any) => {
  const suite = await getCredentialSuite({ credential, mnemonic });
  const { items } = await verifiable.credential.create({
    credential,
    suite,
    documentLoader,
    format: ["vc"],
  });
  return items[0];
};

export const provePresentation = async ({
  presentation,
  options,
  mnemonic,
}: any) => {
  const suite = await getPresentationSuite({ presentation, mnemonic });
  const result = await verifiable.presentation.create({
    presentation,
    domain:
      options.domain === "" || options.domain === undefined
        ? undefined
        : options.domain,
    challenge: options.challenge,
    suite,
    format: ["vp"],
    documentLoader,
  });
  return result;
};

export const verifyCredential = async ({ verifiableCredential }: any) => {
  const suite = await getSuite();
  const verification = await verifiable.credential.verify({
    credential: verifiableCredential,
    suite,
    checkStatus,
    format: ["vc"],
    documentLoader,
  });
  return verification;
};

export const verifyPresentation = async ({
  verifiablePresentation,
  options,
}: any) => {
  const suite = await getSuite();
  const result = await verifiable.presentation.verify({
    presentation: verifiablePresentation,
    domain: options.domain,
    challenge: options.challenge,
    suite,
    checkStatus,
    format: ["vp"],
    documentLoader,
  } as any);
  return result;
};
