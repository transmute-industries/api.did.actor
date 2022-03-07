import * as didKey from "@transmute/did-key.js";
import bs58 from "bs58";
import publicKeyToAddress from "ethereum-public-key-to-address";

export const resolutionWithEthereum = async (resolution: any) => {
  if (!resolution.didDocument.verificationMethod) {
    return resolution;
  }
  let addresses = await Promise.all(
    resolution.didDocument.verificationMethod.map(async (vm: any) => {
      if (vm.publicKeyJwk.crv === "secp256k1") {
        const kp = await didKey.secp256k1.Secp256k1KeyPair.from(vm);
        const fingerprint = await kp.fingerprint();
        const did = `did:key:${fingerprint}`;
        const { didDocument } = await didKey.resolve(did, {
          accept: "application/did+ld+json",
        });
        const publicKey = bs58.decode(
          didDocument.verificationMethod[0].publicKeyBase58
        );
        const address = publicKeyToAddress(Buffer.from(publicKey));
        return address;
      }
    })
  );
  addresses = addresses.filter(Boolean);
  if (addresses.length) {
    resolution.didDocumentMetadata.ethereum = {
      accounts: addresses,
    };
  }

  return resolution;
};
