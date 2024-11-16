// layout.tsx
import React from "react";
import "../app/styles/globals.css"; // Adjust to your global styles
import Navbar from "../../components/Navbar";
import ParticlesComponent from "../../components/particles";
import ThirdwebProviderWrapper from "../../components/ThirdwebProviderWrapper";

export const metadata = {
  title: "Funds In Need",
  description: "A platform for financial assistance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative">
        <ThirdwebProviderWrapper>
          {/* Navbar */}
          <Navbar />

          {/* Background Particles */}
          <ParticlesComponent id="particles" />

          {/* Main Content */}
          <main className="relative z-10">{children}</main>
        </ThirdwebProviderWrapper>
      </body>
    </html>
  );
}
