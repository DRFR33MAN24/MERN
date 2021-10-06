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
  Alert,
  Row,
  Col
} from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import ReCaptchaV2 from "react-google-recaptcha";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authAction";
import { sendEmail } from "../../actions/sendEmailAction";
import { clearErrors, returnErrors } from "../../actions/errorAction";
import LoadingModal from "../LoadingModal";
import { bindActionCreators } from "redux";

class RegisterPage extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    active: false,
    msg: "",
    token: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
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
  handleToken = token => {
    this.setState({ token: token });
  };
  handleExpire = () => {
    this.setState({ token: null });
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password, active, token } = this.state;

    // Create user object
    const newUser = {
      name,
      email,
      password,
      active,
      token
    };
    // Attempt to register
    this.props.register(newUser);
    this.props.returnErrors();
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
      <Container className="mx-auto justify-content-center mt-5 mb-5 ">
        <LoadingModal open={isLoading} />
        <Container className=" mx-auto  justify-content-start  p-5">
          <Row className="px-3">
            <i class="fas fa-3x fa-user-plus"></i>
            <h1 className="ml-3">Register</h1>
          </Row>
          <hr></hr>
        </Container>
        <Row className="d-flex justify-content-center ">
          <Col lg="6" xs="12">
            <Card className="shadow p-4 bg-light">
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
                  <ReCaptchaV2
                    sitekey="6Le54pscAAAAACxYbAovh0tZWg-KSZ1v_CPigC2A"
                    onChange={this.handleToken}
                    onExpired={this.handleExpire}
                  />
                  <Button color="warning" style={{ marginTop: "2rem" }} block>
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
  user: state.auth.user,
  emailSent: state.auth.mail_sent
});

export default connect(mapStateToProps, {
  register,
  returnErrors,
  clearErrors,
  sendEmail
})(RegisterPage);
