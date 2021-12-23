import React from "react";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CART_RESET } from "../redux/types";


const Header = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <header>

      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>eCommerce Shop</Navbar.Brand>
          
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
               <Badge pill bg="danger" style={{position:'relative',bottom:7,left:2}}>
                   {0}
                  </Badge>
                </Nav.Link>
              </LinkContainer>

              
                <NavDropdown title={"hello Admin"} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item><i className="fas fa-user"></i> Profile</NavDropdown.Item>
                  </LinkContainer>

                  {(
                    <>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item><i className="fas fa-users"></i> Users</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item><i className="fas fa-box"></i> Orders</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item><i className="fas fa-store"></i> Products</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/admin/api/post">
                        <NavDropdown.Item><i className="fas fa-database"></i> API post</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/admin/api/get">
                        <NavDropdown.Item><i className="fas fa-database"></i> API get</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}

                </NavDropdown>
              
                
              
            </Nav>
          
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
