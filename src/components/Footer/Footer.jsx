import styles from "./Footer.module.scss";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { Title } from "../Title/Title";


export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>

                {/* 🔹 Brand-navn / Titel */}
                <h2 className={styles.footerBrand}>
                    <Title text="HomeLands" />
                </h2>

                {/* 🔹 Adresse Sektion */}
                <section className={styles.footerAddress}>
                    <p>Øster Uttrupvej 5</p>
                    <p>9000 Aalborg</p>
                </section>

                {/* 🔹 Kontakt Sektion */}
                <section className={styles.footerContact}>
                    <p>
                        Email: <a href="mailto:info@homelands.dk">info@homelands.dk</a>
                    </p>
                    <p>Telefon: +45 1122 3344</p>
                </section>

                {/* 🔹 Sociale Medier Sektion */}
                <section className={styles.footerSocial}>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                        <FaTwitter />
                    </a>
                    <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                        <FaFacebook />
                    </a>
                </section>

            </div>
        </footer>
    );
};
