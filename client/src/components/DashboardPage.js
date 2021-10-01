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
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import * as Icon from "react-bootstrap-icons";
import Offer from "./Offer";
import { Redirect } from "react-router-dom";
import { getOffers } from "../actions/offerAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../actions/authAction";
import { Timestamp } from "bson";
import { toDollars, getOS } from "../util";
import axios from "axios";
import NoContent from "./NoContent";

class DashboardPage extends Component {
  state = {
    isAuth: false,
    offer_page: 0,
    show_items: 16
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
      const clientOS = getOS();
      axios.get("https://freegeoip.app/json/").then(res => {
        const country = res.data.country_code.toLowerCase();
        // this.props.getOffers(user.id, country, clientOS);
        this.props.getOffers(user.id, "us", "android");
      });
    }

    //this.props.getOffers();
  }

  componentWillMount() {
    const { isAuthenticated } = this.props;

    console.log("Dashboard will mount", isAuthenticated);
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
    const { offers } = this.props.offers;
    if (this.state.offer_page * this.state.show_items < offers.length) {
      console.log("next page", offers.length);
      this.setState({ offer_page: this.state.offer_page + 1 });
    }
  };

  previous_page = () => {
    if (this.state.offer_page != 0) {
      this.setState({ offer_page: this.state.offer_page - 1 });
    }
  };
  getInstall = () => {
    // this.props.getOffers()
  };

  getSurvey = () => {
    // this.props.getOffers()
  };

  getPinSubmit = () => {
    // this.props.getOffers()
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
    const featuredOffers = offers.filter(item => item.featured === 1);
    const surveys = offers.filter(item => {
      return item.category === "Survey" || item.category === "Daily";
    });
    console.log(surveys);
    const range_min = this.state.show_items * this.state.offer_page;
    const range_max = range_min + this.state.show_items;

    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 600 },
        items: 3,
        slidesToSlide: 3 // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 600, min: 550 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 400, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
      }
    };
    //const { user } = this.props;
    // console.log(user.id);
    const isAuthenticated = this.props.isAuthenticated;
    // console.log(offers);
    //console.log("dashboard render is Auth", this.props.isAuthenticated);
    const login = <Redirect exact to="/Login" />;
    if (!isAuthenticated) {
      return login;
    }
    if (user === null) {
      return null;
    }
    return (
      <Container fluid={true} className=" py-5 ">
        <Row className="mt-2">
          <Container fluid={true} className="py-5">
            <table class="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Payout</th>
                  <th scope="col">link</th>
                </tr>
              </thead>
              <tbody>
                {surveys
                  ? surveys.map(
                      ({ title, description, link, amount }, index) => (
                        <tr>
                          <th scope="row">{index}</th>
                          <td>{title}</td>
                          <td>{description}</td>
                          <td>{amount}</td>
                          <td>
                            <a href={this.getlink(link, user.id)}>Join</a>
                          </td>
                        </tr>
                      )
                    )
                  : null}
              </tbody>
            </table>
          </Container>
        </Row>
        {featuredOffers.length != 0 ? (
          <Row className="mt-2">
            <Container fluid={true}>
              <Label className="">Featured Offers:</Label>
              <Carousel
                swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={this.props.deviceType !== "mobile" ? true : false}
                autoPlaySpeed={200}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={2000}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {featuredOffers.map(
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
              </Carousel>
            </Container>
          </Row>
        ) : (
          <NoContent />
        )}
        <Row className="d-flex justify-content-center mb-3 mt-3 shadow bg-light">
          <Nav>
            <NavItem>
              <NavLink href="#" onClick={this.getInstall}>
                <i
                  class="fa fa-2x fa-gamepad custom-icon"
                  aria-hidden="true"
                ></i>
                <span> Games</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={this.getPinSubmit}>
                <i
                  class="fa fa-2x fa-keyboard custom-icon"
                  aria-hidden="true"
                ></i>
                <span> PIN Submit</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={this.getSurvey}>
                <i class="fas fa-2x fa-poll custom-icon"></i>
                <span> Survey</span>
              </NavLink>
            </NavItem>
          </Nav>
        </Row>
        <Row className="d-flex justify-content-start">
          {offers
            .slice(range_min, range_max)
            .map(({ title, description, link, img, amount, conversion }) => (
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
            ))}
        </Row>

        <Row className="d-flex justify-content-center bg-dark mb-3 mt-3">
          <Pagination className="mt-3" aria-label="Page navigation example">
            <PaginationItem>
              <PaginationLink previous href="#" onClick={this.previous_page}>
                Back
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink first href="#" onClick={this.next_page}>
                Next
              </PaginationLink>
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
