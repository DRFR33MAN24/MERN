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

class AccountPage extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    wallet: "",
    formEnabled: false
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    updateDetails: PropTypes.func.isRequired,
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
    if (prevState.isAuth !== isAuthenticated) {
      console.log("authenticated mount", isAuthenticated);
      this.setState({ isAuth: isAuthenticated });
    }
  }

  onEdit = () => {
    this.setState({ formEnabled: true });
  }

  onSave = () => {
    const user = this.props.user;
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      id: user.id
    };

    if (user.name != newUser.name
      || user.email != newUser.email
      || user.password != newUser.password) {

      // this.props.updateDetails(newUser)

      //update details will issue an action to change database
      // and send an email to user set mail address 
      // and change the user.active field in db to false
    }



  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    // Attempt to login
    this.props.login(user);
  };
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

    const confirmModal = (
      <Fragment>
        <Modal isOpen={true} className="modal-dialog-centered">
          <ModalHeader>Confirm Changes</ModalHeader>
          <ModalBody>
            <p>Check your Email to confirm changes.</p>

            <ModalFooter className="d-flex justify-content-start">
              <Button onClick={this.props.modal}>Close</Button>
            </ModalFooter>
          </ModalBody>
        </Modal>
      </Fragment>
    );

    return (
      <Container className=" mx-auto justify-content-center">
        <Card className="shadow p-2 mb-3">
          <Label className="mb-3">User Details:</Label>
          <Container>

            <Form >
              <Label className="mt-2">User Name:</Label>
              <Input disabled={!formEnabled} value={user.name}></Input>
              <Label className="mt-2">Email:</Label>
              <Input disabled={!formEnabled} value={user.email}></Input>
              <Label className="mt-2">Password:</Label>
              <Input disabled={!formEnabled} type="password" value={user.password}></Input>
              <Label className="mt-2">Repeat Password:</Label>
              <Input disabled={!formEnabled} type="password" value={user.password}></Input>
              <Label className="mt-2">Wallet Address:</Label>
              <Input disabled={!formEnabled}></Input>
            </Form>
          </Container>
          <Container className="mt-3 mb-3 p-1 d-flex justify-content-center">
            <Button className="mx-3" onClick={this.onEdit}>Edit</Button>
            <Button className="mx-3">Save</Button>
          </Container>
        </Card>

      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  user: state.auth.user
});

export default connect(mapStateToProps, { updateDetails, clearErrors })(AccountPage);
