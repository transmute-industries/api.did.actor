import axios from "axios";

const convertDidToEndpoint = (did: string) => {
  const regex = new RegExp(
    `did:web:(?<origin>[a-zA-Z0-9/.\\-_]+)(?<path>[a-zA-Z0-9/.:\\-_]*)`
  );
  const match: any = did.match(regex);
  if (!match) {
    throw new Error("DID is not a valid did:web");
  }
  if (match.groups.path) {
    return `https://${match.groups.origin}${match.groups.path.replace(
      /:/g,
      "/"
    )}/did.json`;
  }
  return `https://${match.groups.origin}/.well-known/did.json`;
};

const convertEndpointToDid = (endpoint: string): string => {
  const url = new URL(endpoint);
  const { pathname } = url;

  let { host } = url;
  if (host.includes(":")) {
    host = encodeURIComponent(host);
  }

  if (endpoint.includes(".well-known/did.json")) {
    return `did:web:${host}`;
  }
  return `did:web:${host}${pathname
    .replace(/\//g, ":")
    .replace(":did.json", "")}`;
};

const resolve = async (did: string) => {
  const url = convertDidToEndpoint(did);
  const resp = await axios({
    method: "get",
    url,
    headers: {
      // Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });
  return resp.data;
};

const DIDWeb = {
  resolve,
  convertDidToEndpoint,
  convertEndpointToDid,
};

export default DIDWeb;
