import { resolvers } from "./resolvers";
export const getResolutionResult = async (did: string) => {
  let didDocument: any = {};
  let didDocumentMetadata: any = {};
  if (did.startsWith("did:key")) {
    ({ didDocument, didDocumentMetadata } = await resolvers.ed25519(did));
  }

  if (did.startsWith("did:web")) {
    didDocument = await resolvers["did:web"](did);
  }

  const didUrlComponents = did.split(":");
  return {
    didDocument,
    didResolutionMetadata: {
      didUrl: {
        did: did.split("#")[0],
        methodName: didUrlComponents[1],
        methodSpecificId: didUrlComponents[2],
      },
    },
    didDocumentMetadata,
  };
};
