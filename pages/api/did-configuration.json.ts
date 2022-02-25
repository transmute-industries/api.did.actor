import type { NextApiRequest, NextApiResponse } from "next";

type DIDConfiguration = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DIDConfiguration>
) {
  const configration = {};
  res.status(200).json(configration);
}
