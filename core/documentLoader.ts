import { resolvers } from "./resolvers";

import { contexts } from "./contexts";
import { documents } from "./documents";

export const documentLoader = async (iri: string) => {
  if (iri) {
    if (contexts[iri]) {
      return { document: contexts[iri] };
    }

    if (documents[iri]) {
      return { document: documents[iri] };
    }
    if (iri.startsWith("did:key:z6M")) {
      const { didDocument }: any = await resolvers.ed25519(iri);

      if (iri === didDocument.id) {
        return { document: didDocument };
      }

      const verificationMethod = didDocument.verificationMethod.find(
        (vm: any) => {
          return vm.id === iri;
        }
      );

      return {
        document: {
          "@context": didDocument["@context"],
          ...verificationMethod,
        },
      };
    }
  }

  const message = "Unsupported iri: " + iri;
  console.warn(message);
  throw new Error(message);
};
