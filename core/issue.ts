import { issueCredential } from "../vc-api";
import { v4 as uuidv4 } from "uuid";
import { compact } from "./compact";

export const issueTo = async (
  didDocument: any,
  document: any,
  mnemonic: string
) => {
  const credential = {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    id: "urn:uuid:" + uuidv4(),
    type: ["VerifiableCredential"],
    issuer: { id: didDocument.id },
    issuanceDate: "2010-01-01T19:23:24Z",
    credentialSubject: { id: document.subject },
  };

  const format = "vc";
  const vc = await issueCredential({ credential, mnemonic, format });
  if (format === "vc") {
    return compact(vc);
  }
  return vc;
};
