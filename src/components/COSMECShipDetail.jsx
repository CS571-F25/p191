import { Container, Row, Col, Card, Table, Button, Navbar, Nav } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export default function COSMECShipDetail() {
    const { shipId } = useParams();
    const navigate = useNavigate();
    const [shipData, setShipData] = useState(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load ship data from CSV
        fetch('/p191/Text/ship_data.csv')
            .then(response => response.text())
            .then(csvText => {
                Papa.parse(csvText, {
                    header: true,
                    complete: (results) => {
                        const ship = results.data.find(s => s.id === shipId);
                        setShipData(ship);
                    }
                });
            });

        // Load ship description from descriptions.csv
        fetch('/p191/Text/descriptions.csv')
            .then(response => response.text())
            .then(csvText => {
                Papa.parse(csvText, {
                    header: true,
                    complete: (results) => {
                        const desc = results.data.find(d => d.id === shipId);
                        if (desc) {
                            setDescription(desc.text1 || '');
                        }
                        setLoading(false);
                    }
                });
            });
    }, [shipId]);

    if (loading) {
        return (
            <>
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
                <div style={{ backgroundColor: '#0a0000', minHeight: '100vh', padding: '2rem' }}>
                    <Container className="text-center text-light">
                        <p style={{ color: '#ffcccc' }}>Loading classified data...</p>
                    </Container>
                </div>
            </>
        );
    }

    if (!shipData) {
        return (
            <>
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
                <div style={{ backgroundColor: '#0a0000', minHeight: '100vh', padding: '2rem' }}>
                    <Container className="text-center text-light">
                        <h2 style={{ color: '#ff4444' }}>Ship data not found</h2>
                        <Button variant="outline-danger" onClick={() => navigate('/cosmec/ships')} className="mt-3">
                            Return to Ship Codex
                        </Button>
                    </Container>
                </div>
            </>
        );
    }

    const getShipImagePath = () => {
        return `/p191/Images/Ships/Remnant/remnant_${shipData.id === 'radiant' ? 'battleship' : 
                shipData.id === 'brilliant' ? 'cruiser1' : 
                shipData.id === 'glimmer' ? 'destroyer1' : 
                shipData.id === 'lumen' ? 'frigate1' : 'frigate2'}.png`;
    };

    return (
        <>
            {/* COSMEC Navigation Bar */}
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

            <div style={{ backgroundColor: '#0a0000', minHeight: '100vh', padding: '2rem' }}>
                <Container>
                    <Button 
                        variant="outline-danger" 
                        onClick={() => navigate('/cosmec/ships')} 
                        className="mb-4"
                        style={{ borderColor: '#ff4444', color: '#ff4444' }}
                    >
                        ← Back to Ship Codex
                    </Button>

                    <Row>
                        <Col lg={6} className="mb-4">
                            <Card style={{ 
                                backgroundColor: 'rgba(26, 0, 0, 0.95)',
                                border: '2px solid #ff4444'
                            }}>
                                <Card.Body>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '600px',
                                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                        borderRadius: '8px',
                                        padding: '2rem'
                                    }}>
                                        <img 
                                            src={getShipImagePath()}
                                            alt={shipData.name}
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                objectFit: 'contain',
                                                filter: 'drop-shadow(0 0 15px rgba(255, 68, 68, 0.6))'
                                            }}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/400x300/0a0000/ff4444?text=' + shipData.name;
                                            }}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card className="mb-4" style={{ 
                                backgroundColor: 'rgba(26, 0, 0, 0.95)',
                                border: '2px solid #ff4444'
                            }}>
                                <Card.Header style={{ 
                                    backgroundColor: 'rgba(255, 68, 68, 0.1)',
                                    borderBottom: '2px solid #ff4444'
                                }}>
                                    <h2 className="text-light mb-0" style={{ color: '#ff4444' }}>{shipData.name}</h2>
                                    <p className="mb-0 mt-2" style={{ color: '#ffaaaa', fontSize: '1.1rem' }}>
                                        {shipData['Ship Type']} - {shipData.Manufacturer}
                                    </p>
                                </Card.Header>
                                <Card.Body>
                                    <div style={{
                                        padding: '1rem',
                                        backgroundColor: 'rgba(255, 68, 68, 0.05)',
                                        border: '1px solid rgba(255, 68, 68, 0.3)',
                                        borderRadius: '4px',
                                        marginBottom: '1rem'
                                    }}>
                                        <p style={{ 
                                            color: '#ff6666', 
                                            fontSize: '0.9rem', 
                                            marginBottom: 0,
                                            textAlign: 'center',
                                            fontWeight: 'bold'
                                        }}>
                                            ⚠ CLASSIFIED - THREAT LEVEL: EXTREME ⚠
                                        </p>
                                    </div>
                                    <p style={{ color: '#ffcccc', fontSize: '1rem', lineHeight: '1.6' }}>
                                        {description}
                                    </p>
                                </Card.Body>
                            </Card>

                            <Card style={{ 
                                backgroundColor: 'rgba(26, 0, 0, 0.95)',
                                border: '2px solid #ff4444'
                            }}>
                                <Card.Header style={{ 
                                    backgroundColor: 'rgba(255, 68, 68, 0.1)',
                                    borderBottom: '2px solid #ff4444'
                                }}>
                                    <h4 className="mb-0" style={{ color: '#ff4444' }}>Technical Specifications</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Table bordered hover variant="dark" style={{ marginBottom: 0 }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ color: '#ffaaaa', fontWeight: 'bold' }}>Hull Points</td>
                                                <td style={{ color: '#ffcccc' }}>{shipData.hitpoints || 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ color: '#ffaaaa', fontWeight: 'bold' }}>Armor Rating</td>
                                                <td style={{ color: '#ffcccc' }}>{shipData['Armor rating'] || 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ color: '#ffaaaa', fontWeight: 'bold' }}>Flux Capacity</td>
                                                <td style={{ color: '#ffcccc' }}>{shipData['flux capacity'] || 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ color: '#ffaaaa', fontWeight: 'bold' }}>Flux Dissipation</td>
                                                <td style={{ color: '#ffcccc' }}>{shipData['flux dissipation'] || 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ color: '#ffaaaa', fontWeight: 'bold' }}>Ordnance Points</td>
                                                <td style={{ color: '#ffcccc' }}>{shipData['Ordnance points'] || 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ color: '#ffaaaa', fontWeight: 'bold' }}>Top Speed</td>
                                                <td style={{ color: '#ffcccc' }}>{shipData['Max speed'] || 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ color: '#ffaaaa', fontWeight: 'bold' }}>Cargo Capacity</td>
                                                <td style={{ color: '#ffcccc' }}>{shipData.cargo || 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ color: '#ffaaaa', fontWeight: 'bold' }}>Fuel Capacity</td>
                                                <td style={{ color: '#ffcccc' }}>{shipData.fuel || 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ color: '#ffaaaa', fontWeight: 'bold' }}>Crew</td>
                                                <td style={{ color: '#ffcccc' }}>{shipData['min crew'] || 'N/A'} - {shipData['max crew'] || 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ color: '#ffaaaa', fontWeight: 'bold' }}>Fighter Bays</td>
                                                <td style={{ color: '#ffcccc' }}>{shipData['fighter bays'] || '0'}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ color: '#ffaaaa', fontWeight: 'bold' }}>Deployment Cost</td>
                                                <td style={{ color: '#ffcccc' }}>{shipData['fleet pts'] || 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ color: '#ffaaaa', fontWeight: 'bold' }}>Base Value</td>
                                                <td style={{ color: '#ffcccc' }}>{shipData['base value'] || 'N/A'} credits</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Card className="mt-4" style={{ 
                        backgroundColor: 'rgba(26, 0, 0, 0.95)',
                        border: '1px solid #ff4444'
                    }}>
                        <Card.Body className="text-center py-3">
                            <p style={{ color: '#ff4444', fontSize: '0.85rem', marginBottom: 0 }}>
                                END OF CLASSIFIED ENTRY - COSMEC NAVAL INTELLIGENCE
                            </p>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </>
    );
}
