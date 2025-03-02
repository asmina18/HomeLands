import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../../context/UserContext";
import { Form, Button, Container, Alert } from "react-bootstrap";

/**
 * 📌 OpdaterAnmeldelse - Formular til opdatering af en anmeldelse
 * - Kun synlig for den bruger, der har oprettet anmeldelsen
 * - Opdaterer anmeldelsen i API'et og opdaterer listen bagefter
 */
export function OpdaterAnmeldelse({ reviewToEdit, setShowForm, fetchAnmeldelser }) {
    const { userData } = useContext(UserContext);

    // 📌 State til at håndtere inputfelter og status
    const [titel, setTitel] = useState("");
    const [anmeldelse, setAnmeldelse] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null); //

    /**
     * 🔄 useEffect - Når vi åbner formularen, udfyldes felterne med den valgte anmeldelse
     */
    useEffect(() => {
        if (reviewToEdit) {
            setTitel(reviewToEdit.title || "");
            setAnmeldelse(reviewToEdit.content || "");
        }
    }, [reviewToEdit]);

    /**
     * 🛠 handleSubmit - Opdaterer anmeldelsen i API'et
     * - Sender de nye data til API'et
     * - Hvis opdateringen lykkes, vises en succesbesked
     * - Listen af anmeldelser opdateres bagefter
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        // 🚨 Sikrer, at brugeren er logget ind
        if (!userData || !userData.user_id) {
            console.error("⚠ Bruger ikke logget ind eller user_id mangler!");
            setMessage("❌ Du skal være logget ind for at opdatere en anmeldelse.");
            setIsSubmitting(false);
            return;
        }

        // 📌 Opretter data, der sendes til API'et
        const body = new URLSearchParams();
        body.append("title", titel);
        body.append("content", anmeldelse);
        body.append("user_id", userData.user_id);

        const options = {
            method: "PUT",
            body: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${userData.access_token}`,
            },
        };

        try {
            // 📡 Sender de nye data til API'et
            const response = await fetch(`https://api.mediehuset.net/homelands/reviews/${reviewToEdit.id}`, options);
            const data = await response.json();
            console.log("📡 Anmeldelse opdateret:", data);

            if (data.status === "Ok") {
                setMessage("✅ Din anmeldelse er blevet opdateret!");
                fetchAnmeldelser(); // 🔄 Opdaterer listen af anmeldelser
                setTimeout(() => setShowForm(false), 2000);
            } else {
                setMessage("❌ Der opstod en fejl. Prøv igen.");
            }
        } catch (error) {
            console.error("❌ Fejl ved opdatering:", error);
            setMessage("❌ Kunne ikke opdatere anmeldelsen.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container className="mt-3 p-3 bg-light rounded shadow">
            <h4>✏️ Opdater din anmeldelse</h4>

            {/* 📌 Viser fejl- eller succesmeddelelse */}
            {message && <Alert variant={message.includes("✅") ? "success" : "danger"}>{message}</Alert>}

            <Form onSubmit={handleSubmit}>
                {/* 📌 Titel-inputfelt */}
                <Form.Group className="mb-3">
                    <Form.Label>Titel</Form.Label>
                    <Form.Control
                        type="text"
                        value={titel}
                        onChange={(e) => setTitel(e.target.value)}
                        required
                    />
                </Form.Group>

                {/* 📌 Tekstfelt til anmeldelsen */}
                <Form.Group className="mb-3">
                    <Form.Label>Din anmeldelse</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={anmeldelse}
                        onChange={(e) => setAnmeldelse(e.target.value)}
                        required
                    />
                </Form.Group>

                {/* 📌 Knapper til opdatering eller annullering */}
                <div className="d-flex gap-2">
                    <Button type="submit" variant="warning" disabled={isSubmitting}>
                        {isSubmitting ? "Opdaterer..." : "Opdater"}
                    </Button>
                    <Button variant="secondary" type="button" onClick={() => setShowForm(false)}>
                        Annuller
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

// ✅ Tilføj prop-types validation
OpdaterAnmeldelse.propTypes = {
    reviewToEdit: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        content: PropTypes.string,
    }).isRequired,
    setShowForm: PropTypes.func.isRequired,
    fetchAnmeldelser: PropTypes.func.isRequired,
};
