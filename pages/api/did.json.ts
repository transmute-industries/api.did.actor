import type { NextApiRequest, NextApiResponse } from "next";
import { defaultHdPath, defaultMnemonic } from "../../core/defaultMnemonic";

import DIDWeb from "../../core/DIDWeb";
import { getKeysForMnemonic } from "../../core/getKeysForMnemonic";

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
  const keys = (<Array<any>>await getKeysForMnemonic("ed25519", defaultMnemonic, defaultHdPath))[0]

  const didDocument = {
    "@context": [
      "https://www.w3.org/ns/did/v1",
      { "@vocab": "https://www.w3.org/ns/did/#" },
    ],
    id: did,
    alsoKnownAs: [
      vcApiBaseURl,
      keys['controller'],
    ],
    assertionMethod: [
      keys['id'],
    ],
    authentication: [
      keys['id'],
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
