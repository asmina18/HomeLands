import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../LoginForm/LoginForm.module.scss";

/**
 * 📌 LoginForm - Formular til login
 * - Sender inputdata til `onSubmit` (LoginPage)
 * - Viser en loader, hvis `isLoading` er sand
 * - Tilføjer en "Annuller" knap, der navigerer brugeren tilbage til forsiden
 */
export const LoginForm = ({ onSubmit, isLoading }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    /**
     * 🛠 handleSubmit - Sender login-data til `handleLogin` i LoginPage
     * - Forhindrer standard form-adfærd (`event.preventDefault()`)
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ username, password }); // 📡 Sender data til `handleLogin`
    };

    /**
     * 🔙 handleCancel - Navigerer brugeren tilbage til forsiden
     */
    const handleCancel = () => {
        navigate("/"); // 🔄 Sender brugeren til forsiden
    };

    return (
        <div className={styles.loginContainer}>
            <Form onSubmit={handleSubmit} className={styles.loginForm}>
                {/* 📌 Login overskrift */}
                <h2 className="text-start mb-3 fw-bold">Login</h2>
                <p className="text-start text-muted">
                    Indtast dit brugernavn og adgangskode for at logge ind
                </p>

                {/* 🔹 Brugernavn inputfelt */}
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="username">Brugernavn</Form.Label>
                    <Form.Control
                        id="username"
                        type="text"
                        placeholder="Brugernavn"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        aria-label="Indtast dit brugernavn"
                    />
                </Form.Group>

                {/* 🔹 Adgangskode inputfelt */}
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="password">Adgangskode</Form.Label>
                    <Form.Control
                        id="password"
                        type="password"
                        placeholder="Adgangskode"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        aria-label="Indtast din adgangskode"
                    />
                </Form.Group>

                {/* 🔹 Knapper til login og annullering */}
                <div className="d-flex gap-2 justify-content-start">
                    <Button
                        type="submit"
                        variant="dark"
                        className="btn-lg"
                        disabled={isLoading}
                        role="button"
                    >
                        {isLoading ? "Logger ind..." : "Login"}
                    </Button>
                    <Button
                        variant="dark"
                        type="button"
                        className="btn-lg"
                        onClick={handleCancel}
                        role="button"
                    >
                        Annuller
                    </Button>
                </div>
            </Form>
        </div>
    );
};

// 📌 PropTypes validering
LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};
