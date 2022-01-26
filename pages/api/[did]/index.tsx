import type { NextApiRequest, NextApiResponse } from "next";

import { getResolutionResult } from "../../../core/getResolutionResult";

import cors from "../../../middleware/cors";

type Data = {
  didDocument: any;
  didResolutionMetadata: any;
  didDocumentMetadata: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await cors(req, res);
  const { did } = req.query;
  const result = await getResolutionResult(did as string);
  res.status(200).json(result);
}
