import { Container, Row, Col, Card, Nav, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function COSMECShipCodex() {
    const [activeSection, setActiveSection] = useState('capital');
    const navigate = useNavigate();

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const shipCategories = [
        { id: 'capital', name: 'Capital Ship', icon: '/p191/Images/Icons/CapitalShip.png' },
        { id: 'cruiser', name: 'Cruiser', icon: '/p191/Images/Icons/Cruiser.png' },
        { id: 'destroyer', name: 'Destroyer', icon: '/p191/Images/Icons/Destroyer.png' },
        { id: 'frigate', name: 'Frigate', icon: '/p191/Images/Icons/Frigate.png' }
    ];

    const remnantShips = [
        {
            id: 'capital',
            category: 'Capital Ship',
            icon: '/p191/Images/Icons/CapitalShip.png',
            ships: [
                { 
                    id: 'radiant', 
                    name: 'Radiant', 
                    img: 'remnant_battleship.png', 
                    classification: '[REDACTED]',
                    description: 'Automated capital-class vessel of unknown origin. Exhibits advanced AI warfare capabilities and autonomous tactical adaptation.'
                }
            ]
        },
        {
            id: 'cruiser',
            category: 'Cruiser',
            icon: '/p191/Images/Icons/Cruiser.png',
            ships: [
                { 
                    id: 'brilliant', 
                    name: 'Brilliant', 
                    img: 'remnant_cruiser1.png',
                    classification: 'Alpha-Class Automaton',
                    description: 'Mid-weight autonomous warship with advanced energy weapon systems and shield technology.'
                }
            ]
        },
        {
            id: 'destroyer',
            category: 'Destroyer',
            icon: '/p191/Images/Icons/Destroyer.png',
            ships: [
                { 
                    id: 'glimmer', 
                    name: 'Glimmer', 
                    img: 'remnant_destroyer1.png',
                    classification: 'Beta-Class Automaton',
                    description: 'Fast-response destroyer with phasing capabilities and plasma-based weaponry.'
                }
            ]
        },
        {
            id: 'frigate',
            category: 'Frigate',
            icon: '/p191/Images/Icons/Frigate.png',
            ships: [
                { 
                    id: 'lumen', 
                    name: 'Lumen', 
                    img: 'remnant_frigate1.png',
                    classification: 'Gamma-Class Automaton',
                    description: 'Light reconnaissance and patrol unit with advanced sensor arrays.'
                },
                { 
                    id: 'spark', 
                    name: 'Spark', 
                    img: 'remnant_frigate2.png',
                    classification: 'Gamma-Class Automaton',
                    description: 'Fast attack frigate designed for swarm tactics and hit-and-run operations.'
                }
            ]
        }
    ];

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

        <div style={{
            backgroundColor: '#0a0000',
            minHeight: '100vh',
            paddingTop: '2rem',
            paddingBottom: '2rem'
        }}>
            <Container fluid className="px-4">
                <Row>
                    {/* Sidebar Navigation */}
                    <Col md={3} lg={2} className="mb-4">
                        <div style={{ position: 'sticky', top: '80px' }}>
                            <Card style={{ 
                                backgroundColor: 'rgba(26, 0, 0, 0.95)',
                                border: '1px solid #ff4444'
                            }}>
                                <Card.Header style={{ 
                                    backgroundColor: 'rgba(255, 68, 68, 0.1)',
                                    borderBottom: '2px solid #ff4444',
                                    padding: '1rem'
                                }}>
                                    <h5 style={{ color: '#ff4444', marginBottom: 0 }}>Quick Navigation</h5>
                                </Card.Header>
                                <Card.Body className="p-0">
                                    <Nav className="flex-column">
                                        {shipCategories.map(category => (
                                            <Nav.Link
                                                key={category.id}
                                                onClick={() => scrollToSection(category.id)}
                                                style={{
                                                    color: activeSection === category.id ? '#ff4444' : '#ffcccc',
                                                    backgroundColor: activeSection === category.id ? 'rgba(255, 68, 68, 0.1)' : 'transparent',
                                                    borderLeft: activeSection === category.id ? '3px solid #ff4444' : '3px solid transparent',
                                                    padding: '0.75rem 1rem',
                                                    transition: 'all 0.2s',
                                                    cursor: 'pointer'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (activeSection !== category.id) {
                                                        e.currentTarget.style.backgroundColor = 'rgba(255, 68, 68, 0.05)';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (activeSection !== category.id) {
                                                        e.currentTarget.style.backgroundColor = 'transparent';
                                                    }
                                                }}
                                            >
                                                {category.name}
                                            </Nav.Link>
                                        ))}
                                    </Nav>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>

                    {/* Main Content */}
                    <Col md={9} lg={10}>
                {/* Header */}
                <Card className="mb-4" style={{ 
                    backgroundColor: 'rgba(26, 0, 0, 0.85)',
                    border: '2px solid #ff4444'
                }}>
                    <Card.Body className="text-center py-4">
                        <h1 className="text-light mb-2" style={{
                            color: '#ff4444',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            textShadow: '0 0 10px #ff0000'
                        }}>Remnant Ship Database</h1>
                        <p style={{ color: '#ffaaaa', fontSize: '1.05rem' }}>
                            [CLASSIFIED] - Automated Threat Assessment Archives
                        </p>
                        <p style={{ color: '#ff6666', fontSize: '0.9rem', fontStyle: 'italic' }}>
                            WARNING: These vessels operate autonomously and are highly dangerous
                        </p>
                    </Card.Body>
                </Card>

                {/* Ship Categories */}
                {remnantShips.map((category, catIndex) => (
                    <div key={catIndex} id={category.id} className="mb-5" style={{ scrollMarginTop: '80px' }}>
                        <Card style={{ 
                            backgroundColor: 'rgba(26, 0, 0, 0.95)',
                            border: '1px solid rgba(255, 68, 68, 0.3)'
                        }}>
                            <Card.Header style={{ 
                                backgroundColor: 'rgba(255, 68, 68, 0.1)',
                                borderBottom: '2px solid #ff4444'
                            }}>
                                <h3 className="text-light mb-0" style={{ display: 'flex', alignItems: 'center' }}>
                                    <img 
                                        src={category.icon} 
                                        alt={category.category} 
                                        style={{ 
                                            width: '32px', 
                                            height: '32px', 
                                            marginRight: '12px',
                                            filter: 'brightness(0) saturate(100%) invert(38%) sepia(91%) saturate(2820%) hue-rotate(338deg) brightness(101%) contrast(104%)'
                                        }} 
                                    />
                                    {category.category}
                                </h3>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    {category.ships.map((ship, shipIndex) => (
                                        <Col md={6} lg={4} key={shipIndex} className="mb-4">
                                            <Card style={{ 
                                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                border: '1px solid rgba(255, 68, 68, 0.2)',
                                                transition: 'all 0.3s',
                                                height: '100%',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => navigate(`/cosmec/ships/${ship.id}`)}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-5px)';
                                                e.currentTarget.style.borderColor = '#ff4444';
                                                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 68, 68, 0.4)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.borderColor = 'rgba(255, 68, 68, 0.2)';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}>
                                                {/* Ship Image */}
                                                <div style={{ 
                                                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                                    padding: '1.5rem',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    minHeight: '200px',
                                                    borderBottom: '1px solid rgba(255, 68, 68, 0.2)'
                                                }}>
                                                    <img 
                                                        src={`/p191/Images/Ships/Remnant/${ship.img}`}
                                                        alt={ship.name}
                                                        style={{
                                                            maxWidth: '100%',
                                                            maxHeight: '180px',
                                                            objectFit: 'contain',
                                                            filter: 'drop-shadow(0 0 10px rgba(255, 68, 68, 0.5))'
                                                        }}
                                                        onError={(e) => {
                                                            e.target.src = 'https://via.placeholder.com/200x150/0a0000/ff4444?text=' + ship.name;
                                                        }}
                                                    />
                                                </div>

                                                <Card.Body>
                                                    {/* Ship Name */}
                                                    <Card.Title style={{ 
                                                        color: '#ff4444',
                                                        fontSize: '1.25rem',
                                                        fontWeight: 'bold',
                                                        marginBottom: '0.5rem'
                                                    }}>
                                                        {ship.name}
                                                    </Card.Title>
                                                    
                                                    {/* Classification */}
                                                    <Card.Subtitle style={{ 
                                                        color: '#ffaaaa',
                                                        fontSize: '0.9rem',
                                                        marginBottom: '1rem',
                                                        fontStyle: 'italic'
                                                    }}>
                                                        {ship.classification}
                                                    </Card.Subtitle>

                                                    {/* Description */}
                                                    <Card.Text style={{ fontSize: '0.9rem', color: '#ffcccc' }}>
                                                        {ship.description}
                                                    </Card.Text>

                                                    {/* Threat Warning */}
                                                    <div style={{
                                                        marginTop: '1rem',
                                                        padding: '0.5rem',
                                                        backgroundColor: 'rgba(255, 68, 68, 0.1)',
                                                        border: '1px solid rgba(255, 68, 68, 0.3)',
                                                        borderRadius: '4px'
                                                    }}>
                                                        <p style={{ 
                                                            color: '#ff6666', 
                                                            fontSize: '0.75rem', 
                                                            marginBottom: 0,
                                                            textAlign: 'center'
                                                        }}>
                                                            ⚠ THREAT LEVEL: {
                                                                category.id === 'capital' ? 'EXTREME' :
                                                                category.id === 'cruiser' ? 'HIGH' :
                                                                category.id === 'destroyer' ? 'MEDIUM' : 'LOW'
                                                            }
                                                        </p>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>
                ))}

                {/* Footer Note */}
                <Card style={{ 
                    backgroundColor: 'rgba(26, 0, 0, 0.95)',
                    border: '1px solid #ff4444'
                }}>
                    <Card.Body className="text-center py-3">
                        <p style={{ color: '#ff4444', fontSize: '0.85rem', marginBottom: 0 }}>
                            END OF CLASSIFIED SECTION - COSMEC INTELLIGENCE DIVISION
                        </p>
                    </Card.Body>
                </Card>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    );
}