import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
class Header extends React.Component {
render() {
    return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Covid Tracker - INDIA</Navbar.Brand>
            </Container>
        </Navbar>
    )
}
}

export default Header;