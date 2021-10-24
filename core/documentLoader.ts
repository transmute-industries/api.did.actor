import { resolvers } from "./resolvers";

import { contexts } from "./contexts";

export const documentLoader = async (iri: string) => {
  if (iri) {
    if (contexts[iri]) {
      return { document: contexts[iri] };
    }
    if (iri.startsWith("did:key:z6M")) {
      const { didDocument } = await resolvers.ed25519(iri);
      return { document: didDocument };
    }
  }

  const message = "Unsupported iri: " + iri;
  console.warn(message);
  throw new Error(message);
};
