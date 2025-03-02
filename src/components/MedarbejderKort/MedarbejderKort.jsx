import { useState } from "react";
import { Card } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import PropTypes from "prop-types"; // Importer PropTypes

export function MedarbejderKort({ medarbejder }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={`shadow-sm border-2px h-100`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: "100%" }} // Brug 100% bredde for responsivitet
    >
      <Card.Img
        variant="top"
        src={medarbejder.image || "/placeholder.jpg"}
        alt={medarbejder.firstname + " " + medarbejder.lastname}
      />
      <Card.Body className={`text-start ${isHovered ? 'bg-secondary' : ''}`}>
        <Card.Title className="fw-bold fs-6">
          {medarbejder.firstname} {medarbejder.lastname}
        </Card.Title>
        <Card.Text className="text-muted">{medarbejder.position}</Card.Text>

        {isHovered && (
          <div>
            <p><FaEnvelope /> {medarbejder.email}</p>
            <p><FaPhoneAlt /> {medarbejder.phone}</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

// Tilføj PropTypes for at sikre korrekt datavalidering
MedarbejderKort.propTypes = {
  medarbejder: PropTypes.shape({
    image: PropTypes.string,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
