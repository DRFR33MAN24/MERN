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
    offers: PropTypes.object
  };

  componentDidMount() {
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
    const { offers } = this.props.getOffers();
    console.log("dashboard render", this.state.isAuth);
    const login = <Redirect exact to="/Login" />;
    if (!this.state.isAuth) {
      return login;
    }
    return (
      <Container className="mx-auto justify-content-center">
        {offers.map(({ title, description, link, amount }) => (
          <div>
            {this.props.isAuthenticated ? (
              <Offer
                title={title}
                description={description}
                link={link}
                amount={amount}
              >
                &times;
              </Offer>
            ) : null}
            )}
          </div>
        ))}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(DashboardPage);
