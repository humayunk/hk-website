import { Inter, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
});

export const metadata = {
  title: "Humayun Khan - Design Engineer",
  description: "Humayun Khan is a design engineer. He specializes in product design & front-end development for startups.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable} ${ibmPlexSans.variable}`}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

         {/* Open Graph Meta Tags */}
         <meta property="og:title" content="Humayun Khan - Design Engineer" />
        <meta property="og:description" content="Product Design & Development for Startups" />
        <meta property="og:image" content="https://humayunk.com/preview-image.png" />
        <meta property="og:url" content="https://humayunk.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Humayun Khan - Design Engineer" />
        <meta name="twitter:description" content="Product Design & Development for Startups" />
        <meta name="twitter:image" content="https://humayunk.com/preview-image.png" />
      </head>
      <body className={`${inter.className} ${ibmPlexSans.variable} font-sans`}>{children}</body>
    </html>
  );
}
