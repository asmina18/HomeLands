import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap"; // Importer Row og Col for grid layout
import { MedarbejderKort } from "../MedarbejderKort/MedarbejderKort"; // Importér MedarbejderKort komponenten
import { useGet } from "../../hooks/useGet"; // Hent data med useGet

export function MedarbejderListe() {
  const { data, error, isLoading } = useGet("https://api.mediehuset.net/homelands/staff");
  const [ansatte, setAnsatte] = useState([]);

  useEffect(() => {
    if (data?.items) {
      setAnsatte(data.items); // Opdater ansatte, når data er hentet
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Mød vores ansatte</h2>
      <Row className="g-4 justify-content-center">
        {ansatte.map((medarbejder) => (
          <Col key={medarbejder.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <MedarbejderKort medarbejder={medarbejder} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
