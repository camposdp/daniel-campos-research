import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://daniel-campos-research.vercel.app"),
  title: {
    default: "Daniel Prado de Campos | Biomedical Engineering",
    template: "%s | Daniel Prado de Campos",
  },
  description:
    "Research in wearable biomedical instrumentation, surface electromyography, assistive technology, precision livestock and medical thermography.",
  authors: [{ name: "Daniel Prado de Campos" }],
  keywords: [
    "biomedical engineering",
    "surface electromyography",
    "sEMG",
    "wearable instrumentation",
    "assistive technology",
    "neurorehabilitation",
    "precision livestock",
    "medical thermography",
  ],
  openGraph: {
    title: "Daniel Prado de Campos | Biomedical Engineering",
    description:
      "Biomedical signals transformed into wearable, assistive and data-driven systems.",
    type: "website",
    images: [{ url: "/images/daniel-campos.jpg", width: 1080, height: 1080 }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
