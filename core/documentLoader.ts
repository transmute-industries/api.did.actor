import { resolvers } from "./resolvers";

import { contexts } from "./contexts";
import { documents } from "./documents";

import { DOCUMENT_LOADER_TYPE } from "../vc-api";

export const documentLoader = async (iri: string) => {
  if (iri) {
    if (contexts[iri]) {
      return { document: contexts[iri] };
    }

    if (documents[iri]) {
      return { document: documents[iri] };
    }

    if (iri.startsWith("did:")) {
      const { didDocument }: any = await resolvers.resolve(iri);

      if (DOCUMENT_LOADER_TYPE === "resolver") {
        return { document: didDocument };
      }

      if (DOCUMENT_LOADER_TYPE === "dereferencer") {
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
  }

  if (iri.startsWith("http")) {
    const document: any = await resolvers.http(iri);
    return { document };
  }

  const message = "Unsupported iri: " + iri;
  console.warn(message);
  throw new Error(message);
};
