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
  Alert
} from "reactstrap";
import { Redirect, Link } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authAction";
import { clearErrors, returnErrors } from "../../actions/errorAction";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    msg: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    returnErrors: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  componentDidMount(prevProps) {}
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
      <Container className=" mx-auto justify-content-center mt-5">
        <Card className="shadow p-2">
          {this.state.msg ? (
            <Alert color="danger">{this.state.msg}</Alert>
          ) : null}
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
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
                Login
              </Button>
            </FormGroup>
            <FormGroup className="d-flex flex-direction-row justify-content-between">
              <div>
                Not a member:{" "}
                <Link exact to="/Register">
                  Register now
                </Link>
              </div>
              <Link exact to="/Reset">
                Forgot Password?
              </Link>
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
  user: state.auth.user
});

export default connect(mapStateToProps, { login, returnErrors, clearErrors })(
  LoginPage
);
