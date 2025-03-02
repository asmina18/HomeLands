import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Form, Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types"; // 📌 Importér PropTypes for at validere props

/**
 * 📌 OpretAnmeldelse - Formular til at oprette en ny anmeldelse
 * - Kun synlig for loggede brugere
 * - Sender anmeldelsen til API'et
 * - Opdaterer anmeldelser automatisk efter indsendelse
 */
export function OpretAnmeldelse({ setShowForm, fetchAnmeldelser }) {
    const { userData } = useContext(UserContext); // 📌 Henter brugerdata fra Context

    // 📌 State til at holde titel, anmeldelsesindhold og beskeder
    const [title, setTitle] = useState(""); // 🔹 Gemmer anmeldelsens titel
    const [content, setContent] = useState(""); // 🔹 Gemmer selve anmeldelsen
    const [message, setMessage] = useState(""); // 🔹 Viser fejl- eller succesmeddelelser

    /**
     * 🛠 handleSubmit - Sender anmeldelsen til API'et
     * - Forhindrer tomme anmeldelser
     * - Sender data til API'et
     * - Hvis anmeldelsen gemmes succesfuldt, opdateres listen og formularen lukkes
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // 📌 Stopper siden fra at genindlæse

        // 📌 Forhindrer tomme anmeldelser
        if (!title || !content) {
            setMessage("❌ Alle felter skal udfyldes.");
            return;
        }

        // 📌 Forbereder data til API-kald
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userData?.access_token}`,
            },
            body: JSON.stringify({
                title,
                content,
                num_stars: 5, // 📌 Standard antal stjerner , tut mne nado viyasnit zachem ya stavlau eto
            }),
        };

        try {
            // 📡 Sender anmeldelsen til API'et
            const response = await fetch("https://api.mediehuset.net/homelands/reviews", options);

            if (response.ok) {
                setMessage("✅ Anmeldelse oprettet!");
                setTimeout(() => {
                    fetchAnmeldelser(); // 🔄 Opdater listen
                    setShowForm(false); // 📌 Lukker formularen
                }, 2000);
            } else {
                setMessage("❌ Kunne ikke oprette anmeldelse.");
            }
        } catch {
            setMessage("❌ Fejl ved oprettelse.");
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="mt-3 p-3 bg-light rounded shadow">
            <h4>📝 Skriv en anmeldelse</h4>

            {/* 📌 Viser fejl- eller succesbesked */}
            {message && (
                <Alert variant={message.includes("✅") ? "success" : "danger"}>
                    {message}
                </Alert>
            )}

            {/* 📌 Titel-inputfelt */}
            <Form.Group className="mb-3">
                <Form.Label>Titel</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </Form.Group>

            {/* 📌 Tekstfelt til anmeldelsen */}
            <Form.Group className="mb-3">
                <Form.Label>Din anmeldelse</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </Form.Group>

            {/* 📌 Send-knap */}
            <Button type="submit" variant="primary">Send</Button>
        </Form>
    );
}


OpretAnmeldelse.propTypes = {
    setShowForm: PropTypes.func.isRequired,
    fetchAnmeldelser: PropTypes.func.isRequired,
};
