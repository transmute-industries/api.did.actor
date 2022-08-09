// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { provePresentation } from "../../../vc-api";
import { defaultMnemonic, defaultHdPath } from "../../../core/defaultMnemonic";
import { WithApiBearerAuthRequired } from "../../../components/withApiBearerAuthRequired";

type VerifiablePresentation = any;

export default WithApiBearerAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifiablePresentation>
) {
  const { presentation, options } = JSON.parse(req.body);
  const { mnemonic, hdpath } = req.headers;

  const format = options.type === "jwt_vp" ? "vp-jwt" : "vp";

  const proofType =
    format === "vp-jwt"
      ? "JsonWebSignature2020"
      : options.type || "Ed25519Signature2018";

  try {
    const verifiablePresentation = await provePresentation({
      presentation,
      options,
      mnemonic: mnemonic || defaultMnemonic,
      hdpath: hdpath || defaultHdPath,
      proofType,
      format,
    });
    res.status(201).json(verifiablePresentation);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: (e as any).message });
  }
});
