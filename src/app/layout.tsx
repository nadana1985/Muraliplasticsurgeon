import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ui/ChatBot";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://drmuraliplastic.com"),
  icons: {
    icon: "/images/logo-64.png",
    apple: "/images/logo-192.png",
  },
  title: {
    default: "Dr. Murali. K – Consultant Aesthetic & Plastic Surgeon in Chennai",
    template: "%s | Dr. Murali. K – Plastic Surgeon Chennai",
  },
  description:
    "Expert Aesthetic & Plastic Surgeon in Chennai with 8+ years experience. Specializing in Rhinoplasty, Liposuction, Breast Augmentation, Gynaecomastia, Hair Transplant & more at Healwell Clinic, T Nagar.",
  keywords: [
    "plastic surgeon chennai",
    "aesthetic surgeon chennai",
    "rhinoplasty chennai",
    "liposuction chennai",
    "breast augmentation chennai",
    "gynaecomastia treatment chennai",
    "hair transplant chennai",
    "Dr Murali",
    "Healwell Clinic",
    "plastic surgery tamil nadu",
    "cosmetic surgery chennai",
  ],
  authors: [{ name: "Dr. Murali K" }],
  creator: "Dr. Murali K",
  publisher: "Dr. Murali K",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Dr. Murali. K – Consultant Aesthetic & Plastic Surgeon",
    description:
      "Sculpting dreams, crafting beauty & restoring form. Expert plastic surgery in Chennai with 8+ years of experience.",
    url: "https://drmuraliplastic.com",
    siteName: "Dr. Murali. K – Plastic Surgeon Chennai",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Murali K – Plastic Surgeon Chennai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Murali. K – Consultant Aesthetic & Plastic Surgeon",
    description:
      "Sculpting dreams, crafting beauty & restoring form. Expert plastic surgery in Chennai.",
    images: ["/images/og-image.jpg"],
    creator: "@drmuraliplastic",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://drmuraliplastic.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-white font-body text-gray-900 antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
