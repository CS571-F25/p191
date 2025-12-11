import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export default function FactionDetail() {
    const { factionId } = useParams();
    const navigate = useNavigate();
    const [description, setDescription] = useState('Faction description coming soon...');
    const [loading, setLoading] = useState(true);

    // Map faction IDs to their CSV identifiers
    const factionToCsvId = {
        'hegemony': 'hegemony',
        'tritachyon': 'tritachyon',
        'persean_league': 'persean',
        'sindrian_diktat': 'sindrian_diktat',
        'luddic_church': 'luddic_church',
        'luddic_path': 'luddic_path',
        'pirates': 'pirates',
        'neutral_traders': 'independent'
    };

    const factions = {
        'hegemony': { 
            name: 'Hegemony', 
            flag: '/p191/Images/Factions/crest_hegemony.png',
            leader: 'Daud',
            leaderPortrait: '/p191/Images/Characters/baikal_daud.png'
        },
        'tritachyon': { 
            name: 'Tri-Tachyon Corporation', 
            flag: '/p191/Images/Factions/crest_tritachyon.png',
            leader: 'CEO Sun',
            leaderPortrait: '/p191/Images/Characters/ceo_sun.png'
        },
        'persean_league': { 
            name: 'Persean League', 
            flag: '/p191/Images/Factions/crest_persean_league.png',
            leader: 'None',
            leaderPortrait: 'none',
            leaderNote: 'This is a rather separate faction. There is no leader.'
        },
        'sindrian_diktat': { 
            name: 'Sindrian Diktat', 
            flag: '/p191/Images/Factions/crest_sindrian_diktat.png',
            leader: 'Andrada',
            leaderPortrait: '/p191/Images/Characters/andrada.png'
        },
        'luddic_church': { 
            name: 'Luddic Church', 
            flag: '/p191/Images/Factions/crest_luddic_church.png',
            leader: 'Jaspis',
            leaderPortrait: '/p191/Images/Characters/jaspis.png'
        },
        'luddic_path': { 
            name: 'Luddic Path', 
            flag: '/p191/Images/Factions/crest_luddic_path.png',
            leader: 'Cotton',
            leaderPortrait: '/p191/Images/Characters/cotton.png'
        },
        'pirates': { 
            name: 'Pirates', 
            flag: '/p191/Images/Factions/crest_pirates.png',
            leader: 'Kanta',
            leaderPortrait: '/p191/Images/Characters/kanta.png'
        },
        'neutral_traders': { 
            name: 'Independent Traders', 
            flag: '/p191/Images/Factions/crest_neutral_traders.png',
            leader: 'None',
            leaderPortrait: 'none',
            leaderNote: 'This is a rather separate faction. There is no leader.'
        }
    };

    const faction = factions[factionId];

    // Load faction description from CSV
    useEffect(() => {
        const csvId = factionToCsvId[factionId];
        if (csvId) {
            fetch('/p191/Text/descriptions.csv')
                .then(response => response.text())
                .then(csvText => {
                    Papa.parse(csvText, {
                        header: true,
                        complete: (results) => {
                            const factionDesc = results.data.find(d => d.id === csvId && d.type === 'FACTION');
                            if (factionDesc && factionDesc.text1) {
                                setDescription(factionDesc.text1);
                            }
                            setLoading(false);
                        }
                    });
                });
        } else {
            setLoading(false);
        }
    }, [factionId]);

    if (!faction) {
        return (
            <div style={{ backgroundColor: '#0a0e1a', minHeight: '100vh', padding: '2rem' }}>
                <Container className="text-center text-light">
                    <h2>Faction Not Found</h2>
                    <button className="btn btn-primary mt-3" onClick={() => navigate('/world')}>
                        Back to World
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
                    onClick={() => navigate('/world')}
                    style={{ borderColor: '#4da6ff', color: '#4da6ff' }}
                >
                    ← Back to World
                </button>

                {/* Faction Title */}
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
                            {faction.name}
                        </h1>
                    </Card.Body>
                </Card>

                <Row>
                    {/* Faction Flag */}
                    <Col lg={5} className="mb-4">
                        <Card style={{ 
                            backgroundColor: 'rgba(33, 37, 41, 0.95)',
                            border: '1px solid rgba(77, 166, 255, 0.3)',
                            padding: '2rem'
                        }}>
                            <img 
                                src={faction.flag}
                                alt={faction.name}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    border: '2px solid #4da6ff',
                                    borderRadius: '8px',
                                    padding: '2rem'
                                }}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/400x400/1a1f2e/4da6ff?text=' + faction.name;
                                }}
                            />
                        </Card>
                    </Col>

                    {/* Faction Information */}
                    <Col lg={7} className="mb-4">
                        {/* Leader Section */}
                        <Card className="mb-4" style={{ 
                            backgroundColor: 'rgba(33, 37, 41, 0.95)',
                            border: '1px solid rgba(77, 166, 255, 0.3)'
                        }}>
                            <Card.Header style={{ 
                                backgroundColor: 'rgba(77, 166, 255, 0.1)',
                                borderBottom: '2px solid #4da6ff'
                            }}>
                                <h4 className="text-light mb-0">Leader</h4>
                            </Card.Header>
                            <Card.Body>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                    {/* Leader Portrait */}
                                    <div style={{
                                        width: '120px',
                                        height: '120px',
                                        backgroundColor: 'rgba(77, 166, 255, 0.1)',
                                        border: '2px solid #4da6ff',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexShrink: 0
                                    }}>
                                        {faction.leaderPortrait === 'none' ? (
                                            <span style={{ color: '#4da6ff', fontSize: '1rem', textAlign: 'center', padding: '0.5rem' }}>None</span>
                                        ) : faction.leaderPortrait ? (
                                            <img 
                                                src={faction.leaderPortrait}
                                                alt={faction.leader}
                                                style={{ 
                                                    width: '100%', 
                                                    height: '100%', 
                                                    objectFit: 'cover',
                                                    borderRadius: '6px'
                                                }}
                                            />
                                        ) : (
                                            <span style={{ color: '#4da6ff', fontSize: '1rem' }}>Portrait TBD</span>
                                        )}
                                    </div>
                                    <div>
                                        <h5 className="text-light" style={{ color: '#4da6ff' }}>{faction.leader}</h5>
                                        {faction.leaderNote && (
                                            <p className="text-muted mt-2" style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
                                                {faction.leaderNote}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>

                        {/* Description Section */}
                        <Card style={{ 
                            backgroundColor: 'rgba(33, 37, 41, 0.95)',
                            border: '1px solid rgba(77, 166, 255, 0.3)'
                        }}>
                            <Card.Header style={{ 
                                backgroundColor: 'rgba(77, 166, 255, 0.1)',
                                borderBottom: '2px solid #4da6ff'
                            }}>
                                <h4 className="text-light mb-0">About</h4>
                            </Card.Header>
                            <Card.Body>
                                {loading ? (
                                    <p className="text-muted">Loading description...</p>
                                ) : (
                                    <p className="text-light" style={{ 
                                        color: '#b8d4ff',
                                        lineHeight: '1.8',
                                        whiteSpace: 'pre-line'
                                    }}>
                                        {description}
                                    </p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
