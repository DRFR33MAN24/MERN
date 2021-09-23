import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Spinner,
  Container
} from "reactstrap";

export default class LoadingModal extends Component {
  render() {
    console.log("LoadingModal render");
    return (
      <div>
        <Modal
          isOpen={this.props.open}
          className="modal-dialog-centered loading-modal"
        >
          <ModalBody className="bg-white">
            <Container className="d-flex justify-content-center">
              <Spinner color="primary" />
            </Container>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
