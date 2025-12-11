import { Container, Card, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function COSMEC() {
    return (
        <>
            {/* Custom Navigation for COSMEC */}
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="px-0">
                <Container fluid className="px-4">
                    <Navbar.Brand style={{ color: '#ff4444' }}>COSMEC Database</Navbar.Brand>
                    <Navbar.Toggle aria-controls="cosmec-nav" />
                    <Navbar.Collapse id="cosmec-nav">
                        <Nav className="ms-auto">
                            <Link to="/cosmec" className="nav-link">Home</Link>
                            <Link to="/cosmec/ships" className="nav-link">Ship Codex</Link>
                            <Link to="/" className="nav-link" style={{ color: '#4da6ff' }}>Back to Starsector Guide</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* COSMEC Content */}
            <div style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
                paddingTop: '3rem',
                paddingBottom: '3rem',
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(26, 0, 0, 0.85)',
                    backdropFilter: 'blur(3px)'
                }}></div>
                <Container className="py-5" style={{ position: 'relative', zIndex: 1 }}>
                    <Card className="bg-dark text-light mb-4" style={{ 
                        backgroundColor: 'rgba(0,0,0,0.85)',
                        border: '2px solid #ff4444'
                    }}>
                        <Card.Body className="text-center py-5">
                            <h1 className="display-4 fw-bold mb-3" style={{
                                fontFamily: 'Arial, sans-serif',
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                                color: '#ff4444',
                                textShadow: '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000',
                                fontSize: '3.5rem'
                            }}>COSMEC Database</h1>
                            <p className="lead mb-2" style={{
                                color: '#ffaaaa',
                                fontSize: '1.3rem',
                                fontWeight: '500'
                            }}>Security Test Passed, Welcome Back, Agent.</p>
                        </Card.Body>
                    </Card>

                    {/* Classified Information Cards */}
                    <div className="mt-5">
                        <Card className="mb-4" style={{ 
                            backgroundColor: 'rgba(26, 0, 0, 0.95)',
                            border: '1px solid #ff4444'
                        }}>
                            <Card.Header style={{ 
                                backgroundColor: 'rgba(255, 68, 68, 0.1)',
                                borderBottom: '2px solid #ff4444'
                            }}>
                                <h3 className="text-light mb-0" style={{ color: '#ff4444' }}>
                                    [CLASSIFIED] - Access Level: Omega
                                </h3>
                            </Card.Header>
                            <Card.Body className="text-light">
                                <p style={{ color: '#ffcccc', fontSize: '1.1rem' }}>
                                    Welcome to the Coalition of Scientific and Military Exploration Command (COSMEC) secure database.
                                </p>
                                <p style={{ color: '#ffaaaa' }}>
                                    This system contains classified information regarding operations beyond the Persean Sector. 
                                    Unauthorized access is prohibited and will be reported to Domain security forces.
                                </p>
                            </Card.Body>
                        </Card>

                        <Card className="mb-4" style={{ 
                            backgroundColor: 'rgba(26, 0, 0, 0.95)',
                            border: '1px solid #ff4444'
                        }}>
                            <Card.Header style={{ 
                                backgroundColor: 'rgba(255, 68, 68, 0.1)',
                                borderBottom: '2px solid #ff4444'
                            }}>
                                <h3 className="text-light mb-0" style={{ color: '#ff4444' }}>
                                    [REDACTED] - Project Status
                                </h3>
                            </Card.Header>
                            <Card.Body className="text-light">
                                <ul style={{ color: '#ffcccc', fontSize: '1.1rem' }}>
                                    <li className="mb-2">████████ Initiative: Status Unknown</li>
                                    <li className="mb-2">Deep Space Survey: ████████</li>
                                    <li className="mb-2">Contact Protocol: █████ Activated</li>
                                    <li className="mb-2">Resource Allocation: ████████████</li>
                                </ul>
                            </Card.Body>
                        </Card>

                        <Card style={{ 
                            backgroundColor: 'rgba(26, 0, 0, 0.95)',
                            border: '1px solid #ff4444'
                        }}>
                            <Card.Body className="text-center text-light py-4">
                                <p style={{ color: '#ff4444', fontSize: '0.9rem', marginBottom: 0 }}>
                                    END OF TRANSMISSION - COSMEC CENTRAL COMMAND
                                </p>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
            </div>
        </>
    );
}
