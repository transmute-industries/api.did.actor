import { resolvers } from "./resolvers";
export const getResolutionResult = async (did: string) => {
  const { didDocument, didDocumentMetadata } = await resolvers.ed25519(did);
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
