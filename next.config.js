/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack5: false,
  experimental: {
    outputFileTracing: true,
  },
  env_config: {
    auth_enabled: process.env.VC_AUTH_ENABLED || false,
    auth0_enabled: process.env.VC_AUTH0_ENABLED || false,
    auth_prefix: process.env.VC_AUTH_PREFIX || null,
    allow_unauthenticated: process.env.VC_ALLOW_UNAUTH || false,
    auth_skip: process.env.VC_AUTH_SKIP || [],
    domain: process.env.VC_AUTH_DOMAIN || "",
    audience: process.env.VC_AUTH_AUDIENCE || "",
    client: process.env.VC_AUTH_CLIENT || "",
    secret: process.env.VC_AUTH_SECRET || "",
  },
  headers: async () => {
    return [
      {
        // matching all API routes
        source: "/:path*",
        headers: [
          { key: "Accept", value: "application/json" },
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  rewrites: async () => {
    return [
      {
        source: "/:path*",
        destination: "/api/:path*",
        has: [
          {
            type: "header",
            key: "accept",
            value: `application/(?<didRepresentation>.*)`,
          },
          {
            type: "header",
            key: "accept",
            value: `application/json`,
          },
        ],
      },
    ];
  },
};
