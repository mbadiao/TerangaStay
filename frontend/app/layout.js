import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CaZa",
  description: "",
};

import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/Navbar";
import { NextAuthProvider } from "./Providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
