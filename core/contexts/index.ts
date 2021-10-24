import credsv1 from "./credentials-v1.json";
import didsv1 from "./did-v1.json";

import jwsv1 from "./jws-v1.json";

export const contexts: any = {
  "https://www.w3.org/2018/credentials/v1": credsv1,
  "https://www.w3.org/ns/did/v1": didsv1,
  "https://w3id.org/security/suites/jws-2020/v1": jwsv1,
};
