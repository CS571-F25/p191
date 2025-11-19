import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Hero({ title, subtitle, buttonText, buttonLink }) {
    return (
        <div className="bg-primary text-white py-5">
            <Container>
                <Row className="justify-content-center text-center">
                    <Col lg={8}>
                        <h1 className="display-4 fw-bold mb-4">
                            {title || "Welcome to My Portfolio"}
                        </h1>
                        <p className="lead mb-4">
                            {subtitle || "I'm a passionate developer creating amazing web experiences"}
                        </p>
                        {buttonText && buttonLink && (
                            <Button 
                                as={Link} 
                                to={buttonLink} 
                                variant="light" 
                                size="lg"
                                className="px-4"
                            >
                                {buttonText}
                            </Button>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}