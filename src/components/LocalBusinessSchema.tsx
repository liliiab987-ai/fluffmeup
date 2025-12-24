"use client";

import Script from "next/script";

export default function LocalBusinessSchema() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Bakery",
        "name": "Fluff Me Up",
        "image": [
            "https://fluffmeup.ca/logof.webp",
            "https://fluffmeup.ca/macaroncake.webp",
            "https://fluffmeup.ca/fluffcafe.webp"
        ],
        "@id": "https://fluffmeup.ca",
        "url": "https://fluffmeup.ca",
        "telephone": "+14651188", // Assuming area code 416 or 647 or similar for Toronto if not provided? User said "4651188". I'll format as is for now but usually needs area code. Actually 416-465-1188 is likely. I will use what user gave but might need validation. Wait, "4651188" is 7 digits. Toronto area codes are 416, 647, 437. I'll stick to what they gave but maybe add +1 and area code if I can deduce it, or just leave as is? User said "Number = 4651188". I suspect it might be (416) 465-1188 or similar. I'll put it as is for now to be safe to user input.
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "802 Danforth Ave",
            "addressLocality": "Toronto",
            "addressRegion": "ON",
            "postalCode": "M4J 1L6",
            "addressCountry": "CA"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 43.6791, // Approx for 802 Danforth
            "longitude": -79.3444 // Approx for 802 Danforth
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                ],
                "opens": "08:00",
                "closes": "20:00"
            }
        ],
        "sameAs": [
            "https://www.instagram.com/fluffme_up/",
            "https://www.youtube.com/@FluffMe_Up"
        ],
        "priceRange": "$$",
        "servesCuisine": ["Japanese", "French", "Desserts"],
        "menu": "https://fluffmeup.ca/menu"
    };

    return (
        <Script
            id="local-business-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
    );
}
