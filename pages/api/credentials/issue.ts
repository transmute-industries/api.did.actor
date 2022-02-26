// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { issueCredential } from "../../../vc-api";

type VerifiableCredential = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifiableCredential>
) {
  const { credential, options } = req.body;
  const { mnemonic, hdpath } = req.headers;
  const proofType =
    options.type === "jwt_vc"
      ? "JsonWebSignature2020"
      : options.type || "Ed25519Signature2018";
  const format = options.type === "jwt_vc" ? "vc-jwt" : "vc";
  try {
    const verifiableCredential = await issueCredential({
      credential,
      mnemonic,
      hdpath,
      proofType,
      format,
    });
    res.status(200).json(verifiableCredential);
  } catch (e) {
    res.status(500).json({ message: (e as any).message });
  }
}
