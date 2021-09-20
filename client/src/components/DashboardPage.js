import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Card,
  Alert,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import Offer from "./Offer";
import { Redirect } from "react-router-dom";
import { getOffers } from "../actions/offerAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../actions/authAction";
import { Timestamp } from "bson";
import { toDollars } from "../util";

class DashboardPage extends Component {
  state = {
    isAuth: false,
    offer_page: 1
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    getOffers: PropTypes.func,
    offers: PropTypes.object,
    user: PropTypes.object
  };

  componentDidMount() {
    console.log("dashboard DidMount is Auth", this.props.isAuthenticated);
    if (this.props.isAuthenticated) {
      const { user } = this.props;
      this.props.getOffers(user.id, "us", "ios");
    }

    //this.props.getOffers();
  }

  componentWillMount() {
    const { isAuthenticated } = this.props;

    console.log("Dashboard did mount", isAuthenticated);
    this.setState({ isAuth: isAuthenticated });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Dashboard did update");
    const { isAuthenticated } = this.props;

    if (prevState.isAuth !== isAuthenticated) {
      console.log(" dash authenticated mount", isAuthenticated);
      this.setState({ isAuth: isAuthenticated });
    }
  }

  //   toggle = () => {
  //     // Clear errors
  //     this.props.clearErrors();
  //     this.setState({
  //       modal: !this.state.modal
  //     });
  //   };
  getlink = (l, id) => {
    const u = new URL(l);
    const domain = u.hostname;
    if (domain === "www.kiwiwall.com") {
      u.searchParams.set("s", id);
    } else {
      u.searchParams.set("subid", id);
    }
    return u;
  };
  next_page = () => {
    this.setState({ offer_page: this.state.offer_page + 1 })
  }

  previous_page = () => {
    if (this.state.offer_page != 0) {
      this.setState({ offer_page: this.state.offer_page - 1 })
    }
  }
  onChange = e => {
    // this.setState({
    //   [e.target.name]: e.target.value
    // });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { offers } = this.props.offers;
    const { user } = this.props;
    //const { user } = this.props;
    // console.log(user.id);
    const isAuthenticated = this.props.isAuthenticated;
    console.log(isAuthenticated);
    //console.log("dashboard render is Auth", this.props.isAuthenticated);
    const login = <Redirect exact to="/Login" />;
    if (!isAuthenticated) {
      return login;
    }
    if (user === null) {
      return null;
    }
    return (
      <Container fluid={true} className="">
        <Row>
          <Container fluid={true}>
            <Label className="">Featured Offers:</Label>
            <Row className="d-flex justify-content-left pl-1">
              <Offer></Offer>
            </Row>
          </Container>
        </Row>
        <Row className="d-flex justify-content-center mb-3 mt-3 shadow bg-dark">
          <Nav>
            <NavItem>
              <NavLink href="#">Install</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Pin Submit</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Survey</NavLink>
            </NavItem>

          </Nav>
        </Row>
        <Row className="d-flex justify-content-around">
          {offers.map(
            ({ title, description, link, img, amount, conversion }) => (
              <div className="">
                {isAuthenticated ? (
                  <Offer
                    title={title}
                    description={description}
                    link={this.getlink(link, user.id)}
                    amount={toDollars(amount)}
                    img={img}
                    conversion={conversion}
                  />
                ) : null}
              </div>
            )
          )}
        </Row>

        <Row className="d-flex justify-content-center bg-dark mb-3 mt-3">
          <Pagination className="mt-3" aria-label="Page navigation example">
            <PaginationItem>
              <PaginationLink first href="#" onClick={this.next_page} >Next</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink previous href="#" onClick={this.previous_page} >Back</PaginationLink>
            </PaginationItem>

          </Pagination>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  offers: state.offer,
  user: state.auth.user
});

export default connect(mapStateToProps, { getOffers })(DashboardPage);
