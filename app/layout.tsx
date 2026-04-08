import type { Metadata } from "next";
import { Space_Grotesk, Lora, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "stocks-are-fake",
  description: "Personal stock market site for learning, research, and tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${lora.variable} ${geistMono.variable} antialiased`}
      >
          <Sidebar />
          <main className="ml-56 min-h-screen">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
      </body>
    </html>
  );
}
