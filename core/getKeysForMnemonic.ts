import * as bip39 from "bip39";
import * as hdkey from "hdkey";
import { generators } from "../core/generators";
export const DID_KEY_BIP44_COIN_TYPE = "0";
export const getKeysForMnemonic = async (
  keyType: string,
  mnemonic: string,
  hdpath = `m/44'/${DID_KEY_BIP44_COIN_TYPE}'/0'/0/0`
) => {
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const root = hdkey.fromMasterSeed(seed);
  const addrNode = root.derive(hdpath);
  const { keys } = await generators.didKey(keyType, addrNode._privateKey);
  return keys;
};
