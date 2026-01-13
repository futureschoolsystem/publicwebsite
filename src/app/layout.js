import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  metadataBase: new URL('https://futureschoolsystem.pk'),
  alternates: { canonical: '/' }, 

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  title: "Future School System - Quality Education in Okara",
  description:
    "Top school in Okara with quality education from Nursery to Matric. Empowering students through innovation, discipline, and modern teaching.",
  icons: {
    icon: [
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "FSS",
  },
  openGraph: {
    title: "Future School System | Okara",
    description:
      "Okara's leading educational institution with modern teaching and quality education.",
    url: "https://futureschoolsystem.pk",
    siteName: "Future School System",
    images: [
      {
        url: "/logo.png", 
        width: 800,
        height: 600,
        alt: "Future School System Logo",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
};




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* seo  tags*/}
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Future School System",
      "url": "https://futureschoolsystem.pk",
      "logo": "https://futureschoolsystem.pk/logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "JALAL TOWN G.T ROAD، 1 Multan Okara Rd, Okara",
        "addressLocality": "Okara",
        "addressRegion": "Punjab",
        "postalCode": "56300",
        "addressCountry": "PK"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+92-311-2306050",
        "contactType": "Admissions"
      },
      "sameAs": [
        "https://www.facebook.com/futureschool.okara",
      ],
      "foundingDate": "03-01-2013",
      "founder": {
        "@type": "Person",
        "name": "RAO TANVEER"
      },
      "offers": [
        {
          "@type": "EducationalOccupationalProgram",
          "name": "Nursery to Matric Program",
          "description": "Comprehensive curriculum from Nursery to Matric, with focus on academics, sports, and personal growth.",
          "educationalProgramMode": "Onsite",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "Future School System"
          }
        }
      ],
      "numberOfEmployees": "50+", 
      "awards": ["Best School in Okara", "Award in Educational Excellence"]
    })
  }}
/>
 <ClientLayout>
          {children}
          {/* Floating WhatsApp Button */}
        </ClientLayout>
      </body>
    </html>
  );
}
