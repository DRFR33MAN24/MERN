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
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../actions/authAction";

class DashboardPage extends Component {
  state = {
    isAuth: false
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

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
    console.log("dashboard render", this.state.isAuth);
    const login = <Redirect to="/Login" />;
    if (!this.state.isAuth) {
      return login;
    }
    return (
      <Container className="mx-auto justify-content-center">
        <Card className="p-2">
          <h1 className="text-center">Welcome</h1>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(DashboardPage);
