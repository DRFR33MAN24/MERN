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
import { Redirect, Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authAction";
import { sendEmail } from "../../actions/sendEmailAction";
import { clearErrors, returnErrors } from "../../actions/errorAction";
import { bindActionCreators } from "redux";

class RegisterPage extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    active: false,
    msg: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    returnErrors: PropTypes.func.isRequired,
    user: PropTypes.object,
    sendEmail: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps, prevState) {
    console.log("com did update");
    const { error, isAuthenticated } = this.props;

    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else if (error.id === "REGISTER_SUCCESS") {
        console.log("register complete");
      } else {
      }

      //this.props.clearErrors();
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password, active } = this.state;

    // Create user object
    const newUser = {
      name,
      email,
      password,
      active
    };
    // Attempt to register
    this.props.register(newUser);
    this.props.returnErrors();
  };

  render() {
    const isAuthenticated = this.props.isAuthenticated;

    console.log("login render", isAuthenticated);

    const dashboard = <Redirect exact to="/Dashboard" />;

    if (isAuthenticated) {
      return dashboard;
    }

    return (
      <Container className="mx-auto justify-content-center mt-5">
        <Container className=" mx-auto justify-content-center text-center p-5">
          <Icon.Key size={128} />
        </Container>
        <Card className="shadow p-4">
          {this.props.emailSent ? (
            <Alert color="success">{"Email sent"}</Alert>
          ) : null}
          {this.state.msg ? (
            <Alert color="danger">{this.state.msg}</Alert>
          ) : null}
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={this.onChange}
                className="mb-3"
              />

              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={this.onChange}
                className="mb-3"
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={this.onChange}
                className="mb-3"
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Register
              </Button>
            </FormGroup>
            <FormGroup className="d-flex flex-direction-row justify-content-between">
              <div>
                Already a member:{" "}
                <Link exact to="/Login">
                  Login
                </Link>
              </div>
            </FormGroup>
          </Form>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,

  error: state.error,
  user: state.auth.user,
  emailSent: state.auth.mail_sent
});

export default connect(mapStateToProps, {
  register,
  returnErrors,
  clearErrors,
  sendEmail
})(RegisterPage);
