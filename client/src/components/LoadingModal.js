import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody
} from "reactstrap";

export default class LoadingModal extends Component {

    render() {
        const isLoading = this.props.isLoading;
        // if (!isLoading) {
        //     return;
        // }
        return (
            <div>
                <Modal isOpen={isLoading} className="modal-dialog-centered">
                    <ModalHeader>Please wait...</ModalHeader>
                    <ModalBody>

                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
