import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://futuresystemslab.io"),
  title: "SOVEREIGN by Design — Future Systems Lab",
  description: "Decentralized infrastructure for sovereign data governance, with behavioral health as deliberate proving ground.",
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: "website",
    url: "https://futuresystemslab.io",
    siteName: "Future Systems Lab",
    title: "Future Systems Lab — consent-first health-IT and Web3 engineering",
    description: "HL7v2 to FHIR integration, wallet sign-in and hands-on courses, built by a clinician-engineer. Ethereum Sepolia testnet.",
  },
  twitter: {
    card: "summary",
    title: "Future Systems Lab — consent-first health-IT and Web3 engineering",
    description: "HL7v2 to FHIR integration, wallet sign-in and hands-on courses, built by a clinician-engineer.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-950 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
