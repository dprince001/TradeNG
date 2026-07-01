import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trade NG",
  description: "Safe and Secure Peer-to-Peer Marketplace",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-[#F9FAFB] flex items-start justify-center max-w-[540px] mx-auto w-full`}
      >
        {children}
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
