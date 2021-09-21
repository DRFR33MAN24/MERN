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
        <Card className="shadow mt-5">
          <Container fluid={true} className="d-flex justify-content-start">
            <div>
              <h1>Balance</h1>
              <h1>555</h1>
            </div>
          </Container>
        </Card>
        <Card className="shadow mt-5">
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
