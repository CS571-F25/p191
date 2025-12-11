import { Container, Card, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';

export default function Login() {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [inputUsername, setInputUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // If already logged in, redirect to home
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (inputUsername.trim().length < 3) {
            setError('Username must be at least 3 characters');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        try {
            const userRef = doc(db, 'users', inputUsername.trim());
            const userDoc = await getDoc(userRef);

            if (isSignUp) {
                // Sign up - check if username already exists
                if (userDoc.exists()) {
                    setError('Username already taken');
                    return;
                }
                // Create new user
                await setDoc(userRef, {
                    username: inputUsername.trim(),
                    password: password,
                    createdAt: new Date().toISOString()
                });
            } else {
                // Login - check if user exists and password matches
                if (!userDoc.exists()) {
                    setError('Username not found');
                    return;
                }
                if (userDoc.data().password !== password) {
                    setError('Incorrect password');
                    return;
                }
            }

            // Save username to localStorage
            localStorage.setItem('username', inputUsername.trim());
            // Redirect to home page
            navigate('/');
            // Reload to update navigation
            window.location.reload();
        } catch (err) {
            setError('An error occurred: ' + err.message);
        }
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
            <Container style={{ position: 'relative', zIndex: 1 }}>
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                    <Card style={{ 
                        backgroundColor: 'rgba(26, 31, 46, 0.95)',
                        border: '1px solid #4da6ff',
                        maxWidth: '500px',
                        width: '100%'
                    }}>
                        <Card.Header style={{ 
                            backgroundColor: 'rgba(77, 166, 255, 0.1)',
                            borderBottom: '2px solid #4da6ff'
                        }}>
                            <h2 className="text-center mb-0" style={{ color: '#4da6ff' }}>
                                {isSignUp ? 'Sign Up' : 'Login'}
                            </h2>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: '#b8d4ff' }}>Username</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={inputUsername}
                                        onChange={(e) => setInputUsername(e.target.value)}
                                        placeholder="Enter your username"
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
                                    <Form.Label style={{ color: '#b8d4ff' }}>Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                        style={{ 
                                            backgroundColor: '#0a0e1a',
                                            border: '1px solid #4da6ff',
                                            color: '#fff'
                                        }}
                                    />
                                    <Form.Text style={{ color: '#99c2ff' }}>
                                        Minimum 6 characters
                                    </Form.Text>
                                </Form.Group>
                                {error && <p className="text-danger text-center">{error}</p>}
                                <Button variant="primary" type="submit" className="w-100 mb-3" size="lg">
                                    {isSignUp ? 'Sign Up' : 'Login'}
                                </Button>
                                <div className="text-center">
                                    <Button 
                                        variant="link" 
                                        onClick={() => {
                                            setIsSignUp(!isSignUp);
                                            setError('');
                                        }}
                                        style={{ color: '#4da6ff', textDecoration: 'none' }}
                                    >
                                        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                                    </Button>
                                </div>
                                <div className="text-center mt-3">
                                    <Button 
                                        variant="outline-secondary"
                                        onClick={() => navigate('/')}
                                        style={{ color: '#99c2ff', borderColor: '#99c2ff' }}
                                    >
                                        Back to Home
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    );
}
