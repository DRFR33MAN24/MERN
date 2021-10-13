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

export default class ReportOfferModal extends Component {
  btnClick = () => {};
  render() {
    return (
      <div>
        <Modal isOpen={true} className="modal-dialog-centered">
          <ModalHeader>Report Bad Offer</ModalHeader>
          <ModalBody>
            {this.props.description === this.props.conversion ? (
              <p>{this.props.description}</p>
            ) : (
              <div>
                <p>{this.props.conversion}</p>
                <p>{this.props.description}</p>
              </div>
            )}

            <ModalFooter className="d-flex justify-content-start">
              <Button
                onClick={this.btnClick}
                className="flex-grow-1 btn-danger custom-btn"
              >
                Report
              </Button>

              <Button
                className="btn-warning custom-btn"
                onClick={this.props.modal}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
