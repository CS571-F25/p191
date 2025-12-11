import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export default function ShipDetail() {
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
            <div style={{ backgroundColor: '#0a0e1a', minHeight: '100vh', padding: '2rem' }}>
                <Container className="text-center text-light">
                    <p>Loading ship data...</p>
                </Container>
            </div>
        );
    }

    if (!shipData) {
        return (
            <div style={{ backgroundColor: '#0a0e1a', minHeight: '100vh', padding: '2rem' }}>
                <Container className="text-center text-light">
                    <h2>Ship Not Found</h2>
                    <button className="btn btn-primary mt-3" onClick={() => navigate('/ships')}>
                        Back to Ship Codex
                    </button>
                </Container>
            </div>
        );
    }

    return (
        <div style={{
            backgroundColor: '#0a0e1a',
            minHeight: '100vh',
            paddingTop: '2rem',
            paddingBottom: '2rem'
        }}>
            <Container fluid className="px-4">
                {/* Back Button */}
                <button 
                    className="btn btn-outline-primary mb-4"
                    onClick={() => navigate('/ships')}
                    style={{ borderColor: '#4da6ff', color: '#4da6ff' }}
                >
                    ← Back to Ship Codex
                </button>

                {/* Ship Title */}
                <Card className="mb-4" style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    border: '1px solid rgba(77, 166, 255, 0.3)'
                }}>
                    <Card.Body className="py-4">
                        <h1 className="text-light mb-0" style={{
                            color: '#4da6ff',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}>
                            {shipData.name || shipId}
                        </h1>
                        {shipData.designation && (
                            <p className="text-muted mb-0 mt-2">{shipData.designation}</p>
                        )}
                    </Card.Body>
                </Card>

                <Row>
                    {/* Ship Image */}
                    <Col lg={5} className="mb-4">
                        <Card style={{ 
                            backgroundColor: 'rgba(33, 37, 41, 0.95)',
                            border: '1px solid rgba(77, 166, 255, 0.3)',
                            padding: '2rem',
                            height: '600px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                border: '2px solid #4da6ff',
                                borderRadius: '8px',
                                padding: '1rem',
                                overflow: 'hidden'
                            }}>
                                <img 
                                    src={`/p191/Images/Ships/${getShipCategory(shipId)}/${getShipImageFilename(shipId)}`}
                                    alt={shipData.name}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        width: 'auto',
                                        height: 'auto',
                                        objectFit: 'contain'
                                    }}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/400x300/1a1f2e/4da6ff?text=' + shipData.name;
                                    }}
                                />
                            </div>
                        </Card>
                    </Col>

                    {/* Ship Stats */}
                    <Col lg={7} className="mb-4">
                        <Card style={{ 
                            backgroundColor: 'rgba(33, 37, 41, 0.95)',
                            border: '1px solid rgba(77, 166, 255, 0.3)'
                        }}>
                            <Card.Header style={{ 
                                backgroundColor: 'rgba(77, 166, 255, 0.1)',
                                borderBottom: '2px solid #4da6ff'
                            }}>
                                <h4 className="text-light mb-0">Ship Statistics</h4>
                            </Card.Header>
                            <Card.Body>
                                <Table bordered variant="dark" style={{ marginBottom: 0 }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ backgroundColor: 'rgba(77, 166, 255, 0.1)', fontWeight: 'bold' }}>Class</td>
                                            <td>{shipData.designation || 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ backgroundColor: 'rgba(77, 166, 255, 0.1)', fontWeight: 'bold' }}>Tech/Manufacturer</td>
                                            <td>{shipData['tech/manufacturer'] || 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ backgroundColor: 'rgba(77, 166, 255, 0.1)', fontWeight: 'bold' }}>Fleet Points</td>
                                            <td>{shipData['fleet pts'] || 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ backgroundColor: 'rgba(77, 166, 255, 0.1)', fontWeight: 'bold' }}>Hitpoints</td>
                                            <td>{shipData.hitpoints || 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ backgroundColor: 'rgba(77, 166, 255, 0.1)', fontWeight: 'bold' }}>Armor Rating</td>
                                            <td>{shipData['armor rating'] || 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ backgroundColor: 'rgba(77, 166, 255, 0.1)', fontWeight: 'bold' }}>Max Flux</td>
                                            <td>{shipData['max flux'] || 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ backgroundColor: 'rgba(77, 166, 255, 0.1)', fontWeight: 'bold' }}>Flux Dissipation</td>
                                            <td>{shipData['flux dissipation'] || 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ backgroundColor: 'rgba(77, 166, 255, 0.1)', fontWeight: 'bold' }}>Max Speed</td>
                                            <td>{shipData['max speed'] || 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ backgroundColor: 'rgba(77, 166, 255, 0.1)', fontWeight: 'bold' }}>Shield Type</td>
                                            <td>{shipData['shield type'] || 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ backgroundColor: 'rgba(77, 166, 255, 0.1)', fontWeight: 'bold' }}>Crew (Min/Max)</td>
                                            <td>{shipData['min crew'] && shipData['max crew'] ? `${shipData['min crew']} / ${shipData['max crew']}` : 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ backgroundColor: 'rgba(77, 166, 255, 0.1)', fontWeight: 'bold' }}>Cargo Capacity</td>
                                            <td>{shipData.cargo || 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ backgroundColor: 'rgba(77, 166, 255, 0.1)', fontWeight: 'bold' }}>Fuel Capacity</td>
                                            <td>{shipData.fuel || 'N/A'}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Ship Description */}
                {description && (
                    <Row>
                        <Col className="mb-4">
                            <Card style={{ 
                                backgroundColor: 'rgba(33, 37, 41, 0.95)',
                                border: '1px solid rgba(77, 166, 255, 0.3)'
                            }}>
                                <Card.Header style={{ 
                                    backgroundColor: 'rgba(77, 166, 255, 0.1)',
                                    borderBottom: '2px solid #4da6ff'
                                }}>
                                    <h4 className="text-light mb-0">Description</h4>
                                </Card.Header>
                                <Card.Body>
                                    <p className="text-light" style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                                        {description}
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
}

// Helper function to determine ship category folder based on actual ship classification
function getShipCategory(shipId) {
    // Map ships to their actual category folders as organized in the image structure
    const categoryMap = {
        // Capital Ships
        'onslaught': 'Capital_Ship',
        'astral': 'Capital_Ship',
        'conquest': 'Capital_Ship',
        'legion': 'Capital_Ship',
        'paragon': 'Capital_Ship',
        'pegasus': 'Capital_Ship',
        // Cruisers
        'dominator': 'Cruiser',
        'apogee': 'Cruiser',
        'aurora': 'Cruiser',
        'colossus': 'Cruiser',
        'eradicator': 'Cruiser',
        'gryphon': 'Cruiser',
        'heron': 'Cruiser',
        'mora': 'Cruiser',
        'nebula': 'Cruiser',
        'venture': 'Cruiser',
        // Destroyers
        'enforcer': 'Destroyer',
        'buffalo': 'Destroyer',
        'gemini': 'Destroyer',
        'hammerhead': 'Destroyer',
        'harbinger': 'Destroyer',
        'manticore': 'Destroyer',
        'medusa': 'Destroyer',
        'mule': 'Destroyer',
        'shrike': 'Destroyer',
        'sunder': 'Destroyer',
        'valkyrie': 'Destroyer',
        // Frigates
        'lasher': 'Frigate',
        'gremlin': 'Frigate',
        'hound': 'Frigate',
        'mudskipper': 'Frigate',
        'omen': 'Frigate',
        'scarab': 'Frigate',
        'wayfarer': 'Frigate',
        'wolf': 'Frigate'
    };
    
    return categoryMap[shipId] || 'Frigate'; // Default to Frigate if not found
}

// Helper function to get the correct image filename for a ship
function getShipImageFilename(shipId) {
    const imageMap = {
        // Capital Ships
        'onslaught': 'onslaught_base.png',
        'astral': 'astral.png',
        'conquest': 'conquest.png',
        'legion': 'legion.png',
        'paragon': 'paragon.png',
        'pegasus': 'pegasus.png',
        // Cruisers
        'dominator': 'dominator_base.png',
        'apogee': 'apogee_cx.png',
        'aurora': 'aurora_ca.png',
        'colossus': 'colossus.png',
        'eradicator': 'eradicator_base.png',
        'gryphon': 'gryphon.png',
        'heron': 'heron.png',
        'mora': 'mora.png',
        'nebula': 'nebula.png',
        'venture': 'venture.png',
        // Destroyers
        'enforcer': 'enforcer_base.png',
        'buffalo': 'buffalo_af.png',
        'gemini': 'gemini_base.png',
        'hammerhead': 'hammerhead_base.png',
        'harbinger': 'harbinger.png',
        'manticore': 'manticore_base.png',
        'medusa': 'medusa.png',
        'mule': 'mule_base.png',
        'shrike': 'shrike_base.png',
        'sunder': 'sunder.png',
        'valkyrie': 'valkyrie_ap.png',
        // Frigates
        'lasher': 'lasher_base.png',
        'gremlin': 'gremlin.png',
        'hound': 'hound_base.png',
        'mudskipper': 'mudskipper.png',
        'omen': 'omen.png',
        'scarab': 'scarab.png',
        'wayfarer': 'wayfarer.png',
        'wolf': 'wolf_base.png'
    };
    return imageMap[shipId] || `${shipId}.png`;
}
