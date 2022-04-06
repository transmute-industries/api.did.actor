/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack5: false,
  experimental: {
    outputFileTracing: true,
  },
  env_config: {
    config_external: process.env.CONFIG_EXTERNAL || false,
    config_external_path: process.env.CONFIG_EXTERNAL_PATH || "",
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
  theme_config: {
    logo: process.env.THEME_LOGO || 'transmute-white.svg',
    theme: process.env.THEME || 'dark',
    header_show: process.env.THEME_HEADER_SHOW || false,
    header_color: process.env.THEME_HEADER_COLOR || '#594aa8',
    font: process.env.THEME_FONT || 'Rajdhani',
    mono: process.env.THEME_MONO || 'Lato',
    bg: process.env.THEME_BG || 'rgb(51, 51, 51)',
    fg: process.env.THEME_FG || 'rgb(187, 187, 187)',
    primary: process.env.THEME_PRIMARY || '#FCB373',
    secondary: process.env.THEME_SECONDARY || '#ED8E85',
    accent: process.env.THEME_ACCENT || '#C37794',
    primary_d: process.env.THEME_PRIMARY_D || '#C3FCF1',
    secondary_d: process.env.THEME_SECONDARY_D || '#4C8077',
    accent_d: process.env.THEME_ACCENT_D || '#8A6992'
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
