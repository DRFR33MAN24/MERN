import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import { toDollars } from "../../util";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { clearErrors, returnErrors } from "../../actions/errorAction";
import { submitPayment } from "../../actions/activityAction";
export class BTCModal extends Component {
  state = {
    msg: "",
    type: "BTC",
    cents: 0,
    dollars: 0
  };
  static propTypes = {
    submitPayment: PropTypes.func.isRequired
  };

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

  onChange = e => {
    let value = parseInt(e.target.value, 10);
    console.log(value);
    if (value != NaN) {
      this.setState({
        [e.target.name]: value
      });
    } else {
      this.setState({
        [e.target.name]: parseInt(0, 10)
      });
    }
  };
  render() {
    return (
      <div>
        <Modal isOpen={true} className="modal-dialog-centered">
          <ModalHeader>Withdraw BTC</ModalHeader>
          {this.state.msg ? (
            <Alert color="danger" className="mb-1">
              {this.state.msg}
            </Alert>
          ) : null}
          <ModalBody>
            <div>
              <h3>Balance</h3>
              <h3>
                {toDollars(this.props.user.balance)}
                {"   "}
              </h3>
            </div>
            <Label for="value">Withdraw Balance </Label>
            <InputGroup>
              {/* <InputGroupAddon addonType="prepend">
                <i className="fab fa-btc fa-fw "></i>
              </InputGroupAddon> */}

              <Input
                name="dollars"
                placeholder="0"
                min={0}
                type="number"
                step="1"
                onChange={this.onChange}
                onBlur={e => (e.target.value = parseInt(e.target.value))}
              />
              <span>.</span>
              <Input
                name="cents"
                placeholder=".00"
                min={0}
                max={99}
                type="number"
                step="10"
                onChange={this.onChange}
                onBlur={e => (e.target.value = parseInt(e.target.value))}
              />
            </InputGroup>
            <div className="mt-2">
              <h4>Withdrawal Amount</h4>
              <h4>
                {toDollars(
                  parseInt(this.state.cents + this.state.dollars * 100, 10)
                )}
                {"   "}
              </h4>
            </div>
            <Label>To:</Label>
            <Input
              disabled={true}
              name="wallet"
              placeholder={this.props.user.wallet}
            />

            <ModalFooter className="d-flex justify-content-start">
              <Button
                block
                className="btn btn-warning custom-btn"
                onClick={e => {
                  //console.log(this.state.dollars * 100 + this.state.cents);
                  this.props.submitPayment(
                    this.props.user.id,
                    this.state.type,
                    this.state.cents + this.state.dollars * 100
                  );
                }}
              >
                Withdraw
              </Button>
              <Button
                block
                className="btn btn-warning custom-btn"
                onClick={this.props.toggle}
              >
                Close
              </Button>
              <p className="text-dark">
                <span className="font-weight-bold">NOTE:</span> note
              </p>
            </ModalFooter>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error
});

export default connect(mapStateToProps, {
  submitPayment,
  clearErrors,
  returnErrors
})(BTCModal);
