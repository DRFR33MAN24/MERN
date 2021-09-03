import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
import { stat } from "fs";
import { DEFAULT_MIN_VERSION } from "tls";
class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const userInfo = (
      <Fragment>
        <span className="navbar-text text-success ">
          <strong>{user ? `18.2 $ ` : ""}</strong>
        </span>
      </Fragment>
    );
    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );
    const authLinks = (
      <Fragment >
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Options
          </DropdownToggle>
          <DropdownMenu right>

            <DropdownItem>
              Profile
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Fragment>
    );
    return (
      <div>
        <Navbar color="dark" dark expand="xs" className="mb-5 ">


          <Container>
            <Container>
              <NavbarBrand href="/" className='mx-auto'>Shopping List</NavbarBrand>
            </Container>
            <Container>
              <Nav className='mx-auto'>{isAuthenticated && userInfo}</Nav>
            </Container>
            <Container>
              <div className='mx-auto'>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav navbar>
                    {isAuthenticated ? authLinks : guestLinks}
                  </Nav>
                </Collapse>
              </div>
            </Container>
          </Container>


        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);
