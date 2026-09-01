import type { Metadata } from "next";
import { Figtree, Noto_Sans } from "next/font/google";
import { SITE_URL } from "./lib/site";
import { NeuralCanvas } from "./components/NeuralCanvas";
import { MotionOrchestrator } from "./components/MotionOrchestrator";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { GooeyFilter } from "./components/GooeyFilter";
import "./globals.css";

const figtree = Figtree({ variable: "--font-display", subsets: ["latin"] });
const notoSans = Noto_Sans({ variable: "--font-body", subsets: ["latin"] });

const title = "Neurosonología CDMX 2026";
const description = "Programa integral de mentoría y certificación en neurosonología y hemodinamia cerebral por Doppler transcraneal.";

// `metadataBase` estático a propósito: derivarlo de `headers()` sacaba a TODAS
// las rutas del prerender y forzaba SSR en cada request. Se sobreescribe con
// NEXT_PUBLIC_SITE_URL (Netlify lo expone como URL de deploy).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s · Neurosonología CDMX" },
  description,
  alternates: { canonical: "/" },
  // Next sólo autodetecta favicon.ico / app/icon.*; el SVG hay que declararlo.
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
  openGraph: { title, description, type: "website", locale: "es_MX", url: "/", siteName: title, images: [{ url: "/og.png", width: 1732, height: 909, alt: "Neurosonología CDMX 2026" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${figtree.variable} ${notoSans.variable}`}>
        <GooeyFilter />
        <MotionOrchestrator />
        <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
        <NeuralCanvas />
        <SiteHeader />
        <div id="main-content" tabIndex={-1}>{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
