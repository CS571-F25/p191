import { Container, Row, Col, Card, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

export default function Discussion() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('all');
    const [sortBy, setSortBy] = useState('time');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const calculateRelevance = (post, searchTerm) => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        const lowerTitle = post.title.toLowerCase();
        const lowerContent = post.content.toLowerCase();
        const lowerUsername = post.username.toLowerCase();
        
        let score = 0;
        
        // Title matches are most relevant
        if (lowerTitle.includes(lowerSearchTerm)) {
            score += 10;
            // Bonus if it's an exact match
            if (lowerTitle === lowerSearchTerm) score += 20;
        }
        
        // Username matches
        if (lowerUsername.includes(lowerSearchTerm)) {
            score += 5;
        }
        
        // Content matches
        const contentMatches = (lowerContent.match(new RegExp(lowerSearchTerm, 'g')) || []).length;
        score += contentMatches * 2;
        
        return score;
    };

    useEffect(() => {
        // Filter posts based on search term and search type
        let filtered;
        
        if (searchTerm.trim() === '') {
            filtered = [...posts];
        } else {
            const lowerSearchTerm = searchTerm.toLowerCase();
            filtered = posts.filter(post => {
                switch(searchBy) {
                    case 'title':
                        return post.title.toLowerCase().includes(lowerSearchTerm);
                    case 'name':
                        return post.username.toLowerCase().includes(lowerSearchTerm);
                    case 'content':
                        return post.content.toLowerCase().includes(lowerSearchTerm);
                    case 'all':
                    default:
                        return post.title.toLowerCase().includes(lowerSearchTerm) ||
                               post.content.toLowerCase().includes(lowerSearchTerm) ||
                               post.username.toLowerCase().includes(lowerSearchTerm);
                }
            });
            
            // Add relevance scores to filtered posts
            filtered = filtered.map(post => ({
                ...post,
                relevanceScore: calculateRelevance(post, searchTerm)
            }));
        }
        
        // Sort posts
        if (sortBy === 'relevance') {
            filtered.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
        } else {
            // Sort by time (newest first)
            filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        }
        
        setFilteredPosts(filtered);
    }, [searchTerm, searchBy, sortBy, posts]);

    const fetchPosts = async () => {
        try {
            const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
            const querySnapshot = await getDocs(q);
            const postsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(postsData);
            setFilteredPosts(postsData);
        } catch (err) {
            console.error('Error fetching posts:', err);
        }
    };

    const handlePost = async (e) => {
        e.preventDefault();
        setError('');

        const username = localStorage.getItem('username');
        if (!username) {
            setError('You must be logged in to post');
            return;
        }

        if (title.trim().length < 3) {
            setError('Title must be at least 3 characters');
            return;
        }

        if (content.trim().length < 10) {
            setError('Content must be at least 10 characters');
            return;
        }

        try {
            await addDoc(collection(db, 'posts'), {
                title: title.trim(),
                content: content.trim(),
                username: username,
                timestamp: new Date().toISOString()
            });

            setShowModal(false);
            setTitle('');
            setContent('');
            fetchPosts(); // Refresh posts
        } catch (err) {
            setError('Failed to create post: ' + err.message);
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
        <Container fluid className="py-5" style={{ minHeight: '100vh', backgroundColor: '#0a0e1a' }}>
            <Container>
                <h1 className="text-center mb-4" style={{ color: '#4da6ff' }}>
                    Starsector Discussion Board
                </h1>

                {/* Search Bar and Add Button */}
                <Row className="mb-4">
                    <Col md={8} className="mb-2 mb-md-0">
                        <InputGroup className="mb-2">
                            <InputGroup.Text style={{ 
                                backgroundColor: '#1a1f2e', 
                                borderColor: '#4da6ff',
                                color: '#b8d4ff'
                            }}>
                                🔍
                            </InputGroup.Text>
                            <Form.Select
                                value={searchBy}
                                onChange={(e) => setSearchBy(e.target.value)}
                                style={{ 
                                    backgroundColor: '#0a0e1a',
                                    border: '1px solid #4da6ff',
                                    color: '#fff',
                                    maxWidth: '120px'
                                }}
                            >
                                <option value="all">All</option>
                                <option value="title">Title</option>
                                <option value="name">Name</option>
                                <option value="content">Content</option>
                            </Form.Select>
                            <Form.Control
                                type="text"
                                placeholder="Search discussions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ 
                                    backgroundColor: '#0a0e1a',
                                    border: '1px solid #4da6ff',
                                    color: '#fff'
                                }}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text style={{ 
                                backgroundColor: '#1a1f2e', 
                                borderColor: '#4da6ff',
                                color: '#b8d4ff'
                            }}>
                                Sort by:
                            </InputGroup.Text>
                            <Form.Select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{ 
                                    backgroundColor: '#0a0e1a',
                                    border: '1px solid #4da6ff',
                                    color: '#fff'
                                }}
                            >
                                <option value="time">Time (Newest First)</option>
                                <option value="relevance">Relevance</option>
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col md={4}>
                        <Button 
                            variant="primary" 
                            className="w-100"
                            style={{ height: '100%' }}
                            onClick={() => {
                                const username = localStorage.getItem('username');
                                if (!username) {
                                    alert('Please log in to create a post');
                                    return;
                                }
                                setShowModal(true);
                            }}
                        >
                            + Add Discussion
                        </Button>
                    </Col>
                </Row>

                {/* Posts Grid */}
                <Row>
                    {filteredPosts.length === 0 ? (
                        <Col xs={12}>
                            <p className="text-center" style={{ color: '#99c2ff' }}>
                                {searchTerm ? 'No discussions found matching your search.' : 'No discussions yet. Be the first to post!'}
                            </p>
                        </Col>
                    ) : (
                        filteredPosts.map(post => (
                            <Col key={post.id} xs={12} md={6} lg={4} className="mb-4">
                                <Card 
                                    style={{ 
                                        backgroundColor: 'rgba(26, 31, 46, 0.95)',
                                        border: '1px solid #4da6ff',
                                        height: '100%',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s, box-shadow 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(77, 166, 255, 0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    onClick={() => window.location.hash = `/discussion/${post.id}`}
                                >
                                    <Card.Body>
                                        <Card.Title style={{ color: '#4da6ff', fontSize: '1.25rem' }}>
                                            {post.title}
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2" style={{ 
                                            color: '#99c2ff',
                                            fontSize: '0.85rem'
                                        }}>
                                            Posted on {formatDate(post.timestamp)}
                                        </Card.Subtitle>
                                        <Card.Text style={{ color: '#b8d4ff', fontSize: '0.9rem' }}>
                                            <strong>{post.username}</strong>
                                        </Card.Text>
                                        <Card.Text style={{ 
                                            color: '#b8d4ff',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            lineHeight: '1.5em',
                                            maxHeight: '3em'
                                        }}>
                                            {post.content}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>

            {/* Add Post Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton style={{ backgroundColor: '#1a1f2e', borderBottom: '1px solid #4da6ff' }}>
                    <Modal.Title style={{ color: '#4da6ff' }}>
                        Create New Discussion
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#1a1f2e' }}>
                    <Form onSubmit={handlePost}>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: '#b8d4ff' }}>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter discussion title"
                                required
                                style={{ 
                                    backgroundColor: '#0a0e1a',
                                    border: '1px solid #4da6ff',
                                    color: '#fff'
                                }}
                            />
                            <Form.Text style={{ color: '#99c2ff' }}>
                                Minimum 3 characters
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: '#b8d4ff' }}>Content</Form.Label>
                            <Form.Control 
                                as="textarea"
                                rows={5}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write your discussion content..."
                                required
                                style={{ 
                                    backgroundColor: '#0a0e1a',
                                    border: '1px solid #4da6ff',
                                    color: '#fff'
                                }}
                            />
                            <Form.Text style={{ color: '#99c2ff' }}>
                                Minimum 10 characters
                            </Form.Text>
                        </Form.Group>
                        {error && <p className="text-danger">{error}</p>}
                        <Button variant="primary" type="submit" className="w-100">
                            Post Discussion
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}