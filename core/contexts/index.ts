import credsv1 from "./credentials-v1.json";
import didsv1 from "./did-v1.json";

import jwsv1 from "./jws-v1.json";
import revv1 from "./rev-v1.json";
import ed25519v1 from "./ed25519-v1.json";
import x25519v1 from "./x25519-v1.json";
import secv2 from "./sec-v2.json";
import secv1 from "./sec-v1.json";

import tracev1 from "./trace-v1.json";
import didConfigv1 from "./did-config-v1.json";

export const contexts: any = {
  "https://www.w3.org/2018/credentials/v1": credsv1,
  "https://www.w3.org/ns/did/v1": didsv1,
  "https://w3id.org/security/suites/jws-2020/v1": jwsv1,
  "https://w3id.org/vc-revocation-list-2020/v1": revv1,
  "https://w3id.org/security/suites/ed25519-2018/v1": ed25519v1,
  "https://w3id.org/security/suites/x25519-2019/v1": x25519v1,

  "https://w3id.org/security/v2": secv2,
  "https://w3id.org/security/v1": secv1,

  "https://w3id.org/traceability/v1": tracev1,
  "https://identity.foundation/.well-known/contexts/did-configuration-v0.2.jsonld":
    didConfigv1,
};
