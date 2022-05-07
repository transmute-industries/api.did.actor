// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { WithApiBearerAuthRequired } from "../../../components/withApiBearerAuthRequired";

type Query = any;
import { verifyPresentation } from "../../../vc-api";

export default WithApiBearerAuthRequired(
  async function handler(req: NextApiRequest, res: NextApiResponse<Query>) {
    try {
      const verifiablePresentation = req.body;
      // For demonstation purposes, these values are hard coded
      // Normally, these would be retrieved from a database
      // The current configuration is vulnerable to replay attacks.
      const options = {
        domain: req.body.proof.domain,
        challenge: req.body.proof.challenge,
      };
      const result = await verifyPresentation({
        verifiablePresentation,
        options,
        format: typeof verifiablePresentation === "string" ? "vp-jwt" : "vp",
      });
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json({ message: (e as any).message });
    }
  },
  ["submit:presentations", "write:presentations"]
);
