import type { Metadata } from "next";
import { Figtree, Noto_Sans } from "next/font/google";
import { headers } from "next/headers";
import { NeuralCanvas } from "./components/NeuralCanvas";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

const figtree = Figtree({ variable: "--font-display", subsets: ["latin"] });
const notoSans = Noto_Sans({ variable: "--font-body", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const title = "Neurosonología CDMX 2026";
  const description = "Programa integral de mentoría y certificación en neurosonología y hemodinamia cerebral por Doppler transcraneal.";
  return {
    metadataBase,
    title: { default: title, template: "%s · Neurosonología CDMX" },
    description,
    openGraph: { title, description, type: "website", locale: "es_MX", images: [{ url: "/og.png", width: 1732, height: 909, alt: "Neurosonología CDMX 2026" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${figtree.variable} ${notoSans.variable}`}>
        <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
        <NeuralCanvas />
        <SiteHeader />
        <div id="main-content" tabIndex={-1}>{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
