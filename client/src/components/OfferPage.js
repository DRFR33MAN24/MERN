import React, { Component, Fragment } from "react";
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
  Col
} from "reactstrap";

import * as Icon from "react-bootstrap-icons";
import { Redirect, Link } from "react-router-dom";
import ReCaptchaV2 from "react-google-recaptcha";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/authAction";
import { getOfferByID } from "../actions/offerAction";
import { clearErrors, returnErrors } from "../actions/errorAction";
import { toDollars } from "../util";
import LoadingModal from "./LoadingModal";
import Offer from "./Offer";

class OfferPage extends Component {
  constructor(props) {
    super(props);
  }
  state = {};

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    returnErrors: PropTypes.func.isRequired,
    user: PropTypes.object,
    offer: PropTypes.array
  };

  componentDidMount(prevProps) {
    //const user = JSON.parse(localStorage.getItem("user"));
    const id = this.props.match.params.id;
    this.props.getOfferByID(id);
  }
  componentDidUpdate(prevProps, prevState) {
    const isAuthenticated = this.props.isAuthenticated;
    const error = this.props.error;
    console.log("isAuthenticated:", isAuthenticated);

    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }

      // If authenticated close modal
      // If authenicated go to dashboard
    }
  }

  render() {
    const { offer } = this.props.offer;

    const isAuthenticated = this.props.isAuthenticated;
    const isLoading = this.props.isLoading;
    console.log("login render", isAuthenticated);
    const dashboard = <Redirect exact to="/Dashboard" />;
    // if (isAuthenticated) {
    //   return dashboard;
    // }

    return (
      <Container className=" mx-auto justify-content-center mt-5 mb-5 ">
        <LoadingModal open={isLoading} />

        <Row className="d-flex justify-content-center ">
          <Col lg="6" xs="12">
            {offer.map(
              ({
                title,
                description,
                link,
                img,
                amount,
                conversion,
                device,
                category,
                disabled
              }) => (
                <div className="mt-5">
                  <Offer
                    title={title}
                    description={description}
                    //link={this.getlink(link, user.id, disabled)}
                    amount={toDollars(amount)}
                    img={img}
                    conversion={conversion}
                    device={device}
                    category={category}
                  />
                </div>
              )
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  error: state.error,
  offer: state.offer,
  user: state.auth.user
});

export default connect(mapStateToProps, {
  getOfferByID,
  returnErrors,
  clearErrors
})(OfferPage);
