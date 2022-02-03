import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav,Navbar,Container } from 'react-bootstrap';
import './header.css'

function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
      <Navbar.Brand className="ml-3">NFT-BOT</Navbar.Brand>
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Info</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
