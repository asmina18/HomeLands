import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useGet } from "../../../hooks/useGet";
import { FejlMeddelelse } from "../../FejlMeddelelse/FejlMeddelelse";
import PropTypes from "prop-types";
import styles from "./BoligDetails.module.scss";

export function BoligDetails({ boligId }) {
    // 📌 Hent ID fra URL, hvis boligId ikke blev sendt som prop
    const { id: routeId } = useParams();
    const boligIdToFetch = boligId || routeId;

    // 📌 Hent data fra API
    const { data, error, isLoading } = useGet(`https://api.mediehuset.net/homelands/homes/${boligIdToFetch}`);
    const [bolig, setBolig] = useState(null);

    // 🔹 Opdater boligdata, når API-data ændres
    useEffect(() => {
        if (data?.item) {
            setBolig(data.item);
        }
    }, [data]);

    return (
        <Container className={styles.detailContainer}>
            {/* 📌 Fejl- og loadingshåndtering */}
            <FejlMeddelelse error={error} isLoading={isLoading} bolig={bolig} />

            {/* 📌 Vis kun detaljer, hvis boligdata er tilgængelig */}
            {bolig && (
                <>
                    {/* 🔹 Boligbillede og adresse */}
                    <Row className="mb-4">
                        <Col xs={12} md={6}>
                            <img
                                src={bolig.images?.[0]?.filename?.large || "/placeholder.jpg"}
                                alt={bolig.address}
                                className="img-fluid rounded"
                            />
                        </Col>
                        <Col xs={12} md={6} className="text-md-start text-center">
                            <h2 className="fw-bold">{bolig.address}</h2>
                            <p className="text-muted">{bolig.city}, {bolig.zipcode}</p>
                        </Col>
                    </Row>

                    {/* 🔹 Ejendomsinformation som en tabel */}
                    <Row>
                        <Col xs={12}>
                            <Table responsive bordered hover className={styles.propertyTable}>
                                <tbody>
                                    <tr>
                                        <td><strong>Sagsnr.</strong></td>
                                        <td>{bolig.id}</td>
                                        <td><strong>Kælder</strong></td>
                                        <td>{bolig.has_basement ? "Ja" : "Ikke oplyst"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Boligareal</strong></td>
                                        <td>{bolig.floor_space} m²</td>
                                        <td><strong>Byggeår</strong></td>
                                        <td>{bolig.year_construction || "Ikke oplyst"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Grundareal</strong></td>
                                        <td>{bolig.lot_size ? bolig.lot_size + " m²" : "Ikke oplyst"}</td>
                                        <td><strong>Ombygget</strong></td>
                                        <td>{bolig.year_renovation ? bolig.year_renovation : "Ikke oplyst"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Antal rum</strong></td>
                                        <td>{bolig.num_rooms}</td>
                                        <td><strong>Energimærke</strong></td>
                                        <td>{bolig.energy_label_name || "Ikke oplyst"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Antal plan</strong></td>
                                        <td>{bolig.num_floors || "Ikke oplyst"}</td> {/* 🔹 Rettet fra floor_space */}
                                        <td><strong>Liggetid</strong></td>
                                        <td>{bolig.days_on_market ? bolig.days_on_market + " dage" : "Ikke oplyst"}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                    {/* 🔹 Økonomioplysninger */}
                    <Row>
                        <Col xs={12}>
                            <h4 className="fw-bold">Økonomi</h4>
                            <Table responsive bordered hover className={styles.propertyTable}>
                                <tbody>
                                    <tr>
                                        <td><strong>Kontantpris</strong></td>
                                        <td>{parseFloat(bolig.price).toLocaleString()} DKK</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Udbetaling</strong></td>
                                        <td>{parseFloat(bolig.payout).toLocaleString()} DKK</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Brutto ex. ejerudgift</strong></td>
                                        <td>{bolig.gross_expense ? bolig.gross_expense + " DKK" : "Ikke oplyst"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Netto ex. ejerudgift</strong></td>
                                        <td>{bolig.net_expense ? bolig.net_expense + " DKK" : "Ikke oplyst"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Ejerudgift</strong></td>
                                        <td>{bolig.owner_expense ? bolig.owner_expense + " DKK" : "Ikke oplyst"}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                    {/* 🔹 Beskrivelse af boligen */}
                    <Row className="mt-4">
                        <Col xs={12}>
                            <h4 className="fw-bold">Beskrivelse</h4>
                            <p>{bolig.description || "Ingen beskrivelse tilgængelig"}</p>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
}

BoligDetails.propTypes = {
    boligId: PropTypes.number.isRequired,
};
