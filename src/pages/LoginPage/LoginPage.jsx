import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { FejlMeddelelse } from "../../components/FejlMeddelelse/FejlMeddelelse";

/**
 * 📌 LoginPage - Håndterer login og logout
 * - Sender login-anmodning til API'et
 * - Gemmer brugerdata i Context og sessionStorage
 * - Navigerer brugeren videre ved succes
 * - Viser login-status og logout-knap
 */
export const LoginPage = () => {
    const navigate = useNavigate(); // 📌 Bruges til at navigere brugeren efter login
    const { userData, setUserData } = useContext(UserContext);
    const [error, setError] = useState(null); // 📌
    const [isLoading, setIsLoading] = useState(false);

    /**
     * 🛠 handleLogin - Håndterer login-anmodningen
     * - Sender brugernavn og adgangskode til API'et
     * - Gemmer brugerdata ved succes
     */
    const handleLogin = async ({ username, password }) => {
        setIsLoading(true);
        setError(null);

        const body = new URLSearchParams();
        body.append("username", username);
        body.append("password", password);

        const options = {
            method: "POST",
            body: body,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        };

        try {
            const response = await fetch("https://api.mediehuset.net/token", options);

            // 📌 Hvis API’et returnerer en fejlstatus, håndteres det her
            if (!response.ok) {
                throw new Error(`Fejl ${response.status}: Ugyldigt login`);
            }

            const data = await response.json();
            console.log("📡 Server response:", data); // 🔹 Debugging - viser API-responsen i console

            // 📌 Hvis login er succesfuldt, gemmer vi brugerdata
            if (data.access_token) {
                setUserData(data); // 🔹 Opdaterer brugerens login-data i Context
                sessionStorage.setItem("user", JSON.stringify(data)); // 🔹 Gemmer i sessionStorage
                console.log("✅ Bruger logget ind:", data.user.username);
                navigate("/"); // 🔹 Navigerer brugeren til forsiden
            } else {
                setError("Forkert brugernavn eller adgangskode.");
            }
        } catch (err) {
            setError(err.message || "Der opstod en fejl. Prøv igen.");
            console.error("❌ Login fejl:", err);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * 🔓 handleLogout - Håndterer brugerens logout
     * - Fjerner brugerdata fra Context og sessionStorage
     * - Navigerer brugeren tilbage til login-siden
     */
    const handleLogout = () => {
        setUserData(null);
        sessionStorage.removeItem("user");
        console.log("🔓 Bruger logget ud");
        navigate("/login");
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div className="login-container">
                {/* 📌 Viser enten en velkomstbesked eller "Login" */}
                <h2 className="text-center mb-4">{userData ? "Velkommen tilbage!" : "Login"}</h2>

                {/* 📌 Fejl- og loadinghåndtering */}
                <FejlMeddelelse error={error} isLoading={isLoading} />

                {/* 📌 Hvis brugeren er logget ind, vis logout-knap */}
                {userData ? (
                    <>
                        <p>Du er logget ind som <strong>{userData.user.username}</strong></p>
                        <Button variant="dark" onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    // 📌 Hvis brugeren ikke er logget ind, vis login-formular
                    <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
                )}
            </div>
        </Container>
    );
};
