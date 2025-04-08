import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { headers } from "next/headers";
import Layout from './components/Layout';
import { AnimatePresence } from "framer-motion"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ticket App",
  description: "Your one stop NFT Marketplace",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = (await headers()).get("cookie");

  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <Providers cookie={cookie}>
          <AnimatePresence>
            <Layout>
              {children}
            </Layout>
          </AnimatePresence>
        </Providers>
      </body>
    </html>
  );
}
