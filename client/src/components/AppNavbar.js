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
import siteLogo from "../../src/coinguru2.png";
import * as Icon from "react-bootstrap-icons";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
import { stat } from "fs";
import { DEFAULT_MIN_VERSION } from "tls";
import { logout, loadUser } from "../actions/authAction";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import DashboardPage from "./DashboardPage";
import AccountPage from "./AccountPage";
import CashoutPage from "./CashoutPage";
import { toDollars } from "../util";
import ResetPassword from "./auth/ResetPassword";
class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    loadUser: PropTypes.func,
    logout: PropTypes.func.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  updateBalance = () => {
    this.props.loadUser();
  };

  render() {
    const user = this.props.user;
    const isAuthenticated = this.props.isAuthenticated;
    //console.log("NavBar Render", user);

    const userInfo = (
      <Fragment>
        <span
          className="navbar-text text-success "
          onClick={this.updateBalance}
        >
          <h5>{user ? toDollars(user.balance) : ""}</h5>
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
          <DropdownToggle nav>
            {/* <Icon.Gear size={24} /> */}
            <i class="fa fa-lg fa-cog custom-icon"></i>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <Link className="text-dark  " exact to="/Account">
                <Row className="d-flex justify-content-start4">
                  <i className="fa fa-lg fa-user fa-pull-left mt-2 mr-3"></i>
                  <span>Account</span>
                </Row>
              </Link>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <Link className="text-dark  " exact to="/Dashboard">
                <Row className="d-flex justify-content-start ">
                  <i className="fa fa-lg fa-home fa-pull-left mt-2 mr-3"></i>
                  <span>Dashboard</span>
                </Row>
              </Link>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <Link className="text-dark  " exact to="/Cashout">
                <Row className="d-flex justify-content-start">
                  <i className="fas fa-lg fa-money-bill-alt fa-pull-left mt-2 mr-3"></i>
                  <span>Cashout</span>
                </Row>
              </Link>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <div className="text-dark" onClick={this.props.logout}>
                <Row className="d-flex justify-content-start">
                  <i className="fas fa-lg fa-sign-out-alt fa-pull-left mt-2 mr-3"></i>
                  <span>Logout</span>
                </Row>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Fragment>
    );
    return (
      <Router>
        <div>
          <Navbar
            color="light"
            light
            expand="xs"
            className="mb-5 fixed-top  shadow "
          >
            <Container>
              <Container>
                <NavbarBrand href="/" className="mx-auto">
                  <a href="" class="navbar-brand">
                    <img
                      class="d-flex"
                      src={siteLogo}
                      width="180"
                      height="32"
                      alt=""
                    />
                  </a>
                </NavbarBrand>
              </Container>
              <Container>
                <Nav className="mx-auto">
                  {isAuthenticated ? userInfo : null}
                </Nav>
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
          <Route exact path="/Reset">
            <ResetPassword />
          </Route>
          <Route exact path="/Dashboard">
            <DashboardPage />
          </Route>
          <Route exact path="/Account">
            <AccountPage />
          </Route>
          <Route exact path="/Cashout">
            <CashoutPage />
          </Route>
          <Route path="/NotFound">
            <h1>NotFound</h1>
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

export default connect(mapStateToProps, { loadUser, logout })(AppNavbar);
