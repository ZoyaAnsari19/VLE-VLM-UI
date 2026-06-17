import type { Metadata } from "next";
import "@/styles/kisan-mitra.css";

export const metadata: Metadata = {
  title: "Kisan Mitra Bharti Pariksha 2026 — Apne gaon ka officer bano",
  description:
    "Kisan Mitra Bharti Pariksha 2026 — UP ke 12 divisions mein 452 officer posts. VLE, VLM, TLO, DLO. Apne gaon ka officer bano.",
  openGraph: {
    title: "Kisan Mitra Bharti Pariksha 2026",
    description: "UP ke 12 divisions mein 452 officer posts. Apne gaon ka officer bano.",
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
    <html lang="hi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Tiro+Devanagari+Hindi&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
