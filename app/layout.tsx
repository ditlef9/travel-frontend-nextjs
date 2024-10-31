import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Smart Travel Planner",
  description: "Get itineraries, attractions, and accommodations based on your travel interests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
