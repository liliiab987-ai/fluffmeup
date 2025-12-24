import type { Metadata } from "next";

export const siteConfig = {
    name: "Fluff Me Up",
    description: "Premier Japanese-style fluffy cheesecakes and macarons in Toronto. Indulge in our cloud-like desserts, custom cakes, and gourmet treats at 802 Danforth Ave.",
    url: "https://fluffmeup.ca", // Assuming .ca for Toronto business, or .com if global. adjusting to likely domain or placeholder
    ogImage: "https://fluffmeup.ca/og-image.jpg",
    links: {
        twitter: "https://twitter.com/fluffmeup",
        github: "https://github.com/fluffmeup",
    },
};

export const defaultMetadata: Metadata = {
    title: {
        default: "Fluff Me Up | Best Japanese Cheesecake & Macarons in Toronto",
        template: "%s | Fluff Me Up Toronto",
    },
    description: "Experience Toronto's fluffiest Japanese cheesecakes and artisanal macarons. Located at 802 Danforth Ave. Fresh, cloud-like desserts made daily.",
    applicationName: "Fluff Me Up",
    authors: [{ name: "Fluff Me Up Team" }],
    generator: "Next.js",
    keywords: [
        "Toronto bakery",
        "Japanese cheesecake Toronto",
        "Macarons Toronto",
        "Custom cakes Toronto",
        "Dessert shop Danforth",
        "Fluffy cheesecake",
        "Gourmet pastries Toronto",
        "Best desserts Toronto",
        "Gluten-free macarons Toronto",
        "Wedding favours Toronto",
        "802 Danforth Ave bakery"
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
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
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
        url: "https://fluffmeup.ca",
        title: "Fluff Me Up | Toronto's Fluffiest Japanese Cheesecake",
        description: "Visit Fluff Me Up at 802 Danforth Ave for Toronto's best Japanese cheesecakes and authentic French macarons. Sweet treats for every occasion.",
        siteName: "Fluff Me Up",
        images: [
            {
                url: "/og-image.jpg", // We should ensure this exists or use a relevant existing image
                width: 1200,
                height: 630,
                alt: "Fluff Me Up - Japanese Cheesecake & Macarons",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Fluff Me Up | Toronto's Premier Dessert Shop",
        description: "Clouds of sweetness at 802 Danforth Ave, Toronto. Japanese cheesecakes, macarons, and more.",
        // site: "@fluffmeup", // Add if they have one
        images: ["/og-image.jpg"],
    },
    category: "Food & Drink",
};
