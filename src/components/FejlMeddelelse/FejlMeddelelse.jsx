import { Spinner, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

/**
 * 📌 FejlMeddelelse - Håndterer fejl, loading-tilstand og tomme data
 * - Viser en spinner, hvis data loader
 * - Viser en fejlbesked, hvis der er en fejl
 * - Advarer, hvis der ikke findes nogen boliger (kun hvis `homes` faktisk bruges)
 * - Advarer, hvis en specifik bolig ikke findes
 */
export function FejlMeddelelse({ error, isLoading, homes, bolig }) {
  return (
    <section aria-live="polite" className="mt-5">
      {/* 🔹 Viser en spinner, mens data indlæses */}
      {isLoading && <Spinner animation="border" className="d-block mx-auto" />}

      {/* 🔹 Viser fejlbesked, hvis API-kaldet fejler */}
      {error && <Alert variant="danger">Fejl: {error}</Alert>}

      {/* 🔹 Vis kun "Ingen boliger fundet" hvis `homes` faktisk er defineret */}
      {Array.isArray(homes) && homes.length === 0 && (
        <Alert variant="warning">Ingen boliger fundet.</Alert>
      )}

      {/* 🔹 Hvis en specifik bolig ikke findes, vis en advarsel */}
      {bolig === null && <Alert variant="warning">Boligen blev ikke fundet.</Alert>}
    </section>
  );
}

// 📌 PropTypes validering
FejlMeddelelse.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  homes: PropTypes.array, // 🔹 Gør den valgfri, så den ikke giver fejl
  bolig: PropTypes.object,
};
