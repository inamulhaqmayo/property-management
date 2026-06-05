import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inam Ul Haq - Shopify Developer",
  description: "Professional Shopify Developer with 9+ years of experience building high-converting eCommerce stores",
  keywords: ["Shopify", "Developer", "eCommerce", "Web Development", "Theme Customization"],
  authors: [{ name: "Inam Ul Haq" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Inam Ul Haq - Shopify Developer",
    description: "Professional Shopify Developer with 9+ years of experience",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen flex flex-col bg-dark-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
