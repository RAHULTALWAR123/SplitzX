import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import Silk from "@/components/Silk";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SplitsX",
  description: "Track and Manage your Expenses Easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ConvexClientProvider>
            <div className="min-h-screen text-gray-100 flex flex-col">
              <div className="fixed inset-0 -z-10">
                <Silk
                  speed={6}
                  scale={1.1}
                  color="575757"
                  noiseIntensity={1.5}
                  rotation={2.32}
                />
              </div>

           <div className="relative z-10">
                {children}
              </div>
            </div>
          </ConvexClientProvider>

          <Footer/>
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}