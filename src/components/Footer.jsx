import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-dark text-light py-4 mt-5">
            <Container fluid className="px-4">
                <Row>
                    <Col md={6}>
                        <h5>Starsector Guide</h5>
                        <p className="mb-1">Community-driven Starsector database</p>
                        <p className="mb-1">Explore the Sector</p>
                    </Col>
                    <Col md={6} className="text-md-end">
                        <h5>Quick Navigation</h5>
                        <div>
                            <Link to="/" className="text-light me-3">Home</Link>
                            <Link to="/ships" className="text-light me-3">Ship Codex</Link>
                            <Link to="/world" className="text-light me-3">World</Link>
                            <Link to="/discussion" className="text-light">Discussion</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}