import { resolvers } from "./resolvers";

import { contexts } from "./contexts";

export const documentLoader = async (iri: string) => {
  if (iri) {
    if (contexts[iri]) {
      return { document: contexts[iri] };
    }
    if (iri.startsWith("did:key:z6M")) {
      const { didDocument }: any = await resolvers.ed25519(iri);

      if (iri === didDocument.id) {
        console.log(iri, didDocument);
        return { document: didDocument };
      }

      const verificationMethod = didDocument.verificationMethod.find(
        (vm: any) => {
          return vm.id === iri;
        }
      );

      console.log("hey!", JSON.stringify(verificationMethod, null, 2));

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
