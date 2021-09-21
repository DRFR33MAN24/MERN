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
  ListGroupItem,
  Row
} from "reactstrap";
import { Redirect, Link } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateDetails } from "../actions/authAction";
import { clearErrors } from "../actions/errorAction";
import { getActivity } from "../actions/activityAction";
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
    activity: PropTypes.object,
    getActivity: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  componentDidMount(prevProps) {
    const { error, isAuthenticated } = this.props;
    this.props.getActivity(13);
  }
  componentDidUpdate(prevProps, prevState) {}

  render() {
    const isAuthenticated = this.props.isAuthenticated;
    const user = this.props.user;
    const { activity } = this.props.activity;
    console.log(activity);
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
          <Container
            fluid={true}
            className="d-flex justify-content-start flex-column"
          >
            <div>
              <h3>Balance</h3>
              <h3>555</h3>
            </div>
            <div>
              <h3>Pending</h3>
              <h3>555</h3>
            </div>
            <div>
              <h3>Total</h3>
              <h3>555</h3>
            </div>
          </Container>
        </Card>
        <Card className="shadow mt-5 p-3">
          <Label>Activity:</Label>
          <ListGroup>
            <div>
              <ListGroupItem>
                <Container fluid={true}>
                  <Row className="d-flex justify-content-around">
                    <div>subid</div>
                    <div>payout</div>
                    <div>campaign_name</div>
                    <div>status</div>
                  </Row>
                </Container>
              </ListGroupItem>
            </div>
            {activity.map(({ payout, subid, campaign_name, status }) => (
              <div className="">
                <ListGroupItem
                  color={status === "credited" ? "success" : "danger"}
                >
                  <Container fluid={true}>
                    <Row className="d-flex justify-content-around">
                      <div>{subid}</div>
                      <div>{payout}</div>
                      <div>{campaign_name}</div>
                      <div>{status}</div>
                    </Row>
                  </Container>
                </ListGroupItem>
              </div>
            ))}
          </ListGroup>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  activity: state.activity,
  error: state.error,
  user: state.auth.user
});

export default connect(mapStateToProps, { getActivity, clearErrors })(
  CashoutPage
);
