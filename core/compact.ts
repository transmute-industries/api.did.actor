import pako from "pako";
import base64url from "base64url";

export const compact = (content: any) => {
  return base64url.encode(pako.deflate(Buffer.from(JSON.stringify(content))));
};
