import pako from "pako";

export const expand = (message: string) => {
  const expanded = pako.inflate(Buffer.from(message, "base64"));
  return JSON.parse(Buffer.from(expanded).toString());
};
