import type { NextApiRequest, NextApiResponse } from "next";

import { getResolutionResult } from "../../../../core/getResolutionResult";

import { resolutionWithEthereum } from "../../../../core/resolutionWithEthereum";

type Data = {
  didDocument: any;
  didResolutionMetadata: any;
  didDocumentMetadata: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    const { did } = req.query;
    console.log("/identifiers/ DID: ", did);
    const result = await getResolutionResult(did as string);
    console.log("/identifiers/ result: ", result);
    const withEthereum = await resolutionWithEthereum(result);
    console.log("/identifiers/ withEth: ", withEthereum);
    res.status(200).json(withEthereum);
  } else {
    res.status(405).json({ "error": "method not allowed" });
  }
}
