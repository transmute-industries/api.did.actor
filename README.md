## [did actor api](https://api.did.actor)

[![api.did.actor](https://github.com/transmute-industries/api.did.actor/actions/workflows/cd.yml/badge.svg)](https://github.com/transmute-industries/api.did.actor/actions/workflows/cd.yml)

🚧 Under development

This API is for testing interoperability regarding a few W3C TR and W3C CCG Work items.

There are a lot of security issues with the approach taken here, most of them are for the sake of exposing functionality for testing purposes.

This API should not be used outside of a testing / demonstration context.

## Testing

```
curl -s 'http://localhost:3000/identifiers/did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn' \
--header 'Accept: application/json' | jq
```

```
curl -s 'https://api.did.actor/identifiers/did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn' \
--header 'Accept: application/json' | jq
```

```
curl -s 'https://api.did.actor/identifiers/did:key:zQ3shQqJCnb5zs53zNWzVG7CSLhPsYasNbzZq3pvnKVPXRSqw' \
--header 'Accept: application/json' | jq
```

#### Standards

- [W3C Decentralized Identifiers](https://www.w3.org/TR/did-core/)
- [W3C Verifiable Credentials](https://www.w3.org/TR/vc-data-model/)
- [JSON Web Token (JWT)](https://datatracker.ietf.org/doc/html/rfc7519)
- [JSON Web Key (JWK)](https://datatracker.ietf.org/doc/html/rfc7517)
- [Bitcoin Improvement Protocol 39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [Bitcoin Improvement Protocol 44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)

#### Community Drafts

- [W3C CCG did:key method spec](https://github.com/w3c-ccg/did-method-key)
- [W3C CCG did:web method spec](https://github.com/w3c-ccg/did-method-web)
- [W3C CCG Verifiable Credentials API](https://github.com/w3c-ccg/vc-api)
- [W3C CCG Traceability Vocabulary](https://w3id.org/traceability)
- [W3C CCG Traceability Interoperability Profile](https://w3id.org/traceability/interoperability)

#### Powered By

- [Transmute](https://transmute.industries/)
- [Material UI](https://mui.com/)
- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)
