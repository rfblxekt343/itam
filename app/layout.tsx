import type { Metadata } from "next";
import { Fredoka as FontFredoka } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/Navbar"; 
//import Navigation from '@/components/Navigation';

const fredoka = FontFredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: 'swap',
});



export const metadata: Metadata = {
  title: "אִתָּם",
  description: "אתר הנצחה חללי מלחמת חרבות ברזל",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fredoka.className} antialiased`}>
          <Navbar />
        {children}
      </body>
    </html>
  );
}
