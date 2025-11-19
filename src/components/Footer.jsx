import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
    return (
        <footer className="bg-dark text-light py-4 mt-5">
            <Container fluid className="px-4">
                <Row>
                    <Col md={6}>
                        <h5>Starsector Wiki</h5>
                        <p className="mb-1">Community-driven Starsector database</p>
                        <p className="mb-1">Explore the Sector</p>
                    </Col>
                    <Col md={6}>
                        <h5>Quick Navigation</h5>
                        <div>
                            <a href="#" className="text-light me-3">Ship Codex</a>
                            <a href="#" className="text-light me-3">Discussion</a>
                            <a href="#" className="text-light me-3">Guides</a>
                        </div>
                    </Col>
                </Row>
                <hr className="my-3" />
                <Row>
                    <Col className="text-center">
                        <p className="mb-0">
                            &copy; {new Date().getFullYear()} Starsector Wiki. All rights reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}