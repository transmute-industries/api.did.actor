import type { NextApiRequest, NextApiResponse } from "next";

import { getResolutionResult } from "../../../core/getResolutionResult";

import { resolutionWithEthereum } from "../../../core/resolutionWithEthereum";

type Data = {
  didDocument: any;
  didResolutionMetadata: any;
  didDocumentMetadata: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { did } = req.query;
  const result = await getResolutionResult(did as string);
  const withEthereum = await resolutionWithEthereum(result);
  res.status(200).json(withEthereum);
}
