import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const futura = localFont({
  src: [
    { path: "./fonts/FuturaBook.woff2", weight: "400", style: "normal" },
    { path: "./fonts/FuturaBold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/FuturaExtraBlack.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-futura",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coming Soon",
  description: "Bringing you something amazing soon!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={`${futura.variable}`}>{children}</body>
    </html>
  );
}
