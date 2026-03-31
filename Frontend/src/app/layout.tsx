import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Libre_Baskerville, Faculty_Glyphic } from "next/font/google";
import "@/styles/globals.css";
import Footer from "@/components/layouts/Footer";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: "--font-ibm-plex-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const facultyGlyphic = Faculty_Glyphic({
  variable: "--font-faculty-glyphic",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ai-Ai-Ai | AI Solution Partner",
  description: "Your AI Solution Partner from roadmap to production deployment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSansThai.variable} ${libreBaskerville.variable} ${facultyGlyphic.variable} scroll-smooth`}
    >
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
