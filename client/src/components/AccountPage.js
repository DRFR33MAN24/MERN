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
  ModalFooter
} from "reactstrap";
import { Redirect, Link } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateDetails } from "../actions/authAction";
import { clearErrors } from "../actions/errorAction";
import { freemem } from "os";
import LoadingModal from "./LoadingModal";
class AccountPage extends Component {
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
    isLoading: PropTypes.bool,
    error: PropTypes.object.isRequired,
    updateDetails: PropTypes.func.isRequired,
    updated: PropTypes.bool,
    clearErrors: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  componentDidMount(prevProps) {
    const { error, isAuthenticated } = this.props;

    // if (isAuthenticated) {
    //   console.log("authenticated mount");
    //   this.setState({ isAuth: true });
    // }
  }
  componentDidUpdate(prevProps, prevState) {
    const isAuthenticated = this.props.isAuthenticated;
    const error = this.props.error;
    const updated = this.props.updated;
    console.log("isAuthenticated:", isAuthenticated);
    console.log("login did update", this.state.isAuth);
    console.log("login did update prev", prevState.isAuth);
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
    if (updated !== prevProps.updated) {
      // Check for register error
      if (error === true) {
        this.setState({ msg: "Updated" });
      } else {
        this.setState({ msg: null });
      }

      // If authenticated close modal
      // If authenicated go to dashboard
    }
    if (prevState.isAuth !== isAuthenticated) {
      console.log("authenticated mount", isAuthenticated);
      this.setState({ isAuth: isAuthenticated });
    }
  }

  onEdit = () => {
    this.setState({ formEnabled: true });
  };

  onSave = () => {
    const user = this.props.user;
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      id: user.id,
      wallet: this.state.wallet
    };

    if (
      user.name != newUser.name ||
      user.email != newUser.email ||
      user.password != newUser.password ||
      user.wallet != newUser.wallet
    ) {
      this.props.updateDetails(newUser);
      this.setState({ formEnabled: false });

      //update details will issue an action to change database
      // and send an email to user set mail address
      // and change the user.active field in db to false
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const isAuthenticated = this.props.isAuthenticated;
    const isLoading = this.props.isLoading;
    const user = this.props.user;
    const formEnabled = this.state.formEnabled;
    //console.log(offers);
    //console.log("dashboard render is Auth", this.props.isAuthenticated);
    const login = <Redirect exact to="/Login" />;
    if (isAuthenticated === false) {
      return login;
    }
    if (isAuthenticated === undefined) {
      return <h1>wait...</h1>;
    }

    const confirmModal = (
      <Fragment>
        <Modal
          isOpen={true}
          modalTransition={{ timeout: 2000 }}
          className="modal-dialog-centered"
        >
          <ModalHeader>Email Sent</ModalHeader>
          <ModalBody className="text-center">
            <i class="fa fa-envelope fa-5x" aria-hidden="true"></i>
            <p className="font-italic">Check your Email to confirm changes.</p>

            <ModalFooter className="d-flex justify-content-start">
              <Button
                block
                className="btn btn-warning custom-btn"
                onClick={e => {
                  window.location.href = "/Login";
                }}
              >
                Login
              </Button>
              <p className="text-dark">
                <span className="font-weight-bold">NOTE:</span> In case you
                can't find the message, please check your spam
              </p>
            </ModalFooter>
          </ModalBody>
        </Modal>
      </Fragment>
    );

    return (
      <Container className=" mx-auto justify-content-center py-5 ">
        <LoadingModal open={isLoading} />
        <Card className="custom-card-shadow p-2 mb-3 mt-5">
          {this.props.updated ? <Alert>Updated</Alert> : null}
          {this.props.updated ? confirmModal : null}
          <Label className="mb-3">User Details:</Label>
          <Container>
            <Form>
              <Label className="mt-2">User Name:</Label>
              <Input
                name="name"
                disabled={!formEnabled}
                defaultValue={user.name}
                onChange={value => this.onChange(value)}
              ></Input>
              <Label className="mt-2">Email:</Label>
              <Input
                name="email"
                disabled={!formEnabled}
                defaultValue={user.email}
                onChange={value => this.onChange(value)}
              ></Input>
              <Label className="mt-2">Password:</Label>
              <Input
                name="password"
                disabled={!formEnabled}
                type="password"
                defaultValue={user.password}
                onChange={value => this.onChange(value)}
              ></Input>

              <Label className="mt-2">Wallet Address:</Label>
              <Input
                name="wallet"
                type="text"
                defaultValue={user.wallet}
                onChange={value => this.onChange(value)}
                disabled={!formEnabled}
              ></Input>
            </Form>
          </Container>
          <Container className="mt-3 mb-3 p-1 d-flex justify-content-center">
            <Button className="mx-3" onClick={this.onEdit}>
              Edit
            </Button>
            <Button className="mx-3" onClick={this.onSave}>
              Save
            </Button>
          </Container>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  updated: state.auth.updated,
  error: state.error,
  user: state.auth.user
});

export default connect(mapStateToProps, { updateDetails, clearErrors })(
  AccountPage
);
