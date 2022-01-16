import {
  Ed25519VerificationKey2018,
  Ed25519Signature2018,
} from "@transmute/ed25519-signature-2018";

export { Ed25519VerificationKey2018, Ed25519Signature2018 };

import { JsonWebSignature, JsonWebKey } from "@transmute/json-web-signature";
export { JsonWebSignature, JsonWebKey };

import { verifiable } from "@transmute/vc.js";
import { checkStatus } from "@transmute/vc-status-rl-2020";

import { getCredentialSuite } from "../getCredentialSuite";
import { getPresentationSuite } from "../getPresentationSuite";
import { documentLoader } from "../../core/documentLoader";

export const DOCUMENT_LOADER_TYPE = "resolver";

export const issueCredential = async ({
  credential,
  mnemonic,
  hdpath,
  proofType,
  format,
}: any) => {
  const suite = await getCredentialSuite({
    credential,
    mnemonic,
    hdpath,
    proofType,
  });

  if (
    proofType === "JsonWebSignature2020" &&
    !credential["@context"].includes(
      "https://w3id.org/security/suites/jws-2020/v1"
    )
  ) {
    credential["@context"].push("https://w3id.org/security/suites/jws-2020/v1");
  }
  const { items } = await verifiable.credential.create({
    credential,
    suite,
    documentLoader,
    format: [format],
  });
  return items[0];
};

export const provePresentation = async ({
  presentation,
  options,
  mnemonic,
  hdpath,
  proofType,
  format,
}: any) => {
  const suite = await getPresentationSuite({
    presentation,
    mnemonic,
    hdpath,
    proofType,
  });

  if (
    proofType === "JsonWebSignature2020" &&
    !presentation["@context"].includes(
      "https://w3id.org/security/suites/jws-2020/v1"
    )
  ) {
    presentation["@context"].push(
      "https://w3id.org/security/suites/jws-2020/v1"
    );
  }
  const { items } = await verifiable.presentation.create({
    presentation,
    domain:
      options.domain === "" || options.domain === undefined
        ? undefined
        : options.domain,
    challenge: options.challenge,
    suite,
    format: [format],
    documentLoader,
  });
  return items[0];
};

export const verifyCredential = async (
  { verifiableCredential }: any,
  format: any = "vc"
) => {
  let suite: any = [new Ed25519Signature2018(), new JsonWebSignature()];
  if (format === "vc-jwt") {
    suite = new JsonWebSignature();
  }
  const verification = await verifiable.credential.verify({
    credential: verifiableCredential,
    suite,
    checkStatus,
    format: [format],
    documentLoader,
  });
  return verification;
};

export const verifyPresentation = async (
  { verifiablePresentation, options }: any,
  format: any = "vp"
) => {
  let suite: any = [new Ed25519Signature2018(), new JsonWebSignature()];
  if (format === "vp-jwt") {
    suite = new JsonWebSignature();
  }
  const result = await verifiable.presentation.verify({
    presentation: verifiablePresentation,
    domain: options.domain,
    challenge: options.challenge,
    suite,
    checkStatus,
    format: [format],
    documentLoader,
  } as any);
  return result;
};
