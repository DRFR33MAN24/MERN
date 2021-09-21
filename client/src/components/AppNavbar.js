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
          <strong>{user ? toDollars(user.balance) : ""}</strong>
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
            <Icon.Gear size={24} />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <Link
                className="text-dark d-flex justify-content-start "
                exact
                to="/Account"
              >
                <Icon.Person size={24} />
                <div className="ml-3">Account</div>
              </Link>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <Link
                className="text-dark d-flex justify-content-start "
                exact
                to="/Dashboard"
              >
                <Icon.House size={24} />
                <div className="ml-3">Dashboard</div>
              </Link>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <Link
                className="text-dark d-flex justify-content-start "
                exact
                to="/Cashout"
              >
                <Icon.CashCoin size={24} />
                <div className="ml-3">Cashout</div>
              </Link>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <div
                className="d-flex justify-content-start"
                onClick={this.props.logout}
              >
                <Icon.CashCoin size={24} />
                <div className="ml-3">Logout</div>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Fragment>
    );
    return (
      <Router>
        <div>
          <Navbar color="dark" dark expand="xs" className="mb-5 fixed-top ">
            <Container>
              <Container>
                <NavbarBrand href="/" className="mx-auto">
                  <div>
                    <img class="mr-3" src="../../img/brand.png" alt=""></img>
                  </div>
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
