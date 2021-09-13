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
  Alert
} from "reactstrap";

export default class OfferModal extends Component {
  btnClick = () => {
    window.location.href = `${this.props.link}`;
    //this.props.modal();
  };
  render() {
    return (
      <div>
        <Modal isOpen={true} className="modal-dialog-centered">
          <ModalHeader>{this.props.title}</ModalHeader>
          <ModalBody>
            <p>{this.props.description}</p>

            <ModalFooter className="d-flex justify-content-start">
              <Button onClick={this.btnClick} className="flex-grow-1">
                GO
              </Button>

              <Button onClick={this.props.modal}>Close</Button>
            </ModalFooter>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}