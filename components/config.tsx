const font = process.env.THEME_FONT || "Rajdhani";
const font_mono = process.env.THEME_MONO || "Lato";
// this is not a component....
export const config = {
  did_config: {
    mnemonic:
      process.env.DID_MNEMONIC ||
      "sell antenna drama rule twenty cement mad deliver you push derive hybrid",
    aka:
      process.env.DID_AKA ||
      "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn",
    did_key:
      process.env.DID_KEY ||
      "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn#z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn",
    did_key_priv: process.env.DID_KEY_PRIV || "",
  },
  env_config: {
    playground: process.env.VC_PLAYGROUND || true,
    domain: process.env.VC_DOMAIN || "api.did.actor",
    config_external: process.env.CONFIG_EXTERNAL || false,
    config_external_path: process.env.CONFIG_EXTERNAL_PATH || "",
    auth_enabled: process.env.VC_AUTH_ENABLED || false,
    auth0_enabled: process.env.VC_AUTH0_ENABLED || false,
    auth_prefix: process.env.VC_AUTH_PREFIX || null,
    allow_unauthenticated: process.env.VC_ALLOW_UNAUTH || false,
    auth_skip: process.env.VC_AUTH_SKIP || [],
    auth_domain: process.env.VC_AUTH_DOMAIN || "",
    auth_audience: process.env.VC_AUTH_AUDIENCE || "",
    auth_client: process.env.VC_AUTH_CLIENT || "",
    auth_secret: process.env.VC_AUTH_SECRET || "",
  },
  theme_config: {
    favicon_path: process.env.THEME_FAVICON_PATH || "favicon.ico",
    title: process.env.THEME_TITLE || "api.did.actor",
    logo: process.env.THEME_LOGO || "lockup-i.png",
    logo_dark: process.env.THEME_LOGO_DARK || "did_actor_logo.svg",
    theme: process.env.THEME || "dark",
    header_show: process.env.THEME_HEADER_SHOW || false,
    header_color: process.env.THEME_HEADER_COLOR || "#00e5ff",
    font,
    mono: font_mono,
    bg: process.env.THEME_BG || "rgb(51, 51, 51)",
    bg_nav: process.env.THEME_BG_NAV || "rgb(51, 51, 51)",
    fg: process.env.THEME_FG || "rgb(187, 187, 187)",
    primary: process.env.THEME_PRIMARY || "#FFF",
    secondary: process.env.THEME_SECONDARY || "#FFA726",
    accent: process.env.THEME_ACCENT || "#C37794",
    primary_d: process.env.THEME_PRIMARY_D || "#C3FCF1",
    secondary_d: process.env.THEME_SECONDARY_D || "#4C8077",
    accent_d: process.env.THEME_ACCENT_D || "#8A6992",
    footer:
      process.env.THEME_FOOTER ||
      "© 2022 Transmute Industries, Inc. All rights reserved.",
    font_link:
      "https://fonts.googleapis.com/css2?family=" +
      font +
      ":wght@500&display=swap",
    font_link_mono:
      "https://fonts.googleapis.com/css2?family=" +
      font_mono +
      ":wght@400&display=swap",
  },
  storage: {
    enabled: process.env.VC_STORAGE_ENABLED || false,
    driver: process.env.VC_STORAGE_DRIVER || "local-storage",
    connection_string: process.env.VC_STORAGE_CONNECTION_STRING || "",
  },
};
