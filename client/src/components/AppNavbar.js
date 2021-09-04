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
import { logout } from "../actions/authAction";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import DashboardPage from "./DashboardPage";
class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props;
    console.log(isAuthenticated);
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
          {/* <RegisterModal /> */}
          <Link exact to="/Register">
            <NavLink href="/Register">Register</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          {/* <LoginModal /> */}
          <Link exact to="/Login">
            <NavLink href="/Login">Login</NavLink>
          </Link>
        </NavItem>
      </Fragment>
    );
    const authLinks = (
      <Fragment>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Options
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Profile</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <Logout />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Fragment>
    );
    return (
      <Router>
        <div>
          <Navbar color="dark" dark expand="xs" className="mb-5 ">
            <Container>
              <Container>
                <NavbarBrand href="/" className="mx-auto">
                  <div>
                    <img class="mr-3" src="../../img/brand.png" alt=""></img>
                  </div>
                </NavbarBrand>
              </Container>
              <Container>
                <Nav className="mx-auto">{isAuthenticated && userInfo}</Nav>
              </Container>
              <Container>
                <div className="mx-auto">
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav navbar>{isAuthenticated ? authLinks : guestLinks}</Nav>
                  </Collapse>
                </div>
              </Container>
            </Container>
          </Navbar>
        </div>

        <Switch>
          <Route exact path="/Login">
            <LoginPage />
          </Route>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route exact path="/Register">
            <RegisterPage />
          </Route>
          <Route exact path="/Dashboard">
            <DashboardPage />
          </Route>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, null)(AppNavbar);
