import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Checkout - Encrypted",
  description:
    "Secure encrypted checkout processed by NeXFlowX. PCI DSS compliant. Zero-redirect payment processing with 256-bit SSL encryption. Accepts Visa, Mastercard, American Express, MB WAY, PIX, and bank transfers.",
  keywords: [
    "secure checkout",
    "encrypted payment",
    "PCI DSS",
    "SSL encryption",
    "zero-redirect payment",
    "white-label checkout",
    "NeXFlowX",
    "Visa",
    "Mastercard",
    "MB WAY",
    "PIX",
    "bank transfer",
    "online payment",
  ],
  authors: [{ name: "NeXFlowX" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Checkout - Encrypted",
    description: "Secure encrypted payment processing powered by NeXFlowX. PCI DSS compliant with 256-bit SSL encryption.",
    type: "website",
    siteName: "NeXFlowX",
  },
  twitter: {
    card: "summary",
    title: "Checkout - Encrypted",
    description: "Secure encrypted payment processing powered by NeXFlowX.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0d9488" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
