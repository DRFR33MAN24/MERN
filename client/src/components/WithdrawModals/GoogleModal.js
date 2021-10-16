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
  InputGroupAddon,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { toDollars } from "../../util";
export default class GoogleModal extends Component {
  render() {
    return (
      <div>
        <Modal isOpen={true} className="modal-dialog-centered">
          <ModalHeader>Google Play Card</ModalHeader>
          <ModalBody>
            <div>
              <h3>Balance</h3>
              <h3>
                {toDollars(1000)}
                {"   "}
              </h3>
            </div>
            <Label for="value">Choose Card </Label>
            <ListGroup>
              <ListGroupItem tag="button" action>
                Google Play USA 5$
              </ListGroupItem>
              <ListGroupItem tag="button" action>
                Google Play USA 15$
              </ListGroupItem>
              <ListGroupItem tag="button" action>
                Google Play Canada 5$
              </ListGroupItem>
              <ListGroupItem disabled tag="button" action>
                Google Play India 5$
              </ListGroupItem>
            </ListGroup>

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
