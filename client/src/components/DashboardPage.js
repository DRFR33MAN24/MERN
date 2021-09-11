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
  Alert
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
    // this.props.getOffers(1, 1, 'us', '', 'ios');
    this.props.getOffers();
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
    //console.log(offers);
    console.log("dashboard render is Auth", this.props.isAuthenticated);
    const login = <Redirect exact to="/Login" />;
    if (!this.state.isAuth) {
      return login;
    }
    return (
      <Container className="d-flex align-items-center flex-wrap flex-md-nowrap ">
        {offers.map(({ title, description, link, amount, img, conversion }) => (
          <div>
            {this.props.isAuthenticated ? (
              <Offer
                title={title}
                description={description}
                link={link}
                amount={amount}
                img={img}
                conversion={conversion}
              />
            ) : null}
          </div>
        ))}
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
