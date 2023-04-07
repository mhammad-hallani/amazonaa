import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/esm/Badge';
import {LinkContainer} from 'react-router-bootstrap'
import { useContext } from 'react';
import { store } from './store';


function App() {

  const {state: xState} = useContext(store);
  const {cart} = xState

  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>amazona</Navbar.Brand>
            </LinkContainer>

            <Nav className="me-auto">
              <Link to="/cart" className="nav-link">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce( (a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container className='mt-3'>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path='/product/:slug' element={<ProductScreen />} />
          </Routes>
        </Container>
      </main>
      <footer>
        <div className='text-center' >All rights reserved</div>
      </footer>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
