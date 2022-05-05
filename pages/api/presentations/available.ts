// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "../../../components/config";
import { WithApiBearerAuthRequired } from "../../../components/withApiBearerAuthRequired";
import { v4 as uuidv4 } from "uuid";

type Query = any;

export default WithApiBearerAuthRequired(async function handler(
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
      // For demonstation purposes, these values are set from config
      // and from uuid that would be exchanged safely
      domain: config.env_config.domain,
      challenge: uuidv4(),
    };
    res.status(200).json(query);
  } catch (e) {
    res.status(500).json({ message: (e as any).message });
  }
});
