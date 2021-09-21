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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { Redirect, Link } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateDetails } from "../actions/authAction";
import { clearErrors } from "../actions/errorAction";
import { freemem } from "os";

class CashoutPage extends Component {
  state = {
    msg: "",
    name: this.props.user.name,
    email: this.props.user.email,
    password: this.props.user.password,
    wallet: "",
    formEnabled: false
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    activity: PropTypes.object.isRequired,
    getActivity: this.propTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  componentDidMount(prevProps) {
    const { error, isAuthenticated } = this.props;
    this.props.getActivity();
    // if (isAuthenticated) {
    //   console.log("authenticated mount");
    //   this.setState({ isAuth: true });
    // }
  }
  componentDidUpdate(prevProps, prevState) {}

  render() {
    const isAuthenticated = this.props.isAuthenticated;
    const user = this.props.user;
    const formEnabled = this.state.formEnabled;
    //console.log(offers);
    //console.log("dashboard render is Auth", this.props.isAuthenticated);
    const login = <Redirect exact to="/Login" />;
    if (!isAuthenticated) {
      return login;
    }

    return (
      <Container className=" mx-auto justify-content-center py-5">
        <Card className="shadow mt-5">
          <Container fluid={true} className="d-flex justify-content-start">
            <div>
              <h1>Balance</h1>
              <h1>555</h1>
            </div>
            <div>
              <h1>Total</h1>
              <h1>555</h1>
            </div>
            <div>
              <h1>Pending</h1>
              <h1>555</h1>
            </div>
          </Container>
        </Card>
        <Card className="shadow mt-5 p-3">
          <Label>Activity:</Label>
          <ListGroup>
            <ListGroupItem>Cras justo odio</ListGroupItem>
            <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
            <ListGroupItem>Morbi leo risus</ListGroupItem>
            <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
            <ListGroupItem>Vestibulum at eros</ListGroupItem>
          </ListGroup>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  updated: state.auth.updated,
  error: state.error,
  user: state.auth.user
});

export default connect(mapStateToProps, { updateDetails, clearErrors })(
  CashoutPage
);
