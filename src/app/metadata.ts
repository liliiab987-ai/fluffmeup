import type { Metadata } from "next";

export const siteConfig = {
  name: "Fluff Me Up",
  description:
    "Premier café in Toronto. Indulge in our cloud-like desserts, custom cakes, and gourmet treats at 802 Danforth Ave.",
  url: "https://fluffmeup.com", // Assuming .ca for Toronto business, or .com if global. adjusting to likely domain or placeholder
  ogImage: "https://fluffmeup.com/og-image.jpg",
  links: {
    twitter: "https://twitter.com/fluffmeup",
    github: "https://github.com/fluffmeup",
  },
};

export const defaultMetadata: Metadata = {
  title: {
    default: "Fluff Me Up | ",
    template: "%s | Fluff Me Up Toronto",
  },
  description:
    "Experience Toronto's fluffiest desserts and artisanal macarons. Located at 802 Danforth Ave. Fresh, cloud-like desserts made daily.",
  applicationName: "Fluff Me Up",
  authors: [{ name: "Fluff Me Up Team" }],
  generator: "Next.js",
  keywords: [
    "Toronto bakery",

    "Macarons Toronto",
    "Custom cakes Toronto",
    "Dessert shop Danforth",
    "Fluffy cheesecake",
    "Gourmet pastries Toronto",
    "Best desserts Toronto",
    "Gluten-free macarons Toronto",
    "Wedding favours Toronto",
    "802 Danforth Ave bakery",
  ],
  creator: "Fluff Me Up",
  publisher: "Fluff Me Up",
  alternates: {
    canonical: "/",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://fluffmeup.com",
    title: "Fluff Me Up | Toronto’s Coziest Café",
    description:
      "Visit Fluff Me Up at 802 Danforth Ave for Toronto’s Coziest Café and authentic French macarons. Sweet treats for every occasion.",
    siteName: "Fluff Me Up",
    images: [
      {
        url: "/og-image.jpg", // We should ensure this exists or use a relevant existing image
        width: 1200,
        height: 630,
        alt: "Fluff Me Up - Toronto’s Coziest Café",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fluff Me Up | Toronto's Premier Dessert Shop",
    description:
      "Clouds of sweetness at 802 Danforth Ave, Toronto. Coffee, macarons, and more.",
    // site: "@fluffmeup", // Add if they have one
    images: ["/og-image.jpg"],
  },
  category: "Food & Drink",
};
