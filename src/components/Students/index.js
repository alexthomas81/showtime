// Import Bootstrap
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// Import from react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import other React Component
import Create from "./create";
import Edit from "./edit";
import List from "./list";

const Students = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="info" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/create-student"}
                  className="nav-link">
                  Students!
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/create-student"}
                    className="nav-link">
                    Create Student
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/student-list"}
                    className="nav-link">
                    Student List
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Routes>
                  <Route path="/" element={<Create />} />
                  <Route path="/create-student" element={<Create />} />
                  <Route path="/edit-student/:id" element={<Edit />} />
                  <Route path="/student-list" element={<List />} />
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default Students;