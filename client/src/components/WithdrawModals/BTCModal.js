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
export default class BTCModal extends Component {
  render() {
    return (
      <div>
        <Modal isOpen={true} className="modal-dialog-centered">
          <ModalHeader>Withdraw BTC</ModalHeader>
          <ModalBody>
            <div>
              <h3>Balance</h3>
              <h3>
                {toDollars(1000)}
                {"   "}
              </h3>
            </div>
            <Label for="value">Withdraw Balance </Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">$</InputGroupAddon>
              <Input
                placeholder="Amount"
                min={0}
                max={100}
                type="number"
                step="1"
              />
              <InputGroupAddon addonType="append">.00</InputGroupAddon>
            </InputGroup>

            <ModalFooter className="d-flex justify-content-start">
              <Button
                block
                className="btn btn-warning custom-btn"
                onClick={this.props.withdraw}
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
