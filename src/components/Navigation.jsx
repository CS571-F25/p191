import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Check if user is already logged in
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username');
        setUsername('');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="px-0">
                <Container fluid className="px-4">
                    <LinkContainer to="/">
                        <Navbar.Brand>Starsector Guide</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/ships">
                                <Nav.Link>Ship Codex</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/world">
                                <Nav.Link>World</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/discussion">
                                <Nav.Link>Discussion</Nav.Link>
                            </LinkContainer>
                            <Nav.Item className="ms-3">
                                {username ? (
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="text-light">Hi, {username}</span>
                                        <Button 
                                            variant="outline-primary" 
                                            size="sm"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                ) : (
                                    <Button 
                                        variant="outline-primary" 
                                        size="sm"
                                        onClick={() => navigate('/login')}
                                    >
                                        Login
                                    </Button>
                                )}
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    );
}