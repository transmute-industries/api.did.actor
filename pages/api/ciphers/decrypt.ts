// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type VerifiableCredential = any;
import { decryptWith } from "../../../io/decrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifiableCredential>
) {
  const { message } = req.body;
  const { mnemonic } = req.headers;
  const result = await decryptWith(message, mnemonic as any);

  try {
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: (e as any).message });
  }
}
