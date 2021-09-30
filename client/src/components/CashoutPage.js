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
  Row,
  Col
} from "reactstrap";
import { Redirect, Link } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateDetails } from "../actions/authAction";
import { clearErrors, returnErrors } from "../actions/errorAction";
import { getActivity, submitPayment } from "../actions/activityAction";
import { freemem } from "os";
import { toDollars, getFormattedDate } from "../util";
import LoadingModal from "./LoadingModal";
import PerformanceChart from "./PerformanceChart";

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
    loading: PropTypes.bool,
    error: PropTypes.object.isRequired,
    activity: PropTypes.object,
    getActivity: PropTypes.func.isRequired,
    submitPayment: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    returnErrors: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  componentDidMount(prevProps) {
    const { error, isAuthenticated } = this.props;
    const { user } = this.props;
    console.log(user);
    if (user) {
      this.props.getActivity(user.id);
    }
    // this.props.getActivity(13);
  }
  componentDidUpdate(prevProps, prevState) {
    const error = this.props.error;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "SUB_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    // If authenticated close modal
    // If authenicated go to dashboard
  }
  onWithdraw = () => {
    const user = this.props.user;
    this.props.submitPayment(user.id);
    this.props.returnErrors();
    //this.props.getActivity(user.id);
  };
  render() {
    const isAuthenticated = this.props.isAuthenticated;
    const isLoading = this.props.loading;
    const user = this.props.user;
    console.log(this.props.activity);
    const { postback, payment, total } = this.props.activity;
    console.log(postback, payment, total);
    const formEnabled = this.state.formEnabled;
    //console.log(user.id);
    //console.log("dashboard render is Auth", this.props.isAuthenticated);
    const login = <Redirect exact to="/Login" />;
    if (!isAuthenticated) {
      return login;
    }

    return (
      <Container className=" mx-auto justify-content-center py-5">
        <LoadingModal open={isLoading} />
        <Card className="shadow mt-5">
          {this.state.msg ? (
            <Alert color="danger">{this.state.msg}</Alert>
          ) : null}
          <Container fluid={true} className="  p-4">
            <Row>
              <Col>
                <div>
                  <h3>Balance</h3>
                  <h3>
                    {toDollars(user.balance)}
                    {"   "}
                  </h3>
                  <Button
                    className="block btn-success mt-1"
                    onClick={this.onWithdraw}
                  >
                    Withdraw
                  </Button>
                </div>
                <div class="mt-4">
                  <div>
                    <h4>Pending</h4>
                    <h4>{toDollars(0)}</h4>
                  </div>
                  <div>
                    <h4>Total</h4>
                    <h4>{toDollars(total)}</h4>
                  </div>
                </div>
              </Col>
              <Col>
                <PerformanceChart />
              </Col>
            </Row>
          </Container>
        </Card>
        <Card className="shadow mt-5 p-3">
          <Label>Payments</Label>
          <ListGroup>
            <div>
              <ListGroupItem>
                <Container fluid={true}>
                  <Row className="d-flex justify-content-around">
                    <div>Payout</div>
                    <div>Status</div>
                    <div>Submit Date</div>
                  </Row>
                </Container>
              </ListGroupItem>
            </div>
            {payment
              ? payment.map(({ payout, subid, status, submitDate }) => (
                  <div className="">
                    <ListGroupItem
                      color={(() => {
                        switch (status) {
                          case "pending":
                            return "warning";

                          case "paid":
                            return "success";
                          case "rejected":
                            return "danger";
                          default:
                            return "warning";
                        }
                      })()}
                    >
                      <Container fluid={true}>
                        <Row className="d-flex justify-content-around">
                          <div>{payout}</div>
                          <div>{status}</div>
                          <div>{getFormattedDate(new Date(submitDate))}</div>
                        </Row>
                      </Container>
                    </ListGroupItem>
                  </div>
                ))
              : null}
          </ListGroup>
        </Card>
        <Card className="shadow mt-5 p-3">
          <Label>Activity:</Label>
          <ListGroup>
            <div>
              <ListGroupItem>
                <Container fluid={true}>
                  <Row className="d-flex justify-content-around">
                    <div>Offer Id</div>
                    <div>Name</div>
                    <div>Payout</div>
                    <div>Status</div>
                    <div>Date</div>
                  </Row>
                </Container>
              </ListGroupItem>
            </div>
            {postback
              ? postback.map(
                  ({ payout, id, offer_name, status, createdAt }) => (
                    <div className="">
                      <ListGroupItem
                        color={status === "credited" ? "success" : "danger"}
                      >
                        <Container fluid={true}>
                          <Row className="d-flex justify-content-around">
                            <div>{id}</div>
                            <div>{offer_name}</div>
                            <div>{payout}</div>
                            <div>{status}</div>
                            <div>{createdAt}</div>
                          </Row>
                        </Container>
                      </ListGroupItem>
                    </div>
                  )
                )
              : null}
          </ListGroup>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.activity.loading,
  updateRequired: state.activity.updateRequired,
  activity: state.activity.activity,
  error: state.error,
  user: state.auth.user
});

export default connect(mapStateToProps, {
  getActivity,
  submitPayment,
  clearErrors,
  returnErrors
})(CashoutPage);
