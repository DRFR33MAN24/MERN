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
  PaginationLink,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  InputGroup,
  InputGroupAddon,
  InputGroupText
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
  constructor(props) {
    super(props);

    //Timer
    this.typingTimeout = null;
    this.searchEnabled = false;
  }

  state = {
    isAuth: false,
    offer_page: 0,
    show_items: 16,
    dropdownOpen: false,
    sortType: 1,
    offerType: 1,
    searchValue: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    getOffers: PropTypes.func,
    offers: PropTypes.object,
    user: PropTypes.object
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    const clientOS = getOS();
    axios.get("https://freegeoip.app/json/").then(res => {
      const country = res.data.country_code.toLowerCase();
      // Test_cond
      //this.props.getOffers(user.id, country, clientOS);
      this.props.getOffers(user.id, "us", "android");
    });
  }

  componentWillMount() {}

  componentWillReceiveProps(prevProps) {}
  componentDidUpdate(prevProps, prevState) {}

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

  doSearch = evt => {
    // Clears the previously set timer.
    clearTimeout(this.typingTimeout);

    // Reset the timer, to make the http call after 475MS (this.callSearch is a method which will call the search API. Don't forget to bind it in constructor.)
    this.typingTimeout = setTimeout(this.searchOffers, 475);

    // Setting value of the search box to a state.
    this.setState({ [evt.target.name]: evt.target.value });
  };

  previous_page = () => {
    if (this.state.offer_page != 0) {
      this.setState({ offer_page: this.state.offer_page - 1 });
    }
  };
  getInstall = () => {
    this.setState({ offerType: 1, offer_page: 0 });
  };

  getPopular = () => {
    this.setState({ offerType: 2, offer_page: 0 });
  };

  getCC = () => {
    this.setState({ offerType: 3, offer_page: 0 });
  };

  getMin = () => {
    this.setState({ sortType: 1 });
  };

  getMax = () => {
    this.setState({ sortType: 2 });
  };

  getNew = () => {
    this.setState({ sortType: 3 });
  };

  getFinalOffers = () => {
    const { offers } = this.props.offers;
    let offers_semi;

    switch (this.state.offerType) {
      case 1:
        offers_semi = offers.filter(item => {
          return item.category === "Mobile";
        });
        break;

      case 2:
        offers_semi = offers.filter(item => {
          return item.category === "Pop";
        });

        break;

      case 3:
        offers_semi = offers.filter(item => {
          return item.category === "CC";
        });

        break;

      default:
        offers_semi = offers.filter(item => {
          return item.category === "Pop";
        });
        break;
    }
    if (this.searchEnabled) {
      // do search
      offers_semi = offers_semi.filter(item =>
        item.name.includes(this.state.searchValue)
      );
      this.searchEnabled === false;
      // set search enabled to false
    }

    switch (this.state.sortType) {
      case 1:
        return offers_semi.sort((a, b) => a.amount - b.amount);

      case 2:
        return offers_semi.sort((a, b) => b.amount - a.amount);

      default:
        return offers_semi.sort((a, b) => b.amount - a.amount);
    }
  };

  onChange = e => {
    // this.setState({
    //   [e.target.name]: e.target.value
    // });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  render() {
    const { offers } = this.props.offers;
    const offers_final = this.getFinalOffers();

    const { user } = this.props;
    const featuredOffers = offers.filter(item => item.featured === 1);
    const surveys = offers.filter(item => {
      return (
        item.category === "Survey" ||
        item.category === "Daily" ||
        item.category === "Complete Survey"
      );
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
    console.log("dashboard render is Auth", this.props.isAuthenticated);
    const login = <Redirect exact to="/Login" />;
    if (isAuthenticated === false) {
      return login;
    }
    if (isAuthenticated === undefined) {
      return <h1>wait...</h1>;
    }
    if (user === null) {
      return null;
    }
    return (
      <Container fluid={true} className=" py-5 ">
        <Row className="mt-2">
          <Container className="text-center">
            <h3 className="mt-5 ml-2 ">Featured Surveys</h3>
            <hr
              style={{
                color: "black",
                backgroundColor: "black",
                height: 3
              }}
            />
          </Container>

          <Container className="py-5 ">
            <table class="table table-striped  custom-shadow table-sm ">
              <thead className="bg-light">
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
                          <td>{toDollars(amount)}</td>
                          <td>
                            <a
                              className="btn btn-warning custom-btn"
                              href={this.getlink(link, user.id)}
                            >
                              Go
                            </a>
                          </td>
                        </tr>
                      )
                    )
                  : null}
              </tbody>
            </table>
          </Container>
        </Row>
        {/* {featuredOffers.length != 0 ? (
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
        )} */}
        <Row className="d-flex justify-content-center mb-3 mt-3  custom-shadow bg-light">
          <Nav>
            <Container
              fluid={true}
              className="d-flex flex-row flex-wrap justify-content-center"
            >
              <NavItem>
                <NavLink
                  href="#"
                  onClick={this.getInstall}
                  className="text-dark"
                >
                  <i
                    class="fas fa-2x fa-mobile-alt custom-icon align-middle"
                    aria-hidden="true"
                  ></i>
                  <span> Mobile</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#"
                  onClick={this.getPopular}
                  className="text-dark"
                >
                  <i
                    class="fa fa-2x  fa-line-chart custom-icon align-middle"
                    aria-hidden="true"
                  ></i>
                  <span> Popular</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.getCC} className="text-dark">
                  <i class="fas fa-2x fa-shopping-cart custom-icon align-middle"></i>
                  <span> Purchase</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <ButtonDropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggle}
                >
                  <DropdownToggle
                    caret
                    className=" btn btn-warning custom-btn mt-1"
                  >
                    Sort
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <NavLink onClick={this.getMin}>min{"->"}max</NavLink>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <NavLink onClick={this.getMax}>max{"->"}min</NavLink>
                    </DropdownItem>
                    <DropdownItem divider />
                  </DropdownMenu>
                </ButtonDropdown>
              </NavItem>
            </Container>
          </Nav>
        </Row>
        <Row className="custom-shadow bg-light justify-content-center p-2">
          <Col xs="12" sm="6" className="d-flex flex-row">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-search  "></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Search offers"
                onChange={evt => this.doSearch(evt)}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center" id="offers">
          {offers_final
            .slice(range_min, range_max)
            .map(
              ({
                title,
                description,
                link,
                img,
                amount,
                conversion,
                device,
                category
              }) => (
                <div className="">
                  {isAuthenticated ? (
                    <Offer
                      title={title}
                      description={description}
                      link={this.getlink(link, user.id)}
                      amount={toDollars(amount)}
                      img={img}
                      conversion={conversion}
                      device={device}
                      category={category}
                    />
                  ) : null}
                </div>
              )
            )}
        </Row>

        <Row className="d-flex justify-content-center bg-light custom-shadow mb-3 mt-3">
          <Pagination className="mt-3" aria-label="Page navigation example">
            <PaginationItem>
              <PaginationLink
                previous
                href="#offers"
                onClick={this.previous_page}
                className=" bg-warning text-dark custom-btn"
              >
                Back
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                first
                href="#offers"
                onClick={this.next_page}
                className=" bg-warning text-dark custom-btn"
              >
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
