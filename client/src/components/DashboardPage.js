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

class DashboardPage extends Component {
  state = {
    isAuth: false
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
    u.searchParams.set("subid", id);
    return u;
  };
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
          <Label>Featured Offers:</Label>
          <Container fluid={true}>
            <Row className="d-flex justify-content-left">
              <h1>Hello</h1>
            </Row>
          </Container>
        </Row>
        <Row className="d-flex justify-content-center mb-3 mt-3 shadow bg-dark">
          <Nav>
            <NavItem>
              <NavLink href="#">Link</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Link</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Another Link</NavLink>
            </NavItem>
            <NavItem>
              <NavLink disabled href="#">
                Disabled Link
              </NavLink>
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
                    amount={amount}
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
              <PaginationLink first href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink previous href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink next href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink last href="#" />
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
