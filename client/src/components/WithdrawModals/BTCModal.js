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
    amount: 0
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
    console.log(e.target.name, e.target.value);
    this.setState({
      amount: e.target.value,
      [e.target.name]: 0
    });
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
                name="inputAmount"
                placeholder="Amount"
                min={0.0}
                type="number"
                step=".10"
                onChange={this.onChange}
              />
            </InputGroup>
            <Label>To</Label>
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
                  this.props.submitPayment(
                    this.props.user.id,
                    this.state.type,
                    this.state.amount
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
