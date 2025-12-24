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

import { defaultMetadata } from "./metadata";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${titanOne.variable} ${inter.variable}`} suppressHydrationWarning>
        <LocalBusinessSchema />
        {children}
      </body>
    </html>
  );
}
