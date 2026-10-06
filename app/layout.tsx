import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import RevealScript from "@/components/RevealScript";
import Preloader from "@/components/Preloader";
import GlobalMotion from "@/components/GlobalMotion";
import { getSetting, DEFAULT_BRANDING, DEFAULT_NAV, DEFAULT_FOOTER, DEFAULT_ANNOUNCEMENT } from "@/lib/settings";

export const metadata: Metadata = {
  title: "VELORA — Menswear, Defined by Distinction",
  description: "Quiet luxury menswear. Tailoring, outerwear and knitwear made for permanence.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const branding = await getSetting("branding", DEFAULT_BRANDING);
  const nav = await getSetting("navigation", DEFAULT_NAV);
  const footer = await getSetting("footer", DEFAULT_FOOTER);
  const announcement = await getSetting("announcement", DEFAULT_ANNOUNCEMENT);

  const cssVars = {
    "--olive": branding.primary,
    "--olive-deep": branding.oliveDeep,
    "--olive-dark": branding.oliveDark,
    "--cream": branding.cream,
    "--cream-soft": branding.creamSoft,
    "--off-white": branding.offWhite,
    "--taupe": branding.taupe,
    "--charcoal": branding.charcoal,
  } as React.CSSProperties;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={cssVars} className="font-sans font-light">
        <Preloader />
        <GlobalMotion />
        <CartProvider>
          {announcement.enabled && (
            <div style={{ background: announcement.bg, color: announcement.color }} className="text-center text-[11px] tracking-wide py-2.5 relative z-[60]">
              {announcement.text}
            </div>
          )}
          <Navbar items={nav.items} />
          <main className="pt-[76px]">{children}</main>
          <Footer columns={footer.columns} />
        </CartProvider>
        <RevealScript />
      </body>
    </html>
  );
}
