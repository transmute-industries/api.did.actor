/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack5: false,
  experimental: {
    outputFileTracing: true,
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
