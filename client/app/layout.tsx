import type { Metadata } from "next";
// @ts-ignore: CSS side-effect import without type declarations
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";

export const metadata: Metadata = {
  title: "Career Roadmap Generator | Margdarshak AI",
  description:
    "Generate a personalized step-by-step career roadmap based on your skills and target role.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}