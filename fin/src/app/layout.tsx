import React from "react";
import "./styles/globals.css";

export const metadata = {
  title: "Funds In Need",
  description: "A platform for financial assistance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
