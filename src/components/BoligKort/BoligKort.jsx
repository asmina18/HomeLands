// 📌 Denne komponent viser detaljer om én bolig i et kort
import { Card } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export function BoligKort({ item }) {
  return (

    // 📌 Gør hele kortet klikbart og linker til boligdetaljesiden
    // - `to={`/boliger/${item.id}`}` skaber en unik URL for hver bolig
    // - React Router håndterer navigationen uden at reloade siden

    <Link to={`/boliger/${item.id}`} className="text-decoration-none">
      <Card className="shadow-sm border-0">
        {/* 📌 Boligens billede */}
        <Card.Img
          variant="top"
          src={item.images?.[0]?.filename?.large || "/placeholder.jpg"}
          alt={item.address || "Bolig"}
          className="card-img-top"
        />

        <Card.Body className="text-start">
          {/* 📌 Adresse */}
          <Card.Title className="fw-bold fs-6">
            {item.address || "Ukendt adresse"}
          </Card.Title>

          {/* 📌 Postnummer & By */}
          <Card.Text className="text-muted small">
            {item.zipcode ? `${item.zipcode} ${item.city}` : "Ikke oplyst"}
          </Card.Text>

          {/* 📌 Energimærke & Favorit-knap */}
          <div className="d-flex align-items-center justify-content-between mt-2">
            <span className="fw-bold text-success bg-light p-1 rounded small">
              {item.energy_label_name || "N/A"}
            </span>
            <button className="border-0 bg-transparent p-0" aria-label="Tilføj til favoritter">
              <FaHeart className="text-danger" />
            </button>
          </div>

          {/* 📌 Boligtype, areal & antal værelser */}
          <Card.Text className="small">
            {item.type} - {item.floor_space} m², {item.num_rooms} værelser
          </Card.Text>

          {/* 📌 Pris */}
          <Card.Text className="fw-bold fs-6 mt-2">
            {item.price ? `${parseFloat(item.price).toLocaleString()} DKK` : "Pris ikke oplyst"}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

// 📌 PropTypes validering
BoligKort.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    address: PropTypes.string,
    zipcode: PropTypes.string,
    city: PropTypes.string,
    type: PropTypes.string,
    energy_label_name: PropTypes.string,
    floor_space: PropTypes.number,
    num_rooms: PropTypes.number,
    price: PropTypes.number,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        filename: PropTypes.shape({
          large: PropTypes.string,
        }),
      })
    ),
  }).isRequired,
};
