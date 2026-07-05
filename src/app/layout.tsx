import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "./providers";

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
      <body className="font-sans min-h-screen bg-[#F9FAFB] flex items-start justify-center max-w-[540px] mx-auto w-full">
        <Providers>
          <Toaster richColors position="top-right" closeButton />
          {children}
        </Providers>
      </body>
    </html>
  );
}
