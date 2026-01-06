import type { Metadata } from "next";
import { Nunito, Varela_Round } from "next/font/google";
import "./globals.css";
import PersistentAudioPlayer from "@/components/PersistentAudioPlayer";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const varelaRound = Varela_Round({
  variable: "--font-varela",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Happy Birthday Sherena 🎉",
  description: "A special birthday greeting app for Sherena.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎂</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${varelaRound.variable} antialiased`}
      >
        {children}
        <PersistentAudioPlayer />
      </body>
    </html>
  );
}
