import * as ed25519 from "@transmute/did-key-ed25519";
// import * as bls12381 from "@transmute/did-key-bls12381";
// import * as secp256k1 from "@transmute/did-key-secp256k1";

import axios from "axios";

import DIDWeb from "./DIDWeb";
export const resolvers = {
  ed25519: async (did: string) => {
    const res = await ed25519.resolve(did.split("#")[0], {
      accept: "application/did+ld+json",
    });
    return res;
  },
  "did:web": async (did: string) => {
    return DIDWeb.resolve(did);
  },
  http: async (url: string) => {
    const resp = await axios({
      method: "get",
      url,
      headers: {
        // Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    });
    return resp.data;
  },
};
