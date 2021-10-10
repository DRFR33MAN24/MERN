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
import { login } from "../../actions/authAction";
import { clearErrors, returnErrors } from "../../actions/errorAction";
import LoadingModal from "../LoadingModal";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    msg: "",
    token: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
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

  handleToken = token => {
    this.setState({ token: token });
  };
  handleExpire = () => {
    this.setState({ token: null });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password, token } = this.state;

    const user = {
      email,
      password,
      token
    };

    // Attempt to login
    this.props.login(user);
    this.props.returnErrors();
    window.grecaptcha.reset();
  };
  render() {
    const isAuthenticated = this.props.isAuthenticated;
    const isLoading = this.props.isLoading;
    console.log("login render", isAuthenticated);
    const dashboard = <Redirect exact to="/Dashboard" />;
    if (isAuthenticated) {
      return dashboard;
    }

    return (
      <Container className=" mx-auto justify-content-center mt-5 mb-5 ">
        <LoadingModal open={isLoading} />
        <Container className=" mx-auto  justify-content-start  p-5">
          <Row className="px-3">
            <i class="fas fa-3x fa-sign-in-alt"></i>
            <h1 className="ml-3">Login</h1>
          </Row>
          <hr></hr>
        </Container>
        <Row className="d-flex justify-content-center ">
          <Col lg="6" xs="12">
            <Card className="custom-shadow p-4 bg-light">
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
                  <ReCaptchaV2
                    sitekey="6Le54pscAAAAACxYbAovh0tZWg-KSZ1v_CPigC2A"
                    onChange={this.handleToken}
                    onExpired={this.handleExpire}
                  />
                  <Button color="warning" style={{ marginTop: "2rem" }} block>
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
  user: state.auth.user
});

export default connect(mapStateToProps, { login, returnErrors, clearErrors })(
  LoginPage
);
