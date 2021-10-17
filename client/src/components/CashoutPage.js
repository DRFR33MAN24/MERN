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
import { toDollars, getFormattedDate, Last7Days } from "../util";
import LoadingModal from "./LoadingModal";
import PerformanceChart from "./PerformanceChart";
import GiftPicker from "./GiftPicker";

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

    console.log(
      "CashoutPage -> componentDidMount -> isAuthenticated",
      isAuthenticated
    );
    // if (isAuthenticated) {
    //   const { user } = this.props;
    //   this.props.getActivity(user.id);
    // }

    const user = JSON.parse(localStorage.getItem("user"));

    this.props.getActivity(user.id);
    // this.props.getActivity(13);
  }

  componentWillReceiveProps(prevProps) {}

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
  onWithdraw = (type, amount) => {
    const user = this.props.user;
    this.props.submitPayment(user.id, type, amount);
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
    ////////////////////////////////////////////////////////////////////

    let count = [];
    const labelDays = Last7Days();
    if (postback != undefined) {
      const endDate = new Date();
      const startDate = new Date(endDate - 7 * 24 * 60 * 60 * 1000);

      // console.log(startDate, endDate, labelDays);
      var resultProductData = postback.filter(function(a) {
        var hitDates = a.createdAt;

        hitDates = new Date(hitDates);
        // filter this dates by startDate and endDate

        return hitDates >= startDate && hitDates <= endDate;
      });

      labelDays.map(d => {
        let c = resultProductData.filter(postbackDate => {
          let date = new Date(postbackDate.createdAt);

          date = getFormattedDate(date);

          return date === d;
        }).length;
        count.push(c);
      });
    }
    //////////////////////////////////////////////////////////////////////////////////
    const formEnabled = this.state.formEnabled;
    //console.log(user.id);
    //console.log("dashboard render is Auth", this.props.isAuthenticated);
    const login = <Redirect exact to="/Login" />;
    console.log(isAuthenticated);
    if (isAuthenticated === false) {
      return login;
    }
    if (isAuthenticated === undefined) {
      return <h1>wait...</h1>;
    }

    return (
      <Container className=" mx-auto justify-content-center py-5">
        <LoadingModal open={isLoading} />
        <Card className="custom-shadow mt-5">
          {/* {this.state.msg ? (
            <Alert color="danger">{this.state.msg}</Alert>
          ) : null} */}
          <Container fluid={true} className="  p-4">
            <Row>
              <Col>
                <div>
                  <h3>Balance</h3>
                  <h3>
                    {toDollars(user.balance)}
                    {"   "}
                  </h3>
                </div>
                <div className="mt-4">
                  <div>
                    <h4>Pending</h4>
                    <h4>{toDollars(0)}</h4>
                  </div>
                  <div className="mt-4">
                    <h4>Total</h4>
                    <h4>{toDollars(total)}</h4>
                  </div>
                </div>
                {/* <Button
                  className="block btn-success mt-1"
                  onClick={this.onWithdraw}
                >
                  <span>
                    <i class="fa fa-usd fa-fw mr-1"></i>
                  </span>
                  Withdraw BTC
                </Button> */}
              </Col>

              <Col>
                <div>
                  <div>
                    <h4>Total Clicks</h4>
                    <h4>{user.clicks}</h4>
                  </div>
                  <div className="mt-4">
                    <h4>Converted Offers</h4>
                    <h4>{postback ? postback.length : 0}</h4>
                  </div>
                </div>
              </Col>
              <Col>
                <PerformanceChart labels={labelDays} data={count} />
              </Col>
            </Row>
          </Container>
        </Card>
        <GiftPicker user={user} />
        <Card className="custom-shadow mt-5 p-1">
          <Label>Payments</Label>
          <Container fluid={true}>
            <table class="table table-striped  table-sm">
              <thead className="bg-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Payout</th>
                  <th scope="col">Status</th>
                  <th scope="col">Type</th>
                  <th scope="col">Submit Date</th>
                </tr>
              </thead>
              <tbody>
                {payment
                  ? payment.map(
                      ({ payout, subid, status, submitDate, type }, index) => (
                        <tr
                          className={(() => {
                            switch (status) {
                              case "pending":
                                return "table-warning";

                              case "credited":
                                return "table-success";
                              case "credited":
                                return "table-info";
                              case "rejected":
                                return "table-danger";
                              case "failed":
                                return "table-danger";
                              default:
                                return "table-warning";
                            }
                          })()}
                        >
                          <th scope="row">{index}</th>
                          <td>{payout}</td>
                          <td>{status}</td>
                          <td>{type}</td>
                          <td>{getFormattedDate(new Date(submitDate))}</td>
                        </tr>
                      )
                    )
                  : null}
              </tbody>
            </table>
          </Container>
        </Card>
        <Card className="custom-shadow mt-5 p-1">
          <Label>Activity:</Label>
          <Container fluid={true}>
            <table class="table table-striped  table-sm">
              <thead className="bg-light">
                <tr>
                  <th scope="col">#</th>

                  <th scope="col">Name</th>
                  <th scope="col">Payout</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {postback
                  ? postback.map(
                      (
                        { payout, id, offer_name, status, createdAt },
                        index
                      ) => (
                        <tr
                          className={(() => {
                            switch (status) {
                              case "pending":
                                return "table-warning";

                              case "credited":
                                return "table-success";
                              case "reversed":
                                return "table-danger";
                              default:
                                return "table-warning";
                            }
                          })()}
                        >
                          <th scope="row">{index}</th>

                          <td>{offer_name}</td>
                          <td>{payout}</td>
                          <td>{status}</td>
                          <td>{getFormattedDate(new Date(createdAt))}</td>
                        </tr>
                      )
                    )
                  : null}
              </tbody>
            </table>
          </Container>
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
