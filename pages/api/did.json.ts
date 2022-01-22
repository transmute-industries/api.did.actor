import type { NextApiRequest, NextApiResponse } from "next";

import DIDWeb from "../../core/DIDWeb";

type TraceabilityAPIDIDWebDocument = {
  "@context": Array<any>;
  id: string;
  alsoKnownAs: Array<string>;
  services: Array<{ id: string; type: string; serviceEndpoint: string }>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TraceabilityAPIDIDWebDocument>
) {
  const protocol = req.headers.host?.includes("localhost") ? "http" : "https";
  const endpoint = `${protocol}://${req.headers.host}/api/did.json`;
  const vcApiBaseURl = endpoint.replace("/did.json", "");
  const did = DIDWeb.convertEndpointToDid(endpoint);

  const didDocument = {
    "@context": [
      "https://www.w3.org/ns/did/v1",
      { "@vocab": "https://www.w3.org/ns/did/#" },
    ],
    id: did,
    alsoKnownAs: [
      vcApiBaseURl,
      "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn",
    ],
    assertionMethod: [
      "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn#z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn",
    ],
    authentication: [
      "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn#z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn",
    ],
    services: [
      {
        id: `${did}#traceability-api`,
        type: "TraceabilityAPI", // Todo: define this service type in the trace-vocab.
        serviceEndpoint: vcApiBaseURl,
      },
    ],
  };
  res.status(200).json(didDocument);
}
