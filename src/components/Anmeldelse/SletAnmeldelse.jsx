import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
/**
 * 📌 SletAnmeldelse - Knap til at slette en anmeldelse
 * - Kun synlig for loggede brugere
 * - Bekræfter sletning med en popup
 * - Opdaterer listen af anmeldelser efter sletning
 */
export function SletAnmeldelse({ reviewId, fetchAnmeldelser }) {
    const { userData } = useContext(UserContext);

    // 📌 Hvis brugeren ikke er logget ind, vises ingenting
    if (!userData) return null;

    /**
     * 🛠 handleDelete - Funktion til at slette anmeldelsen
     * - Viser en bekræftelses-popup
     * - Sender en DELETE-anmodning til API'et
     * - Opdaterer anmeldelseslisten ved succes
     */
    const handleDelete = async () => {
        // 📌 Brugeren skal bekræfte sletningen
        const confirmDelete = window.confirm("Er du sikker på, at du vil slette denne anmeldelse?");
        if (!confirmDelete) return; // 📌 Hvis brugeren trykker "Nej", stopper funktionen

        // 📌 Konfigurer API-kaldet
        const options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${userData.access_token}`,
            },
        };

        try {
            // 📡 Sender DELETE-anmodning til API'et
            const response = await fetch(`https://api.mediehuset.net/homelands/reviews/${reviewId}`, options);

            if (response.ok) {
                fetchAnmeldelser(); // 🔄 Opdaterer listen af anmeldelser efter sletning
            }
        } catch (error) {
            console.error("❌ Fejl ved sletning:", error);
        }
    };

    return (
        <Button variant="danger" onClick={handleDelete}>
            🗑 Slet
        </Button>
    );
}


SletAnmeldelse.propTypes = {
    reviewId: PropTypes.string.isRequired,
    fetchAnmeldelser: PropTypes.func.isRequired,
};
