import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Container, Button } from "react-bootstrap";
import { OpretAnmeldelse } from "../Anmeldelse/OpretAnmeldelse";
import { OpdaterAnmeldelse } from "../Anmeldelse/OpdaterAnmedelse";
import { SletAnmeldelse } from "../Anmeldelse/SletAnmeldelse";
import { useGet } from "../../hooks/useGet";
import { FejlMeddelelse } from "../FejlMeddelelse/FejlMeddelelse"; // 📌 Importeret fejlkomponent

/**
 * 📌 Anmeldelser - Komponent til at vise og administrere kundeanmeldelser
 * - Henter anmeldelser fra API'et
 * - Viser en tilfældig anmeldelse
 * - Giver brugeren mulighed for at skrive, redigere eller slette sin anmeldelse
 */
export function Anmeldelser() {
    const { userData } = useContext(UserContext);

    // 📌 Henter anmeldelser fra API'et
    const { data, error, isLoading } = useGet("https://api.mediehuset.net/homelands/reviews", userData?.access_token);
    const [randomReview, setRandomReview] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [reviewToEdit, setReviewToEdit] = useState(null);

    /**
     * 🛠 useEffect - Når data ændrer sig, vælger vi en tilfældig anmeldelse
     */
    useEffect(() => {
        if (data?.items?.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.items.length);
            setRandomReview(data.items[randomIndex]);
        }

        console.log("📡 Anmeldelsesdata:", data); // 🔹 Kun til debugging
        console.log("❌ Fejl:", error);
    }, [data, error]);

    /**
     * 🔄 Funktion til at opdatere anmeldelser efter ændringer
     */
    const fetchAnmeldelser = () => {
        window.location.reload(); // 🔄 Opdaterer siden for at hente nye anmeldelser
    };

    return (
        <Container fluid className="mt-3 text-center">
            <h3><strong>Det siger kunderne:</strong></h3>

            {/* 📌 Fejl- og loadinghåndtering med `FejlMeddelelse` */}
            <FejlMeddelelse error={error} isLoading={isLoading} />

            {/* 📌 Hvis der ikke er nogen anmeldelser, vis en advarsel */}
            {!randomReview && <p className="mt-3">Ingen anmeldelser fundet.</p>}

            {/* 📌 Vis en tilfældig anmeldelse */}
            {randomReview && (
                <div className="p-4 mt-3 rounded" style={{ backgroundColor: "#FED9C9" }}>
                    <h5><strong>{randomReview.title}</strong></h5>
                    <p className="fst-italic">{randomReview.content}</p>
                    <p>{randomReview.user?.firstname} {randomReview.user?.lastname}, {randomReview.created}</p>

                    {/* 📌 Hvis brugeren ejer anmeldelsen, kan de redigere eller slette den */}
                    {userData?.user_id === randomReview?.user?.id && (
                        <div className="d-flex gap-2 justify-content-center">
                            <Button
                                variant="warning"
                                onClick={() => {
                                    setReviewToEdit(randomReview);
                                    setEditMode(true);
                                    setShowForm(true);
                                }}
                            >
                                ✏️ Rediger
                            </Button>
                            <SletAnmeldelse reviewId={randomReview.id} fetchAnmeldelser={fetchAnmeldelser} />
                        </div>
                    )}
                </div>
            )}

            {/* 📌 Knap til at vise/skjule anmeldelsesformular */}
            <a
                href="#"
                className="text-primary mt-3 d-block"
                onClick={(e) => {
                    e.preventDefault();
                    setShowForm(!showForm);
                }}
            >
                {showForm ? "Skjul anmeldelsesformular" : "Skriv en anmeldelse"}
            </a>

            {/* 📌 Vis enten opdateringsformular eller oprettelsesformular */}
            {showForm && (
                editMode ? (
                    <OpdaterAnmeldelse
                        reviewToEdit={reviewToEdit}
                        setShowForm={setShowForm}
                        fetchAnmeldelser={fetchAnmeldelser}
                    />
                ) : (
                    <OpretAnmeldelse setShowForm={setShowForm} fetchAnmeldelser={fetchAnmeldelser} />
                )
            )}
        </Container>
    );
}
