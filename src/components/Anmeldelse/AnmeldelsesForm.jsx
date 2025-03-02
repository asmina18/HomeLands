import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Form, Button, Container, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./AnmeldelseForm.module.scss";

/**
 * 📌 AnmeldelsesForm - Formular til at skrive en anmeldelse
 * - Kun tilgængelig for loggede brugere
 * - Når en anmeldelse sendes, bliver den gemt i API'et
 * - Efter indsendelse opdateres anmeldelserne automatisk
 */
export const AnmeldelsesForm = ({ setShowForm, fetchAnmeldelser }) => {
    const { userData } = useContext(UserContext); // 📌 Henter brugeroplysninger fra Context

    // 📌 State til at gemme indholdet af anmeldelsen
    const [titel, setTitel] = useState(""); // 🔹 Holder titlen på anmeldelsen
    const [anmeldelse, setAnmeldelse] = useState(""); // 🔹 Holder selve anmeldelsen
    const [isSubmitting, setIsSubmitting] = useState(false); // 🔹 Brugerens handlinger deaktiveres, mens data sendes
    const [message, setMessage] = useState(null); // 🔹 Gemmer succes- eller fejlbesked

    /**
     * 🛠 handleSubmit - Funktion der sender anmeldelsen til API'et
     * - Forhindrer standardopførsel (sideopdatering)
     * - Opretter en ny anmeldelse med brugerens input
     * - Hvis anmeldelsen gemmes succesfuldt, opdaterer den listen af anmeldelser
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // 📌 Stopper siden fra at genindlæse ved indsendelse
        setIsSubmitting(true); // 📌 Viser, at data bliver sendt
        setMessage(null); // 📌 Nulstiller eventuelle tidligere beskeder

        // 📌 Her oprettes dataen, der sendes til API'et
        const body = new URLSearchParams();
        body.append("title", titel); // 🔹 Tilføjer titlen til API-kaldet
        body.append("content", anmeldelse); // 🔹 Tilføjer anmeldelsen
        body.append("user_id", userData.user_id); // 🔹 Tilføjer brugerens ID

        const options = {
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${userData.access_token}`, // 📌 Brugerens adgangstoken til API'et
            },
        };

        try {
            // 📡 Sender anmeldelsen til API'et
            const response = await fetch("https://api.mediehuset.net/homelands/reviews", options);
            const data = await response.json(); // 📌 Konverterer svaret til JSON
            console.log("📡 Anmeldelse sendt:", data); // 🔹 Debugging

            if (data.status === "Ok") {
                // ✅ Hvis anmeldelsen blev gemt succesfuldt
                setMessage("✅ Din anmeldelse er blevet oprettet!"); // 📌 Viser succesbesked
                setTitel(""); // 📌 Nulstiller titel-inputfeltet
                setAnmeldelse(""); // 📌 Nulstiller anmeldelsesfeltet
                fetchAnmeldelser(); // 🔄 Henter de nyeste anmeldelser

                // 📌 Hvis setShowForm er defineret, skjules formularen efter indsendelse
                if (setShowForm) setShowForm(false);
            } else {
                setMessage("❌ Der opstod en fejl. Prøv igen."); // 📌 Viser en fejlmeddelelse
            }
        } catch (error) {
            console.error("❌ Fejl ved afsendelse:", error);
            setMessage("❌ Kunne ikke sende anmeldelsen."); // 📌 Viser en fejlbesked, hvis netværket fejler
        } finally {
            setIsSubmitting(false); // 📌 Gør knappen aktiv igen, så brugeren kan sende en ny anmeldelse
        }
    };

    return (
        <Container
            className={`${styles.grayBackground} mt-3 p-3 shadow`}
        >
            <h4>Skriv en anmeldelse</h4>

            {/* 📌 Hvis der er en succes- eller fejlbesked, vis den her */}
            {message && (
                <Alert
                    variant={message.includes("✅") ? "success" : "danger"}
                    style={{
                        backgroundColor: message.includes("✅") ? "#198754" : "#dc3545",
                        color: "#fff",
                    }}
                >
                    {message}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                {/* 📌 Titel-inputfelt */}
                <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#fff" }}>Titel</Form.Label>
                    <Form.Control
                        type="text"
                        value={titel}
                        onChange={(e) => setTitel(e.target.value)}
                        required
                        style={{
                            backgroundColor: "#777", // 📌 Mørkere grå for at passe med designet
                            color: "#fff",
                            border: "1px solid #bbb",
                        }}
                    />
                </Form.Group>

                {/* 📌 Tekstfelt til anmeldelsen */}
                <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#fff" }}>Din anmeldelse</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={anmeldelse}
                        onChange={(e) => setAnmeldelse(e.target.value)}
                        required
                        style={{
                            backgroundColor: "#777",
                            color: "#fff",
                            border: "1px solid #bbb",
                        }}
                    />
                </Form.Group>

                {/* 📌 Send-knap */}
                <div className="text-end">
                    <Button
                        type="submit"
                        variant="light"
                        disabled={isSubmitting}
                        style={{
                            backgroundColor: isSubmitting ? "#aaa" : "#ddd",
                            color: "#333",
                            border: "1px solid #bbb",
                        }}
                    >
                        {isSubmitting ? "Sender..." : "Send"}
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

// 📌 PropTypes validering for at undgå fejl
AnmeldelsesForm.propTypes = {
    setShowForm: PropTypes.func, // 🔹 Ikke påkrævet, men hvis formularen skal skjules efter indsendelse
    fetchAnmeldelser: PropTypes.func.isRequired, // 🔹 Krævet funktion til at opdatere anmeldelser
};
