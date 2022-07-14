declare module "hdkey";
declare module "bs58";
declare module "pako";
declare module "cors";
declare module "uuid";
declare module "vc-revocation-list";

declare module "@digitalbazaar/vc";
declare module "@digitalbazaar/ed25519-verification-key-2018";
declare module "@digitalbazaar/ed25519-signature-2018";

declare module "ethereum-public-key-to-address";

declare module "credential-handler-polyfill";

declare namespace JSX {
  interface IntrinsicElements {
    "rapi-doc": any;
  }
}

declare var window: any;
