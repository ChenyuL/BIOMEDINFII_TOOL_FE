import logo from '../logo.svg';
import Container from "react-bootstrap/Container";
import Navbar from 'react-bootstrap/Navbar';
import TriedSearchBox from "./TriedSearchBox";
import {Row, Col} from "react-bootstrap";


export default function AppHeader() {
  return (
      <Navbar expand="lg" variant="dark" bg="dark">
          <Container fluid>
              <Navbar.Brand href="#">
                  <img src={logo}
                     width="80"
                     height="80"
                     className="d-inline-block align-center"
                     alt="logo" /> {' '}
                    Mock EHR
              </Navbar.Brand>
              {/*<TriedSearchBox/>*/}
          </Container>
      </Navbar>
  );
}
