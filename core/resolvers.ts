import * as didKey from "@transmute/did-key.js";
import axios from "axios";
import DIDWeb from "./DIDWeb";

export const resolvers = {
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
  resolve: async (did: string) => {
    if (did.startsWith("did:key")) {
      const { didDocument } = await didKey.resolve(did, {
        accept: "application/did+json",
      });
      return { didDocument };
    }
    if (did.startsWith("did:web")) {
      const didDocument = await DIDWeb.resolve(did);
      return { didDocument };
    }
  },
};
