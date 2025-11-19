import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Navigation() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="px-0">
            <Container fluid className="px-4">
                <LinkContainer to="/">
                    <Navbar.Brand>Starsector Wiki</Navbar.Brand>
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
                        <LinkContainer to="/discussion">
                            <Nav.Link>Discussion</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}