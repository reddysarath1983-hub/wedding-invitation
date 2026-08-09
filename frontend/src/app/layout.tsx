import type { Metadata } from "next";
import { Inter, Noto_Sans_Telugu, Cinzel, Great_Vibes, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const telugu = Noto_Sans_Telugu({ 
  subsets: ["telugu"], 
  weight: ["400", "500", "600", "700"],
  variable: "--font-telugu" 
});
const cinzel = Cinzel({ 
  subsets: ["latin"], 
  weight: ["400", "600", "700", "800"],
  variable: "--font-heading" 
});
const greatVibes = Great_Vibes({ 
  subsets: ["latin"], 
  weight: ["400"],
  variable: "--font-script" 
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif-luxury"
});

export const metadata: Metadata = {
  title: "PelliPatrika — Digital Telugu Wedding Invitations",
  description: "Create and publish customized, elegant digital Telugu wedding invitation websites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${telugu.variable} ${cinzel.variable} ${greatVibes.variable} ${cormorant.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-stone-900 text-stone-100 font-sans antialiased selection:bg-amber-600 selection:text-stone-950">
        {children}
      </body>
    </html>
  );
}
