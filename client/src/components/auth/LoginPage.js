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
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authAction";
import { clearErrors } from "../../actions/errorAction";

class LoginPage extends Component {
  state = {
    isAuth: false,

    email: "",
    password: "",
    msg: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
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

  toggle = () => {
    this.setState({ isAuth: true });
  };

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
    const user = this.props.user;
    console.log("login render", user);
    const dashboard = <Redirect exact to="/Dashboard" />;
    if (user != null) {
      return dashboard;
    }
    if (user === undefined || user === null) {
      return null;
    }

    return (
      <Container className=" mx-auto justify-content-center">
        <Card className="p-2">
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

export default connect(mapStateToProps, { login, clearErrors })(LoginPage);
