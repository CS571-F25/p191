import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function World() {
    const navigate = useNavigate();
    
    const factions = [
        { id: 'hegemony', name: 'Hegemony', flag: '/p191/Images/Factions/crest_hegemony.png' },
        { id: 'tritachyon', name: 'Tri-Tachyon Corporation', flag: '/p191/Images/Factions/crest_tritachyon.png' },
        { id: 'persean_league', name: 'Persean League', flag: '/p191/Images/Factions/crest_persean_league.png' },
        { id: 'sindrian_diktat', name: 'Sindrian Diktat', flag: '/p191/Images/Factions/crest_sindrian_diktat.png' },
        { id: 'luddic_church', name: 'Luddic Church', flag: '/p191/Images/Factions/crest_luddic_church.png' },
        { id: 'luddic_path', name: 'Luddic Path', flag: '/p191/Images/Factions/crest_luddic_path.png' },
        { id: 'pirates', name: 'Pirates', flag: '/p191/Images/Factions/crest_pirates.png' },
        { id: 'neutral_traders', name: 'Independent Traders', flag: '/p191/Images/Factions/crest_neutral_traders.png' }
    ];

    return (
        <div style={{
            backgroundColor: '#0a0e1a',
            minHeight: '100vh',
            paddingTop: '2rem',
            paddingBottom: '2rem'
        }}>
            <Container fluid className="px-4">
                <Card className="mb-4" style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    border: '1px solid rgba(77, 166, 255, 0.3)'
                }}>
                    <Card.Body className="text-center py-4">
                        <h1 className="text-light mb-2" style={{
                            color: '#4da6ff',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            textShadow: '0 0 10px #0066cc'
                        }}>Factions of the Sector</h1>
                        <p style={{ color: '#99c2ff', fontSize: '1.05rem' }}>Discover the major powers that shape the Persean Sector</p>
                    </Card.Body>
                </Card>

                {/* Faction Cards Grid */}
                <Row>
                    {factions.map((faction, index) => (
                        <Col md={6} lg={3} key={index} className="mb-4">
                            <Card style={{ 
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                border: '1px solid rgba(77, 166, 255, 0.2)',
                                transition: 'all 0.3s',
                                cursor: 'pointer',
                                height: '100%'
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
                            onClick={() => navigate(`/factions/${faction.id}`)}>
                                {/* Faction Flag */}
                                <div style={{ 
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    padding: '2rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    minHeight: '200px'
                                }}>
                                    <img 
                                        src={faction.flag}
                                        alt={faction.name}
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '150px',
                                            objectFit: 'contain'
                                        }}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/150x150/1a1f2e/4da6ff?text=' + faction.name;
                                        }}
                                    />
                                </div>

                                <Card.Body className="text-center">
                                    {/* Faction Name */}
                                    <Card.Title className="text-light" style={{ 
                                        color: '#4da6ff',
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold'
                                    }}>
                                        {faction.name}
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Secret Icon at Bottom */}
                <div className="text-center mt-5 pt-5">
                    <img 
                        src="/p191/Images/Icons/coronal_shunt.png" 
                        alt="Access"
                        onClick={() => navigate('/cosmec')}
                        style={{
                            width: '40px',
                            height: '40px',
                            cursor: 'pointer',
                            opacity: 0.3,
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = '1';
                            e.currentTarget.style.transform = 'scale(1.2)';
                            e.currentTarget.style.filter = 'drop-shadow(0 0 10px rgba(255, 68, 68, 0.8))';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = '0.3';
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.filter = 'none';
                        }}
                    />
                </div>
            </Container>
        </div>
    );
}
