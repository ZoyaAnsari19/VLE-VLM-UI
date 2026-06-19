import type { Metadata } from "next";
import "@/styles/kisan-mitra.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kisan.kalakar.tv";
const ogImageUrl = `${siteUrl}/images/og-team.jpg?v=2`;

const ogImage = {
  url: ogImageUrl,
  width: 1200,
  height: 630,
  alt: "Kisan Mitra Ecosystem team — VLE, VLM, DLO, TLO, CSE officers",
  type: "image/jpeg",
};

const siteDescription =
  "यूपी के 12 मंडलों में 452 अधिकारी पद। अपने गाँव का अधिकारी बनें — शहर भागने की ज़रूरत नहीं।";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Kisan Mitra Bharti Pariksha 2026 — Apne gaon ka officer bano",
  description: siteDescription,
  openGraph: {
    title: "Kisan Mitra Bharti Pariksha 2026",
    description: siteDescription,
    url: siteUrl,
    siteName: "Kisan Mitra",
    locale: "hi_IN",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kisan Mitra Bharti Pariksha 2026",
    description: siteDescription,
    images: [ogImageUrl],
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231B4D3E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z'/%3E%3Cpath d='M2 21c0-3 1.85-5.36 5.08-6'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" translate="no" className="notranslate">
      <head>
        <meta name="google" content="notranslate" />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={ogImage.alt} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Tiro+Devanagari+Hindi&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="notranslate">{children}</body>
    </html>
  );
}
