import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import useServerDarkMode from "@/app/hooks/use-server-dark-mode";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Finance App",
  description: "Finance App",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useServerDarkMode()
  return (
    <html lang="en" className={theme}>
      <body className={`${geistSans.className} min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
