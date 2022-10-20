import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export const Header = () => {
  return (

    // <header>
    //   <h1>Book Management App</h1>
    //   <hr />
    //   <div className="links">
    //     <NavLink to="/" className="link" activeClassName="active" exact>
    //       Books List
    //     </NavLink>
    //     <NavLink to="/add" className="link" activeClassName="active">
    //       Add Book
    //     </NavLink>
    //   </div>
    // </header>

    <Navbar bg="light" expand="lg">
      <Container fluid>
      <h3>Patient Management System</h3>
        <Nav className="justify-content-center" activeKey="/">
          <Nav.Item>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/signup">Signup</Nav.Link>
          </Nav.Item>
          {/* <Nav.Item> 
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav.Item> */}
          <Nav.Item>
            <Nav.Link href="/create">Create Patient</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};
