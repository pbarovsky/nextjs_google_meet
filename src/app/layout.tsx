import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./globals.scss";
import sc from "../styles/main.module.scss";
import Navbar from "@/components/Navbar";
import ClientProvider from "./ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJs Meet",
  description: "A video calling app built with NextJs & Stream",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ClientProvider>
            <main className={sc.main}>
              <Navbar />
              {children}
            </main>
          </ClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
