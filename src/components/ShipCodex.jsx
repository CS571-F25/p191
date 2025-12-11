import { Container, Row, Col, Nav, Card } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ShipCodex(props) {
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

    const ships = {
        capital: [
            { id: 'onslaught', name: 'Onslaught', img: 'onslaught_base.png', description: 'Heavy assault battleship with massive firepower' },
            { id: 'astral', name: 'Astral', img: 'astral.png', description: 'Advanced fleet carrier with superior strike craft capacity' },
            { id: 'conquest', name: 'Conquest', img: 'conquest.png', description: 'Fast battlecruiser with long-range firepower' },
            { id: 'legion', name: 'Legion', img: 'legion.png', description: 'Balanced battlecarrier with fighter support' },
            { id: 'paragon', name: 'Paragon', img: 'paragon.png', description: 'High-tech battleship with exceptional shields' },
            { id: 'pegasus', name: 'Pegasus', img: 'pegasus.png', description: 'Military transport and logistics vessel' }
        ],
        cruiser: [
            { id: 'dominator', name: 'Dominator', img: 'dominator_base.png', description: 'Heavily armored combat cruiser' },
            { id: 'apogee', name: 'Apogee', img: 'apogee_cx.png', description: 'Exploration cruiser with good all-around capabilities' },
            { id: 'aurora', name: 'Aurora', img: 'aurora_ca.png', description: 'High-tech missile cruiser with plasma cannons' },
            { id: 'colossus', name: 'Colossus', img: 'colossus.png', description: 'Heavy hauler and logistics cruiser' },
            { id: 'eradicator', name: 'Eradicator', img: 'eradicator_base.png', description: 'Fast attack cruiser with powerful energy weapons' },
            { id: 'gryphon', name: 'Gryphon', img: 'gryphon.png', description: 'Strike cruiser with missile specialization' },
            { id: 'heron', name: 'Heron', img: 'heron.png', description: 'Fast carrier with tactical mobility' },
            { id: 'mora', name: 'Mora', img: 'mora.png', description: 'Elite carrier cruiser with advanced systems' },
            { id: 'nebula', name: 'Nebula', img: 'nebula.png', description: 'Phase cruiser with stealth capabilities' },
            { id: 'venture', name: 'Venture', img: 'venture.png', description: 'Exploration and salvage cruiser' }
        ],
        destroyer: [
            { id: 'enforcer', name: 'Enforcer', img: 'enforcer_base.png', description: 'Well-balanced destroyer platform' },
            { id: 'buffalo', name: 'Buffalo', img: 'buffalo_af.png', description: 'Armed freighter with combat capabilities' },
            { id: 'gemini', name: 'Gemini', img: 'gemini_base.png', description: 'Heavy freighter with dual engine design' },
            { id: 'hammerhead', name: 'Hammerhead', img: 'hammerhead_base.png', description: 'Versatile destroyer with good firepower' },
            { id: 'harbinger', name: 'Harbinger', img: 'harbinger.png', description: 'Phase destroyer with temporal manipulation' },
            { id: 'manticore', name: 'Manticore', img: 'manticore_base.png', description: 'Heavy missile destroyer platform' },
            { id: 'medusa', name: 'Medusa', img: 'medusa.png', description: 'Fast attack destroyer with phase systems' },
            { id: 'mule', name: 'Mule', img: 'mule_base.png', description: 'Standard cargo hauler with modest defenses' },
            { id: 'shrike', name: 'Shrike', img: 'shrike_base.png', description: 'Fast interceptor destroyer' },
            { id: 'sunder', name: 'Sunder', img: 'sunder.png', description: 'Heavy beam destroyer with powerful energy weapons' },
            { id: 'valkyrie', name: 'Valkyrie', img: 'valkyrie_ap.png', description: 'Fast attack craft with good mobility' }
        ],
        frigate: [
            { id: 'lasher', name: 'Lasher', img: 'lasher_base.png', description: 'Fast attack frigate with good mobility' },
            { id: 'gremlin', name: 'Gremlin', img: 'gremlin.png', description: 'Light electronic warfare frigate' },
            { id: 'hound', name: 'Hound', img: 'hound_base.png', description: 'Fast pursuit frigate with good speed' },
            { id: 'mudskipper', name: 'Mudskipper', img: 'mudskipper.png', description: 'Light utility and cargo frigate' },
            { id: 'omen', name: 'Omen', img: 'omen.png', description: 'Phase frigate with advanced sensors' },
            { id: 'scarab', name: 'Scarab', img: 'scarab.png', description: 'Armored assault frigate' },
            { id: 'wayfarer', name: 'Wayfarer', img: 'wayfarer.png', description: 'Long-range exploration frigate' },
            { id: 'wolf', name: 'Wolf', img: 'wolf_base.png', description: 'Standard combat frigate with balanced loadout' }
        ]
    };

    return (
        <div style={{
            backgroundColor: '#0a0e1a',
            minHeight: '100vh',
            paddingTop: '2rem',
            paddingBottom: '2rem'
        }}>
            <Container fluid className="px-4">
                <Row>
                    {/* Sidebar Navigation */}
                    <Col md={3} lg={2} className="mb-4">
                        <div style={{
                            position: 'sticky',
                            top: '80px',
                            backgroundColor: 'rgba(33, 37, 41, 0.95)',
                            borderRadius: '8px',
                            padding: '1.5rem 1rem'
                        }}>
                            <h5 className="text-light mb-3" style={{ 
                                color: '#4da6ff',
                                borderBottom: '2px solid #4da6ff',
                                paddingBottom: '0.5rem'
                            }}>Ship Classes</h5>
                            <Nav className="flex-column">
                                {shipCategories.map(category => (
                                    <Nav.Link
                                        key={category.id}
                                        onClick={() => scrollToSection(category.id)}
                                        style={{
                                            color: activeSection === category.id ? '#4da6ff' : '#adb5bd',
                                            backgroundColor: activeSection === category.id ? 'rgba(77, 166, 255, 0.1)' : 'transparent',
                                            borderLeft: activeSection === category.id ? '3px solid #4da6ff' : '3px solid transparent',
                                            padding: '0.75rem 1rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s',
                                            borderRadius: '4px',
                                            marginBottom: '0.5rem'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (activeSection !== category.id) {
                                                e.target.style.backgroundColor = 'rgba(77, 166, 255, 0.05)';
                                                e.target.style.color = '#66b3ff';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (activeSection !== category.id) {
                                                e.target.style.backgroundColor = 'transparent';
                                                e.target.style.color = '#adb5bd';
                                            }
                                        }}
                                    >
                                        <img src={category.icon} alt={category.name} style={{ width: '20px', height: '20px', marginRight: '8px', verticalAlign: 'middle' }} />
                                        {category.name}
                                    </Nav.Link>
                                ))}
                            </Nav>
                        </div>
                    </Col>

                    {/* Main Content */}
                    <Col md={9} lg={10}>
                        <Card className="mb-4" style={{ 
                            backgroundColor: 'rgba(0, 0, 0, 0.85)',
                            border: 'none'
                        }}>
                            <Card.Body className="text-center py-4">
                                <h1 className="text-light mb-2" style={{
                                    color: '#4da6ff',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    textShadow: '0 0 10px #0066cc'
                                }}>Ship Codex</h1>
                                <p style={{ color: '#99c2ff', fontSize: '1.05rem' }}>Comprehensive database of all ships in the Starsector universe</p>
                            </Card.Body>
                        </Card>

                        {/* Ship Sections */}
                        {shipCategories.map(category => (
                            <div key={category.id} id={category.id} style={{ scrollMarginTop: '80px' }}>
                                <Card className="mb-4" style={{ 
                                    backgroundColor: 'rgba(33, 37, 41, 0.95)',
                                    border: '1px solid rgba(77, 166, 255, 0.3)'
                                }}>
                                    <Card.Header style={{ 
                                        backgroundColor: 'rgba(77, 166, 255, 0.1)',
                                        borderBottom: '2px solid #4da6ff'
                                    }}>
                                        <h3 className="text-light mb-0" style={{ display: 'flex', alignItems: 'center' }}>
                                            <img src={category.icon} alt={category.name} style={{ width: '32px', height: '32px', marginRight: '12px' }} />
                                            {category.name}
                                        </h3>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row>
                                            {ships[category.id].map((ship, index) => (
                                                <Col md={6} lg={4} key={index} className="mb-4">
                                                    <Card style={{ 
                                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                        border: '1px solid rgba(77, 166, 255, 0.2)',
                                                        transition: 'all 0.3s',
                                                        cursor: 'pointer'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                                        e.currentTarget.style.borderColor = '#4da6ff';
                                                        e.currentTarget.style.boxShadow = '0 0 20px rgba(77, 166, 255, 0.3)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                        e.currentTarget.style.borderColor = 'rgba(77, 166, 255, 0.2)';
                                                        e.currentTarget.style.boxShadow = 'none';
                                                    }}
                                                    onClick={() => navigate(`/ships/${ship.id}`)}>
                                                        <Card.Img 
                                                            variant="top" 
                                                            src={`/p191/Images/Ships/${category.id === 'capital' ? 'Capital_Ship' : category.id.charAt(0).toUpperCase() + category.id.slice(1)}/${ship.img}`}
                                                            alt={ship.name}
                                                            style={{ 
                                                                height: '200px',
                                                                objectFit: 'contain',
                                                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                                padding: '1rem'
                                                            }}
                                                            onError={(e) => {
                                                                e.target.src = 'https://via.placeholder.com/300x200/1a1f2e/4da6ff?text=' + ship.name;
                                                            }}
                                                        />
                                                        <Card.Body>
                                                            <Card.Title className="text-light" style={{ color: '#4da6ff' }}>
                                                                {ship.name}
                                                            </Card.Title>
                                                            <Card.Text style={{ fontSize: '0.9rem', color: '#b8d4ff' }}>
                                                                {ship.description}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}