import { Container, Card, Button, Modal, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';

export default function DiscussionDetail() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPost();
    }, [postId]);

    const fetchPost = async () => {
        try {
            const postDoc = await getDoc(doc(db, 'posts', postId));
            if (postDoc.exists()) {
                setPost({ id: postDoc.id, ...postDoc.data() });
            }
            setLoading(false);
        } catch (err) {
            console.error('Error fetching post:', err);
            setLoading(false);
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

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this discussion?')) {
            return;
        }

        try {
            await deleteDoc(doc(db, 'posts', postId));
            navigate('/discussion');
        } catch (err) {
            alert('Failed to delete post: ' + err.message);
        }
    };

    const handleEdit = () => {
        setEditTitle(post.title);
        setEditContent(post.content);
        setShowEditModal(true);
        setError('');
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        setError('');

        if (editTitle.trim().length < 3) {
            setError('Title must be at least 3 characters');
            return;
        }

        if (editContent.trim().length < 10) {
            setError('Content must be at least 10 characters');
            return;
        }

        try {
            await updateDoc(doc(db, 'posts', postId), {
                title: editTitle.trim(),
                content: editContent.trim()
            });

            setPost({
                ...post,
                title: editTitle.trim(),
                content: editContent.trim()
            });
            setShowEditModal(false);
        } catch (err) {
            setError('Failed to update post: ' + err.message);
        }
    };

    const currentUser = localStorage.getItem('username');
    const isAuthor = currentUser && post && currentUser === post.username;

    if (loading) {
        return (
            <Container fluid className="py-5" style={{ minHeight: '100vh', backgroundColor: '#0a0e1a' }}>
                <Container>
                    <p className="text-center" style={{ color: '#99c2ff' }}>Loading...</p>
                </Container>
            </Container>
        );
    }

    if (!post) {
        return (
            <Container fluid className="py-5" style={{ minHeight: '100vh', backgroundColor: '#0a0e1a' }}>
                <Container>
                    <p className="text-center" style={{ color: '#99c2ff' }}>Discussion not found.</p>
                    <div className="text-center mt-3">
                        <Button variant="primary" onClick={() => navigate('/discussion')}>
                            Back to Discussions
                        </Button>
                    </div>
                </Container>
            </Container>
        );
    }

    return (
        <Container fluid className="py-5" style={{ minHeight: '100vh', backgroundColor: '#0a0e1a' }}>
            <Container>
                <Button 
                    variant="outline-primary" 
                    className="mb-4"
                    onClick={() => navigate('/discussion')}
                >
                    ← Back to Discussions
                </Button>

                <Card style={{ 
                    backgroundColor: 'rgba(26, 31, 46, 0.95)',
                    border: '1px solid #4da6ff'
                }}>
                    <Card.Body className="p-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <Card.Title style={{ 
                                color: '#4da6ff', 
                                fontSize: '2rem',
                                marginBottom: 0
                            }}>
                                {post.title}
                            </Card.Title>
                            
                            {isAuthor && (
                                <div className="d-flex gap-2">
                                    <Button 
                                        variant="outline-primary" 
                                        size="sm"
                                        onClick={handleEdit}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="outline-danger" 
                                        size="sm"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>
                        
                        <Card.Subtitle className="mb-3" style={{ 
                            color: '#99c2ff',
                            fontSize: '0.95rem'
                        }}>
                            Posted by <strong>{post.username}</strong> on {formatDate(post.timestamp)}
                        </Card.Subtitle>
                        
                        <hr style={{ borderColor: '#4da6ff', opacity: 0.3 }} />
                        
                        <Card.Text style={{ 
                            color: '#b8d4ff',
                            fontSize: '1.1rem',
                            lineHeight: '1.8',
                            marginTop: '1.5rem',
                            whiteSpace: 'pre-wrap'
                        }}>
                            {post.content}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton style={{ backgroundColor: '#1a1f2e', borderBottom: '1px solid #4da6ff' }}>
                    <Modal.Title style={{ color: '#4da6ff' }}>
                        Edit Discussion
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#1a1f2e' }}>
                    <Form onSubmit={handleSaveEdit}>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: '#b8d4ff' }}>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
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
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
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
                        <div className="d-flex gap-2">
                            <Button variant="primary" type="submit" className="flex-grow-1">
                                Save Changes
                            </Button>
                            <Button 
                                variant="outline-secondary" 
                                onClick={() => setShowEditModal(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}
