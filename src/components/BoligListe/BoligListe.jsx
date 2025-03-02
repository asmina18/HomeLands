import { Container, Row, Col } from "react-bootstrap";
import { useGet } from "../../hooks/useGet";
import { BoligKort } from "../BoligKort/BoligKort";
import { FejlMeddelelse } from "../FejlMeddelelse/FejlMeddelelse";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * 📌 BoligListe - Viser en liste af boliger
 * - Henter data fra API'et baseret på `url`
 * - Kan begrænse antal (`limit`) og blande rækkefølgen (`shuffle`)
 */
export function BoligListe({ url, title, limit, shuffle = false }) {
    // 📌 Hent boligdata fra API
    const { data, error, isLoading } = useGet(url);
    const [homes, setHomes] = useState([]);

    useEffect(() => {
        if (!data?.items?.length) return; // 🔹 Undgår unødvendig opdatering, hvis der ingen boliger er

        let selectedHomes = [...data.items];

        if (shuffle) {
            selectedHomes.sort(() => Math.random() - 0.5); // 🔹 Blander rækkefølgen tilfældigt
        }

        setHomes(selectedHomes.slice(0, limit)); // 🔹 Begrænser antallet af viste boliger
    }, [data, limit, shuffle]);

    return (
        <section className="bolig-liste">
            {/* 📌 Titel for boliglisten */}
            <h2 className="text-center mb-4">{title}</h2>

            {/* 📌 Fejl- og loadinghåndtering */}
            <FejlMeddelelse error={error} isLoading={isLoading} homes={homes} />

            {/* 📌 Vis kun boliglisten, hvis der er boliger */}
            {homes.length > 0 && (
                <Container>
                    <Row className="justify-content-center">
                        {homes.map((item) => (
                            <Col key={item.id} xs={12} sm={6} md={4} className="mb-4">
                                <article>
                                    <BoligKort item={item} /> {/* 🔹 Fjernet `Link`, da det allerede er i `BoligKort` */}
                                </article>
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}
        </section>
    );
}

// 📌 PropTypes validering
BoligListe.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired,
    shuffle: PropTypes.bool,
};
