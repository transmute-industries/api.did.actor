// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Query = any;
import { verifyPresentation } from "../../../vc-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Query>
) {
  try {
    const result = await verifyPresentation({
      verifiablePresentation: req.body,
      options: {
        // For demonstation purposes, these values are hard coded
        // Normally, these would be retrieved from a database
        // The current configuration is vulnerable to replay attacks.
        domain: req.body.proof.domain,
        challenge: req.body.proof.challenge,
      },
      format: ["vp"],
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: (e as any).message });
  }
}
