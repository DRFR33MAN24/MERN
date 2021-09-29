import React, { Component } from "react";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Container,
    Card,
    Alert,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";

export default class NotFound extends Component {
    render() {


        return (
            <div>
                <Container className="mt-5 pt-5 d-flex justify-content-center">
                    <Card className='shadow p-3 bg-light'>
                        <h1>404 Not Found</h1>
                    </Card>
                </Container>
            </div>
        );
    }
}
