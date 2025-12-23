import type { Metadata } from "next";
import { Titan_One, Inter } from "next/font/google";
import "./globals.css";


const titanOne = Titan_One({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fluff me up - Artisan French Macarons & Cafe",
  description: "Experience the magic of handcrafted French macarons and exceptional coffee. Where every bite feels like a sweet embrace.",
  keywords: ["cafe", "macarons", "french pastries", "coffee", "artisan", "bakery"],
  openGraph: {
    title: "Fluff me up - Artisan French Macarons & Cafe",
    description: "Experience the magic of handcrafted French macarons and exceptional coffee.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${titanOne.variable} ${inter.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
