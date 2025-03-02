import { useState, useEffect } from "react";
import { useGet } from "../../hooks/useGet";
import { FejlMeddelelse } from "../FejlMeddelelse/FejlMeddelelse";
import styles from "./Slideshow.module.scss";

/**
 * 📌 Slideshow - Viser billeder fra API'et
 * - Automatisk skift hvert 5. sekund
 * - Håndterer fejl og loading-tilstand
 */
export function Slideshow() {
    // 📌 Hent billeder fra API'et
    const { data, error, isLoading } = useGet("https://api.mediehuset.net/homelands/images");

    // 📌 State til at holde styr på aktuelt billede
    const [index, setIndex] = useState(0);

    // 📌 Skift billede hvert 5. sekund, når data er hentet
    useEffect(() => {
        if (data?.items?.length > 0) {
            const interval = setInterval(() => {
                setIndex((prevIndex) => (prevIndex + 1) % data.items.length);
            }, 5000);

            return () => clearInterval(interval); // Ryd intervallet ved unmount
        }
    }, [data]);

    // 📌 Fejl- og loadinghåndtering med FejlMeddelelse-komponenten
    if (isLoading || error) {
        return <FejlMeddelelse error={error} isLoading={isLoading} />;
    }

    // 📌 Sikrer, at der er billeder at vise
    if (!data?.items?.length) {
        return <div className={styles.noImages}>Ingen billeder tilgængelige.</div>;
    }

    // 📌 Hent billeder fra API-data
    const images = data.items.map(item => ({
        src: item.image?.[0] || "/fallback.jpg",
        alt: item.description || "Slideshow billede",
    }));

    return (
        <figure className={styles.slideshowContainer}>
            <img
                src={images[index].src}
                alt={images[index].alt}
                className={styles.slideshowImage}
            />
        </figure>
    );
}
