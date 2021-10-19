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
  Spinner,
  ListGroupItem,
  ListGroup
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
import OfferPage from "./OfferPage";
import NotificationMenu from "./NotificationMenu";
class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.menu = React.createRef();
  }
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

  componentDidMount() {
    document.addEventListener("mousedown", this.mouseDownHandler);
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: "your-app-id",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v11.0"
      });
    };
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.mouseDownHandler);
  }

  mouseDownHandler = event => {
    if (!this.menu.current.contains(event.target)) {
      this.close();
    }
  };

  close = () => {
    this.setState({ isOpen: false });
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
        <Container className="d-flex justify-content-center  ">
          <Col xs="4" sm="3" lg="2" className="d-flex flex-column p-2 ">
            {/* <RegisterModal /> */}
            <Link
              onClick={this.toggle}
              exact
              to="/Register"
              className=" text-start text-dark"
            >
              <i className="fa fa-lg fa-user-plus fa-fw   align-middle"></i>
              <span class="ml-3">Register</span>
            </Link>
            <Link
              onClick={this.toggle}
              exact
              to="/Login"
              className="text-start text-dark"
            >
              <i className="fas fa-lg fa-sign-in-alt fa-fw   align-middle"></i>
              <span className="ml-3">Login</span>
            </Link>
          </Col>
        </Container>
      </Fragment>
    );
    const authLinks = (
      <Fragment>
        <Container className="d-flex justify-content-center  ">
          <Col xs="5" sm="4" lg="2" className="d-flex flex-column py-3 ">
            <Link
              onClick={this.toggle}
              className="text-start text-dark  "
              exact
              to="/Account"
            >
              <i className="fa fa-lg fa-user  fa-fw align-middle"></i>
              <span className="ml-3">Account</span>
            </Link>

            <Link
              onClick={this.toggle}
              className="text-start text-dark"
              exact
              to="/Dashboard"
            >
              <i className="fa fa-lg fa-home   fa-fw align-middle"></i>
              <span className="ml-3">Dashboard</span>
            </Link>

            <Link
              onClick={this.toggle}
              className="text-start text-dark"
              exact
              to="/Cashout"
            >
              <i className="fas fa-lg fa-money-bill-alt   fa-fw align-middle"></i>
              <span className="ml-3">Cashout</span>
            </Link>

            <Link
              onClick={e => {
                this.toggle();
                window.location.href = "https://support.coinguru.biz/hesk";
              }}
              className="text-start text-dark"
              exact
              to=""
            >
              <i className="fas fa-lg fa-question-circle   fa-fw align-middle"></i>
              <span className="ml-3">Help</span>
            </Link>

            <Link
              className="text-start text-dark"
              onClick={e => {
                this.props.logout();
                this.toggle();
              }}
            >
              <i className="fas fa-lg fa-sign-out-alt   fa-fw align-middle"></i>
              <span className="ml-3">Logout</span>
            </Link>
          </Col>
        </Container>
      </Fragment>
    );
    return (
      <Router basename="/app">
        <div ref={this.menu}>
          <Navbar
            color="light"
            light
            className="mb-5 fixed-top  custom-shadow "
          >
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

            <Collapse isOpen={this.state.isOpen} navbar>
              {/* <Nav>{isAuthenticated ? authLinks : guestLinks}</Nav> */}
              {isAuthenticated ? authLinks : guestLinks}
            </Collapse>
            <Collapse isOpen={true} navbar>
              <NotificationMenu />
            </Collapse>
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
          <Route path="/Offer/:id" component={OfferPage} />

          {/* <Route
            exact
            path="/Help"
            component={() => {
              window.location.href = "https://support.coinguru.biz/hesk";
              return null;
            }}
          /> */}

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
