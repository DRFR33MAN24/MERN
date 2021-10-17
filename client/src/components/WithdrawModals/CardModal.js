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
export default class CardModal extends Component {
  state = {
    type: "Card",
    amount: 0
  };
  onSelectVarient = () => {};
  render() {
    const card = this.props.cardType;
    return (
      <div>
        <Modal isOpen={true} className="modal-dialog-centered">
          <ModalHeader>{card.name}</ModalHeader>
          <ModalBody>
            <div>
              <h3>Balance</h3>
              <h3>
                {toDollars(this.props.user.balance)}
                {"   "}
              </h3>
            </div>
            <Label for="value">Choose Card </Label>
            <ListGroup className="custom-list-group">
              {card.varients.length
                ? card.varients.map(v => (
                    <ListGroupItem
                      tag="button"
                      action
                      onClick={this.onSelectVarient(v.type, v.amount)}
                    >
                      {v}
                    </ListGroupItem>
                  ))
                : null}
            </ListGroup>

            <ModalFooter className="d-flex justify-content-start">
              <Button
                block
                className="btn btn-warning custom-btn"
                onClick={this.props.withdraw(
                  this.state.type,
                  this.state.amount
                )}
              >
                Redeem Gift Card
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
