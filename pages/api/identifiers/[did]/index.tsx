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
  try {
    const { did } = req.query;
    // console.info("/identifiers/ DID: ", did);
    const result = await getResolutionResult(did as string);
    // console.info("/identifiers/ result: ", result);
    const withEthereum = await resolutionWithEthereum(result);
    // console.info("/identifiers/ withEth: ", withEthereum);
    res.status(200).json(withEthereum);
  } catch (error) {
    //retry once
    console.warn("Likely timeout on resolution, attempting retry");
    const { did } = req.query;
    const result = await getResolutionResult(did as string);
    const withEthereum = await resolutionWithEthereum(result);
    res.status(200).json(withEthereum);
  }
}
