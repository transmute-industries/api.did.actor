// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { WithApiBearerAuthRequired } from "../../../components/withApiBearerAuthRequired";
import { issueCredential } from "../../../vc-api";
import { defaultMnemonic, defaultHdPath } from "../../../core/defaultMnemonic";

type VerifiableCredential = any;

export default WithApiBearerAuthRequired(async function handler(
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
      mnemonic: mnemonic || defaultMnemonic,
      hdpath: hdpath || defaultHdPath,
      proofType,
      format,
    });
    res.status(201).json(verifiableCredential);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: (e as any).message });
  }
});