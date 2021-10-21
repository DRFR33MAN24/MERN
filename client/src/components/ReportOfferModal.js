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
  btnClick = () => {
    this.props.modal();
  };
  render() {
    return (
      <div>
        <Modal isOpen={true} className="modal-dialog-centered">
          <ModalHeader>Report non converting offer </ModalHeader>
          <ModalBody>
            <p>
              Click the report button below if think that{" "}
              <div className="text-info">{this.props.title}</div>
              didn't convert even though you completed all the required steps
            </p>

            <p>
              We track and remove all bad offers to ensure great user
              experience.
            </p>

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
