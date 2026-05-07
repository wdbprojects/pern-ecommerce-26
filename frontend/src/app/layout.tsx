import type { Metadata } from "next";
import { Nunito_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
import { cn } from "@/lib/utils";

const dmSans = DM_Sans({subsets:['latin'],variable:'--font-sans'});

const nunitoSans = Nunito_Sans({
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "New App Name Here",
  description: "Explain what the app is all about",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", dmSans.variable)}>
      <body className={`${nunitoSans.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
