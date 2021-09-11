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
  state = {
    modal: false,
    msg: ""
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Offer Title</ModalHeader>
          <ModalBody>
            <p></p>
            <Button style={{ marginTop: "2rem" }} block>
              GO
            </Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
