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
  DropdownToggle,
  Spinner
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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink as NV
} from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import DashboardPage from "./DashboardPage";
import AccountPage from "./AccountPage";
import CashoutPage from "./CashoutPage";
import { toDollars } from "../util";
import ResetPassword from "./auth/ResetPassword";
import NotFound from "./NotFound";
class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    loadUser: PropTypes.func,
    isLoading: PropTypes.bool,
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
    const isLoading = this.props.isLoading;
    //console.log("NavBar Render", user);

    const userInfo = (
      <Fragment>
        {!isLoading ? (
          <span className="navbar-text text-dark " onClick={this.updateBalance}>
            <h5>{user ? toDollars(user.balance) : ""}</h5>
          </span>
        ) : (
          <Spinner color="dark" />
        )}
      </Fragment>
    );
    const guestLinks = (
      <Fragment>
        <Container>
          <Col sm="12" className="d-flex justify-content-center p-2">
            {/* <RegisterModal /> */}
            <Link
              onClick={this.toggle}
              exact
              to="/Register"
              className="text-start text-dark"
            >
              Register
            </Link>
          </Col>

          <Col sm="12" className="d-flex justify-content-center p-2">
            {/* <LoginModal /> */}
            <Link
              onClick={this.toggle}
              exact
              to="/Login"
              className="text-start text-dark "
            >
              Login
            </Link>
          </Col>
        </Container>
      </Fragment>
    );
    const authLinks = (
      <Fragment>
        <Container>
          <Col xs="12" className="d-flex justify-content-center align-middle ">
            <Container className="d-flex flex-column ">
              <Row className=" p-1  ">
                <Link
                  onClick={this.toggle}
                  className="text-dark  d-inline  "
                  exact
                  to="/Account"
                >
                  <i className="fa fa-lg fa-user   mr-3 align-middle"></i>
                  Account
                </Link>
              </Row>

              <DropdownItem divider />

              <Row className=" p-1 ">
                <Link
                  onClick={this.toggle}
                  className="text-dark  d-inline"
                  exact
                  to="/Dashboard"
                >
                  <i className="fa fa-lg fa-home   mr-3 align-middle"></i>
                  Dashboard
                </Link>
              </Row>

              <DropdownItem divider />

              <Row className="p-1">
                <Link
                  onClick={this.toggle}
                  className="text-dark  d-inline"
                  exact
                  to="/Cashout"
                >
                  <i className="fas fa-lg fa-money-bill-alt   mr-3 align-middle"></i>
                  Cashout
                </Link>
              </Row>
              <DropdownItem divider />

              <Row className="p-1">
                <Link
                  onClick={this.toggle}
                  className="text-dark  d-inline"
                  exact
                  to="/Help"
                >
                  <i className="fas fa-lg fa-question-circle   mr-3 align-middle"></i>
                  Help
                </Link>
              </Row>

              <DropdownItem divider />

              <Row className=" p-1">
                <Link
                  className="text-dark d-inline"
                  onClick={e => {
                    this.props.logout();
                    this.toggle();
                  }}
                >
                  <i className="fas fa-lg fa-sign-out-alt   mr-3 align-middle"></i>
                  Logout
                </Link>
              </Row>
            </Container>
          </Col>
        </Container>
      </Fragment>
    );
    return (
      <Router basename="/app">
        <div>
          <Navbar color="light" light className="mb-5 fixed-top  shadow ">
            <Col xs="4" className="align-self-start mr-auto">
              <NavbarBrand href="/">
                <a href="" className="navbar-brand">
                  <img src={siteLogo} className="site-logo" />
                </a>
              </NavbarBrand>
            </Col>
            <Col xs="4" className="align-self-center ml-auto mr-auto mt-auto">
              {isAuthenticated ? userInfo : null}
            </Col>

            <NavbarToggler
              onClick={this.toggle}
              className=" align-self-end mt-auto mb-auto mr-auto "
            />

            <Col xs="12">
              <Collapse isOpen={this.state.isOpen} navbar>
                {/* <Nav>{isAuthenticated ? authLinks : guestLinks}</Nav> */}
                {isAuthenticated ? authLinks : guestLinks}
              </Collapse>
            </Col>
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
          <Route
            exact
            path="/Help"
            component={() => {
              window.location.href = "https://support.coinguru.biz/hesk";
              return null;
            }}
          />

          <Route path="*" exact={true}>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  user: state.auth.user
});

export default connect(mapStateToProps, { loadUser, logout })(AppNavbar);
