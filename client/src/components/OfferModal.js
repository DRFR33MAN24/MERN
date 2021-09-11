import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";

export default class OfferModal extends Component {
  render() {
    return (
      <div>
        <Modal isOpen={true}>
          <ModalHeader>{this.props.title}</ModalHeader>
          <ModalBody>
            <p>{this.props.description}</p>
            <Button
              onClick={this.props.modal}
              style={{ marginTop: "2rem" }}
              block
            >
              GO
            </Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
