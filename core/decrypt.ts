import { generators } from "../core/generators";
import * as bip39 from "bip39";
import * as hdkey from "hdkey";
export const DID_KEY_BIP44_COIN_TYPE = "0";

import * as jose from "jose";

const alg = "ECDH-ES+A256KW";

export const getRecipient = (message: string) => {
  const decoded = Buffer.from(message.split(".")[0], "base64").toString();
  const parsed = JSON.parse(decoded);
  return {
    id: parsed.kid,
    controller: parsed.kid.split("#")[0],
  };
};

export const decryptWith = async (
  message: string,
  mnemonic: string,
  hdpath: string = `m/44'/${DID_KEY_BIP44_COIN_TYPE}'/0'/0/0`
) => {
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const root = hdkey.fromMasterSeed(seed);
  const addrNode = root.derive(hdpath);
  const { keys } = await generators.didKey("ed25519", addrNode._privateKey, {
    accept: "application/did+json",
  });
  const keyAgreementKey = keys[1];
  const privateKeyJwk = {
    ...keyAgreementKey.privateKeyJwk,
    alg,
  };
  const privateKey = await jose.importJWK(privateKeyJwk);
  const { plaintext } = await jose.compactDecrypt(message, privateKey);
  return new TextDecoder().decode(plaintext);
};
