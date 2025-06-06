import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./globals.scss";
import sc from "../styles/main.module.scss";
import Navbar from "@/components/Navbar";
import ClientProvider from "./ClientProvider";
import ThemeProvider from "./ThemeProvider";

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
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider>
            <ClientProvider>
              <Navbar />
              <main className={sc.main}>{children}</main>
            </ClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
