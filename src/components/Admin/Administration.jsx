import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useGet } from "../../hooks/useGet";
import { Container, Table, Button } from "react-bootstrap";

/**
 * 📌 Administration - Komponent til at vise og administrere anmeldelser
 * - Henter brugerens anmeldelser fra API'et
 * - Giver mulighed for at slette anmeldelser
 */
export const Administration = () => {
    const { userData } = useContext(UserContext); // 📌 Henter brugerdata fra Context
    const [userReviews, setUserReviews] = useState([]); // 📌 State til at gemme brugerens anmeldelser

    // 🔄 Hent data fra API
    const { data, fetchData, isLoading, error } = useGet(
        "https://api.mediehuset.net/homelands/reviews",
        userData?.access_token
    );

    /**
     * 🔄 useEffect overvåger ændringer i `data` og `userData`.
     * - Tjekker først, om `data.items` er et array, og om `userData` findes.
     * - Filtrerer anmeldelser, så kun de, der tilhører den aktuelle bruger, bliver gemt.
     * - Opdaterer `userReviews`, så vi kan vise dem i UI'et.
     */
    useEffect(() => {
        if (Array.isArray(data?.items) && userData) {
            const userReviewsFiltered = data.items.filter(
                (review) => String(review.user?.id || review.user_id) === String(userData?.user_id)
            );
            setUserReviews(userReviewsFiltered);
        }
    }, [data, userData]);

    /**
     * 🗑️ handleDelete - Funktion til at slette en anmeldelse
     * - Spørger brugeren, om de vil slette anmeldelsen
     * - Sender en `DELETE`-anmodning til API'et
     * - Opdaterer listen af anmeldelser, hvis sletningen lykkes
     */
    const handleDelete = async (reviewId) => {
        if (!reviewId) return; // 🔹 Stopper funktionen, hvis `reviewId` mangler

        // 🔹 Bekræfter sletning med brugeren
        if (!window.confirm("Er du sikker på, at du vil slette denne anmeldelse?")) return;

        try {
            const response = await fetch(
                `https://api.mediehuset.net/homelands/reviews/${reviewId}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${userData?.access_token}` },
                }
            );

            if (response.ok) {
                fetchData(); // 🔄 Opdater data efter sletning
            }
        } catch (error) {
            console.error("❌ Fejl ved sletning:", error);
        }
    };

    return (
        <Container>
            <h2>Administration</h2>
            <p>Du er logget ind som admin</p>

            {/* 📌 Viser en besked, hvis data hentes, eller hvis der opstår en fejl */}
            {isLoading && <p>Henter anmeldelser...</p>}
            {error && <p style={{ color: "red" }}>Fejl: {error}</p>}

            {/* 📌 Viser anmeldelser, hvis der er nogen */}
            {userReviews.length > 0 ? (
                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>Dine anmeldelser</th>
                            <th>Dato</th>
                            <th>Handling</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userReviews.map((review) => (
                            <tr key={review.id}>
                                <td>{review.title}</td>
                                {/* 📌 Konverterer timestamp til læsbart format */}
                                <td>{new Date(review.created * 1000).toLocaleDateString("da-DK")}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(review.id)}
                                    >
                                        Slet
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p className="mt-4">Du har ingen anmeldelser endnu.</p>
            )}
        </Container>
    );
};
