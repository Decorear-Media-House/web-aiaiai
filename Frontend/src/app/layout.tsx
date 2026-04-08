import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Libre_Baskerville, Faculty_Glyphic } from "next/font/google";
import "@/styles/globals.css";
import Footer from "@/components/layouts/Footer";
import { getTrackingTags } from "@/lib/wordpress";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tags = await getTrackingTags();

  return (
    <html
      lang="en"
      className={`${ibmPlexSansThai.variable} ${libreBaskerville.variable} ${facultyGlyphic.variable} scroll-smooth`}
    >
      {tags.head_scripts && (
        <head>
          <div dangerouslySetInnerHTML={{ __html: tags.head_scripts }} />
        </head>
      )}
      <body>
        {tags.body_open_scripts && (
          <div dangerouslySetInnerHTML={{ __html: tags.body_open_scripts }} />
        )}
        {children}
        <Footer />
        {tags.body_close_scripts && (
          <div dangerouslySetInnerHTML={{ __html: tags.body_close_scripts }} />
        )}
      </body>
    </html>
  );
}
