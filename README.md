## [did actor api](https://api.did.actor)

[![CI](https://github.com/transmute-industries/api.did.actor/actions/workflows/ci.yml/badge.svg)](https://github.com/transmute-industries/api.did.actor/actions/workflows/ci.yml) [![api.did.actor](https://github.com/transmute-industries/api.did.actor/actions/workflows/cd.yml/badge.svg)](https://github.com/transmute-industries/api.did.actor/actions/workflows/cd.yml)

### What is did:actor API?

This API is for testing interoperability regarding a related W3C TR and W3C CCG Work items. Specifically [W3C CCG Traceability Interoperability Profile](https://w3id.org/traceability/interoperability) which uses the following standards:

- [W3C Decentralized Identifiers](https://www.w3.org/TR/did-core/)
- [W3C Verifiable Credentials](https://www.w3.org/TR/vc-data-model/)
- [W3C CCG Verifiable Credentials API](https://github.com/w3c-ccg/vc-api)

### 🚨🚧🚧🚧🚨 WARNING 🚨🚧🚧🚧🚧🚨

This repository has been built for **testing purposes**.
As such **security precautions** have been intentionally **left out** for illustrative puposes.
The implementation of the VC-API used for `did:actor` **should not** be used outside of a testing / demonstration context.

## Development

```
git clone https://github.com/transmute-industries/api.did.actor.git
cd api.did.actor
npm i
npm run dev
```

Resolve a [did:key](https://github.com/transmute-industries/did-key.js)

```
curl -s 'http://localhost:3000/identifiers/did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn' \
--header 'Accept: application/json' | jq
```

Should respond with

```
{
  "didDocument": {
    "@context": [
      "https://www.w3.org/ns/did/v1",
      "https://w3id.org/security/suites/jws-2020/v1"
    ],
    "id": "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn",
    "verificationMethod": [
      {
        "id": "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn#z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn",
        "type": "JsonWebKey2020",
        "controller": "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn",
        "publicKeyJwk": {
          "kty": "OKP",
          "crv": "Ed25519",
          "x": "0-e2i2_Ua1S5HbTYnVB0lj2Z2ytXu2-tYmDFf8f5NjU"
        }
      },
      {
        "id": "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn#z6LSt8Cke1XG6vthTpdek9xx6a5NKz8gEuYPQHJPhRjfREAC",
        "type": "JsonWebKey2020",
        "controller": "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn",
        "publicKeyJwk": {
          "kty": "OKP",
          "crv": "X25519",
          "x": "9GXjPGGvmRq9F6Ng5dQQ_s31mfhxrcNZxRGONrmH30k"
        }
      }
    ],
    "assertionMethod": [
      "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn#z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn"
    ],
    "authentication": [
      "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn#z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn"
    ],
    "capabilityInvocation": [
      "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn#z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn"
    ],
    "capabilityDelegation": [
      "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn#z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn"
    ],
    "keyAgreement": [
      "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn#z6LSt8Cke1XG6vthTpdek9xx6a5NKz8gEuYPQHJPhRjfREAC"
    ]
  },
  "didResolutionMetadata": {
    "didUrl": {
      "did": "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn",
      "methodName": "key",
      "methodSpecificId": "z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn"
    }
  },
  "didDocumentMetadata": {}
}
```

## Deployment

This example API has been built with [Next.js](https://nextjs.org/) and [Material UI](https://mui.com/).
This repository is set up for deployment on either [Vercel](https://vercel.com/) or as a [Docker](https://docker.com/) container.

#### Vercel

For deployment on Vercel, the app deploys as a normal nextjs app and can be deployed by following the [Vercel documentation](https://nextjs.org/docs/deployment)

#### Docker Container

To build a container, the following steps should be taken:

```bash
$ docker build -t [TAG_NAME]:[VERSION] .
```

## Environment

There are a number of configuration options that are set from environment variables to simplify deployment
in both docker. These options allow changing branding, enabling features, and enabling authenticaion.

At the moment, only [Auth0](https://auth0.com/) is supported for authentication.

The configuration is read into the app in `./components/config.tsx`. Required or variables that would normally be set are detailed below, though additional config options are covered in the component to allow for future developemnt or 'untested' functionality.

Config values listed below are in the format of `application variable name` | `enviornment variable name`

### did_config

- `mnemonic` | `DID_MNEMONIC`: sets the mnemonic used to derive key material - ideally this should be sourced from a secure location and should be treated as a private key

### env_config

- `domain`| `VC_DOMAIN`: what domain should be used for did:web and others, e.g. 'api.did.actor'
- `auth_enabled`| `VC_AUTH_ENABLED`: is authentication enabled - if so, normal Auth0 environment variables should also be set [per this example](https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/)

### theme_config

- `title` | `THEME_TITLE`: main application title to use
- `logo` | `THEME_LOGO`: main logo to use
- `logo_dark` | `THEME_LOGO_DARK`: logo to use on dark backgorunds
- `theme` | `THEME`: general theme to use, e.g. 'dark' or 'light'
- `header_show` | `THEME_HEADER_SHOW`: show header or not on api doc pages
- `header_color` | `THEME_HEADER_COLOR`: Header color
- `font` | `THEME_FONT`: main font name from [Google Fonts](https://fonts.google.com/)
- `mono` | `THEME_MONO`: mono font name from [Google Fonts](https://fonts.google.com/)
- `bg` | `THEME_BG`: Primary Background color
- `bg_nav` | `THEME_BG_NAV`: Nav element backgroun color
- `fg` | `THEME_FG`: Foreground/Text color
- `primary` | `THEME_PRIMARY`: Primary color
- `secondary` | `THEME_SECONDARY`: Secondary color
- `accent` | `THEME_ACCENT`: Accent color
- `footer` | `THEME_FOOTER`: What footer to use on pages that have it present

### storage

- `enabled` | `VC_STORAGE_ENABLED`: Is a storage backend enabled or not?
- `driver` | `VC_STORAGE_DRIVER`: what driver to use for storage?
- `connection_string` | `VC_STORAGE_CONNECTION_STRING`: if a connection string is required for the storage driver, what is it?

### Static Resources / Resource Overrides

The contents of the folders prefixed `./local_*` will be coppied over to the docker container on build.

This is especially useful for static resources in the case of `./local_public`

## License

[Apache-2.0](./LICENSE) © Transmute Industries Inc. with contributions from [mesur.io](https://mesur.io/)
