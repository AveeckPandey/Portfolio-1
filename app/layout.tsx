import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import Preloader from "../components/Preloader";

export const metadata: Metadata = {
  title: "Aveeck Portfolio",
  description: "Aveeck Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body style={{ margin: 0, background: "#080808" }}>
        <Preloader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
