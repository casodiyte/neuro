// URL canónica del sitio. Netlify expone `URL` (dominio principal) en build;
// para previews o local se sobreescribe con NEXT_PUBLIC_SITE_URL.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://neurohce.netlify.app";
