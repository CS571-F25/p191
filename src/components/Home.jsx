import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

export default function Home(props) {
    const [recentPosts, setRecentPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRecentPosts();
    }, []);

    const fetchRecentPosts = async () => {
        try {
            const q = query(
                collection(db, 'posts'),
                orderBy('timestamp', 'desc'),
                limit(3)
            );
            const querySnapshot = await getDocs(q);
            const posts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRecentPosts(posts);
        } catch (err) {
            console.error('Error fetching recent posts:', err);
        }
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };
    return (
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
                backgroundColor: 'rgba(10, 14, 26, 0.85)',
                backdropFilter: 'blur(3px)'
            }}></div>
            <Container className="py-5" style={{ position: 'relative', zIndex: 1 }}>
                <Card className="bg-dark text-light mb-4" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
                    <Card.Body className="text-center py-5">
                        <h1 className="display-4 fw-bold mb-3" style={{
                            fontFamily: 'Arial, sans-serif',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: '#4da6ff',
                            textShadow: '0 0 10px #0066cc, 0 0 20px #0066cc, 0 0 30px #0066cc',
                            fontSize: '3.5rem'
                        }}>Starsector Guide</h1>
                        <p className="lead mb-2" style={{
                            color: '#66b3ff',
                            fontSize: '1.3rem',
                            fontWeight: '500'
                        }}>Welcome to the comprehensive guide to the Starsector universe!</p>
                        <p className="text-muted">Explore ships, factions, and engage with the community.</p>
                    </Card.Body>
                </Card>

                <Row>
                    <Col md={4} className="mb-4">
                        <Card className="h-100" style={{ backgroundColor: 'rgba(33, 37, 41, 0.95)' }}>
                            <Card.Body className="text-light text-center">
                                <Link to="/ships" style={{ textDecoration: 'none' }}>
                                    <img 
                                        src="/p191/Images/Icons/Ship_Codex.png" 
                                        alt="Ship Database"
                                        style={{ 
                                            width: '80px', 
                                            height: '80px', 
                                            marginBottom: '1rem',
                                            border: '3px solid #4da6ff',
                                            borderRadius: '8px',
                                            padding: '5px',
                                            boxShadow: '0 0 10px rgba(77, 166, 255, 0.5)'
                                        }}
                                    />
                                    <h5 className="text-primary mb-3" style={{ cursor: 'pointer' }}>Ship Database</h5>
                                </Link>
                                <p>Browse comprehensive information about all ships in the Starsector universe.</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card className="h-100" style={{ backgroundColor: 'rgba(33, 37, 41, 0.95)' }}>
                            <Card.Body className="text-light text-center">
                                <Link to="/world" style={{ textDecoration: 'none' }}>
                                    <img 
                                        src="/p191/Images/Icons/World.png" 
                                        alt="World"
                                        style={{ 
                                            width: '80px', 
                                            height: '80px', 
                                            marginBottom: '1rem',
                                            border: '3px solid #4da6ff',
                                            borderRadius: '8px',
                                            padding: '5px',
                                            boxShadow: '0 0 10px rgba(77, 166, 255, 0.5)'
                                        }}
                                    />
                                    <h5 className="text-primary mb-3" style={{ cursor: 'pointer' }}>World</h5>
                                </Link>
                                <p>Explore the rich universe of Starsector and its inhabitants.</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card className="h-100" style={{ backgroundColor: 'rgba(33, 37, 41, 0.95)' }}>
                            <Card.Body className="text-light text-center">
                                <Link to="/discussion" style={{ textDecoration: 'none' }}>
                                    <img 
                                        src="/p191/Images/Icons/Discussion.png" 
                                        alt="Discussion"
                                        style={{ 
                                            width: '80px', 
                                            height: '80px', 
                                            marginBottom: '1rem',
                                            border: '3px solid #4da6ff',
                                            borderRadius: '8px',
                                            padding: '5px',
                                            boxShadow: '0 0 10px rgba(77, 166, 255, 0.5)'
                                        }}
                                    />
                                    <h5 className="text-primary mb-3" style={{ cursor: 'pointer' }}>Discussion</h5>
                                </Link>
                                <p>Join discussions with other Starsector pilots and strategists.</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Card className="bg-dark text-light mt-4" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
                    <Card.Body>
                        <h4 className="mb-3">Recent Activity</h4>
                        {recentPosts.length === 0 ? (
                            <p style={{ color: '#99c2ff' }}>No recent discussions yet.</p>
                        ) : (
                            <Row>
                                {recentPosts.map(post => (
                                    <Col key={post.id} md={12} className="mb-3">
                                        <Card 
                                            style={{ 
                                                backgroundColor: 'rgba(26, 31, 46, 0.95)',
                                                border: '1px solid #4da6ff',
                                                cursor: 'pointer',
                                                transition: 'transform 0.2s, box-shadow 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateX(5px)';
                                                e.currentTarget.style.boxShadow = '0 2px 10px rgba(77, 166, 255, 0.4)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateX(0)';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                            onClick={() => navigate(`/discussion/${post.id}`)}
                                        >
                                            <Card.Body className="py-2">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <div style={{ flex: 1 }}>
                                                        <span className="badge bg-primary me-2">Discussion</span>
                                                        <strong style={{ color: '#4da6ff' }}>{post.title}</strong>
                                                        <div style={{ color: '#99c2ff', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                                            by {post.username} • {formatDate(post.timestamp)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}
