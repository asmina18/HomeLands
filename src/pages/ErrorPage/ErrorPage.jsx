
import { Title } from '../../components/Title/Title'
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

export const ErrorPage = () => {
    return (
        <Container className="text-center mt-5">
            <Title text className="display-4 text-danger">404 - Not Found</Title>
            <h4 className="mb-4">An unknown error occurred.</h4>
            <Button as={Link} to="/" variant="primary">
                Click here to go back
            </Button>
        </Container>
    )
}