// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Query = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Query>
) {
  try {
    const query = {
      query: [
        {
          type: "QueryByExample",
          credentialQuery: {
            example: {
              "@context": ["https://www.w3.org/2018/credentials/v1"],
              type: ["VerifiableCredential"],
            },
          },
        },
      ],
      // For demonstation purposes, these values are hard coded
      // Normally, these would be retrieved from a database
      // The current configuration is vulnerable to replay attacks.
      domain: "api.did.actor",
      challenge: "replay-vulnerable-3182bdea-63d9-11ea-b6de-3b7c1404d57f",
    };
    res.status(200).json(query);
  } catch (e) {
    res.status(500).json({ message: (e as any).message });
  }
}
