// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { WithApiBearerAuthRequired } from "../../../components/withApiBearerAuthRequired";

import { verifyCredential } from "../../../vc-api";

type VerifiableCredential = any;

export default WithApiBearerAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifiableCredential>
) {
  try {
    const options = {
      ...req.body,
      format:
        typeof req.body.verifiableCredential === "string" ? "vc-jwt" : "vc",
    };
    const result = await verifyCredential(options);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: (e as any).message });
  }
});
