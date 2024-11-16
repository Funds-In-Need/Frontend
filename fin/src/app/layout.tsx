import React from "react";
import "../app/styles/globals.css"; // Adjust to your global styles
import ParticlesComponent from "../../components/particles";

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
      <body className="relative">
        {/* Background Particles */}
        <ParticlesComponent id="particles" />
        
        {/* Page Content */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
