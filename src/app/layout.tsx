import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeoDigital — AI-Powered App Development & Digital Solutions | Global Agency",
  description:
    "Custom AI-powered iOS & Android apps, stunning websites, and intelligent digital solutions. Serving businesses worldwide — Europe, Middle East, Asia, Americas. From €500. Free consultation.",
  keywords: [
    // Core services EN
    "AI app development", "custom mobile app development", "iOS app development company",
    "Android app development agency", "Flutter app development", "React Next.js web development",
    "AI chatbot development", "machine learning solutions", "digital marketing agency",
    "SEO optimization services", "website design company", "e-commerce development",
    "AI software development company", "custom software solutions",
    // Geo EN
    "app development Europe", "app development Dubai", "app development UAE",
    "app development Germany", "app development Switzerland", "app development Greece",
    "web development Middle East", "AI solutions Asia", "software company Romania",
    "app development North America", "app development South America",
    "digital agency worldwide", "global software development",
    // DE
    "App Entwicklung", "Webentwicklung Agentur", "KI Softwareentwicklung",
    "App Entwicklung Deutschland", "App Entwicklung Schweiz", "Digitalagentur",
    "iOS App Entwicklung", "Android App Entwicklung", "Webdesign Agentur",
    // FR
    "développement application mobile", "agence digitale", "développement web",
    "solutions intelligence artificielle",
    // ES
    "desarrollo de aplicaciones móviles", "desarrollo web", "soluciones de inteligencia artificial",
    "agencia digital", "desarrollo de apps",
    // EL
    "κατασκευή εφαρμογών", "κατασκευή ιστοσελίδων", "ψηφιακό μάρκετινγκ",
    "ανάπτυξη λογισμικού", "τεχνητή νοημοσύνη",
    // AR region keywords
    "تطوير تطبيقات", "تطوير مواقع", "حلول الذكاء الاصطناعي",
    "app development company Dubai", "software development Abu Dhabi",
    "digital solutions Saudi Arabia", "app development Qatar",
    // RO
    "dezvoltare aplicații mobile", "dezvoltare web", "agenție digitală România",
    "dezvoltare software Cluj-Napoca", "soluții AI", "creare aplicații iOS Android",
    // ZH
    "应用开发公司", "网站开发", "人工智能解决方案", "移动应用开发",
    // PT (South America)
    "desenvolvimento de aplicativos", "desenvolvimento web", "soluções de inteligência artificial",
  ],
  authors: [{ name: "NeoDigital", url: "https://neodigital.tech" }],
  creator: "NeoDigital — INNOVATEX NEST TREND S.R.L.",
  publisher: "NeoDigital",
  metadataBase: new URL("https://neodigital.tech"),
  alternates: {
    canonical: "https://neodigital.tech",
    languages: {
      "en": "https://neodigital.tech",
      "ro": "https://neodigital.tech",
      "de": "https://neodigital.tech",
      "fr": "https://neodigital.tech",
      "el": "https://neodigital.tech",
      "es": "https://neodigital.tech",
      "zh": "https://neodigital.tech",
      "x-default": "https://neodigital.tech",
    },
  },
  openGraph: {
    type: "website",
    url: "https://neodigital.tech",
    title: "NeoDigital — AI-Powered Digital Solutions for Global Businesses",
    description: "Custom AI apps, cinematic websites, and intelligent automation. Trusted by businesses across Europe, Middle East, Asia & Americas. Free consultation.",
    siteName: "NeoDigital",
    locale: "en_US",
    alternateLocale: ["ro_RO", "de_DE", "fr_FR", "el_GR", "es_ES", "zh_CN", "ar_AE"],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeoDigital — AI-Powered App Development & Digital Solutions",
    description: "Custom AI apps, cinematic websites, and intelligent automation. Serving businesses worldwide. Free consultation.",
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
  verification: {
    google: "eUwImp4061PmzAG4lwzDzAg7TH8BlhRBnjkh_Yuxy8k",
  },
  category: "technology",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NeoDigital",
  legalName: "INNOVATEX NEST TREND S.R.L.",
  url: "https://neodigital.tech",
  logo: "https://neodigital.tech/icons/smartscan.png",
  description: "AI-powered app development, web design, and digital solutions agency serving businesses globally.",
  email: "office@neodigital.tech",
  telephone: "+40799977755",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Str. Pavel Roșca Nr. 9",
    addressLocality: "Cluj-Napoca",
    addressRegion: "Cluj",
    addressCountry: "RO",
    postalCode: "400000",
  },
  areaServed: [
    { "@type": "Country", name: "Romania" },
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "Switzerland" },
    { "@type": "Country", name: "Greece" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Spain" },
    { "@type": "Country", name: "Brazil" },
    { "@type": "Country", name: "China" },
    { "@type": "Country", name: "Japan" },
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Continent", name: "Europe" },
    { "@type": "Continent", name: "Asia" },
    { "@type": "Continent", name: "North America" },
    { "@type": "Continent", name: "South America" },
  ],
  foundingDate: "2020-09-15",
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Mobile App Development",
          description: "AI-powered iOS & Android apps built with Flutter, Swift, and Kotlin.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Design & Development",
          description: "Cinematic websites built with React, Next.js, and WebGL. SEO-optimized and blazing fast.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI & Automation Solutions",
          description: "Custom chatbots, predictive analytics, machine learning models, and intelligent automation.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO & Digital Marketing",
          description: "Technical SEO, content strategy, Google Ads campaigns, and full digital marketing solutions.",
        },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "47",
    bestRating: "5",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "NeoDigital",
  image: "https://neodigital.tech/icons/smartscan.png",
  url: "https://neodigital.tech",
  telephone: "+40799977755",
  email: "office@neodigital.tech",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Str. Pavel Roșca Nr. 9",
    addressLocality: "Cluj-Napoca",
    addressRegion: "Cluj",
    addressCountry: "RO",
  },
  priceRange: "€€",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  knowsLanguage: ["en", "ro", "de", "fr", "el", "es", "zh"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="canonical" href="https://neodigital.tech" />
        <link rel="alternate" hrefLang="en" href="https://neodigital.tech" />
        <link rel="alternate" hrefLang="ro" href="https://neodigital.tech" />
        <link rel="alternate" hrefLang="de" href="https://neodigital.tech" />
        <link rel="alternate" hrefLang="fr" href="https://neodigital.tech" />
        <link rel="alternate" hrefLang="el" href="https://neodigital.tech" />
        <link rel="alternate" hrefLang="es" href="https://neodigital.tech" />
        <link rel="alternate" hrefLang="zh" href="https://neodigital.tech" />
        <link rel="alternate" hrefLang="x-default" href="https://neodigital.tech" />
        <meta name="geo.region" content="RO-CJ" />
        <meta name="geo.placename" content="Cluj-Napoca" />
        <meta name="geo.position" content="46.7712;23.6236" />
        <meta name="ICBM" content="46.7712, 23.6236" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
