import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { Cursor } from "@/components/Cursor";
import { MeshBackground } from "@/components/MeshBackground";
import { NotchMenu } from "@/components/NotchMenu";
import { Preloader } from "@/components/Preloader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/content/site";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const text = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Pranay Pawar — CTO, product leader and designer", template: "%s — Pranay Pawar" },
  description: site.tagline,
  openGraph: { title: "Pranay Pawar", description: site.tagline, url: site.url, siteName: "Pranay Pawar", type: "website" },
};

const motionScript = `try{if(localStorage.getItem("motion-off")==="1")document.documentElement.classList.add("motion-off")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg">
          Skip to content
        </a>
        <MeshBackground />
        <div className="grain" aria-hidden />
        <SmoothScroll />
        <Preloader />
        <NotchMenu />
        <Cursor />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
