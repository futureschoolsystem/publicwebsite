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
  title: "Future School System | Okara",
  description:
    "Future School System is Okara's leading educational institution, offering quality education, modern teaching methods, and a nurturing environment from Nursery to Matric. Empowering students with knowledge, discipline, and innovation for a brighter future.",
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
        // "https://www.facebook.com/yourpage",  
        // "https://www.instagram.com/yourpage"
      ],
      "foundingDate": "2015-01-01",
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
      // "awards": ["Best School in Okara 2022", "Excellence in Education Award"]
    })
  }}
/>
 <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
