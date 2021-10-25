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
  ListGroupItem,
  Container
} from "reactstrap";
import { toDollars } from "../../util";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { clearErrors, returnErrors } from "../../actions/errorAction";
import { submitPayment } from "../../actions/activityAction";

export class CardModal extends Component {
  state = {
    msg: "",
    type: "Card",
    amount: 0,
    index: 0
  };

  static propTypes = {
    submitPayment: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps, prevState) {
    const error = this.props.error;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "SUB_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    // If authenticated close modal
    // If authenicated go to dashboard
  }

  // onSelectVarient = (type, amount) => {
  //   this.setState({ type: type, amount: amount });
  // };
  onSelectType = (type, index) => {
    this.setState({ type: type, index: index });
  };
  onSelectAmount = amount => {
    this.setState({ amount: amount });
  };

  ActivateSelection = e => {
    let parent = e.target.parentNode;
    let classes = e.target.classList;
    let arr = Array.from(parent.children);
    arr.map(c => {
      c.classList.remove("active");
    });

    classes.add("active");
    //console.log(parent, classes, arr, parent.children);
  };

  render() {
    const card = this.props.card;
    //console.log("ON CardModal Render", card);
    return (
      <div>
        <Modal isOpen={true} className="modal-dialog-centered">
          <ModalHeader>{card != undefined ? card.name : ""}</ModalHeader>
          {this.state.msg ? (
            <Alert color="danger" className="mb-1">
              {this.state.msg}
            </Alert>
          ) : null}
          <ModalBody>
            <Container className="d-flex justify-content-center ">
              <img src={this.props.img} width="150" height="96" />
            </Container>
            <div>
              <h3>Balance</h3>
              <h3>
                {toDollars(this.props.user.balance)}
                {"   "}
              </h3>
            </div>
            <Label for="value">Choose Card </Label>
            <ListGroup className="custom-list-group">
              {card != undefined
                ? card.varients.map((v, index) => (
                    <ListGroupItem
                      tag="button"
                      action
                      onClick={e => {
                        console.log(e);

                        this.ActivateSelection(e);
                        this.onSelectType(v.type, index);
                      }}
                    >
                      {v.type}
                    </ListGroupItem>
                  ))
                : null}
            </ListGroup>
            <Label for="value">Choose Amount </Label>
            <ListGroup className="custom-list-group">
              {card != undefined
                ? card.varients[this.state.index].amounts.map(a => (
                    <ListGroupItem
                      tag="button"
                      action
                      onClick={e => {
                        this.ActivateSelection(e);
                        this.onSelectAmount(a);
                      }}
                    >
                      {toDollars(a)}
                    </ListGroupItem>
                  ))
                : null}
            </ListGroup>
            {this.state.type != "Card" && this.state.amount != 0 ? (
              <Label for="value" className="mt-2">
                You Chossed: {this.state.type} {toDollars(this.state.amount)}{" "}
              </Label>
            ) : null}

            <ModalFooter className="d-flex justify-content-start">
              <Button
                block
                className="btn btn-warning custom-btn"
                onClick={e => {
                  if (this.state.type != "Card" && this.state.amount != 0) {
                    this.props.submitPayment(
                      this.props.user.id,
                      this.state.type,
                      this.state.amount
                    );
                  }
                }}
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
                <span className="font-weight-bold">NOTE:</span>
                you will receive an email when your gift arrives.
              </p>
            </ModalFooter>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error
});

export default connect(mapStateToProps, {
  submitPayment,
  clearErrors,
  returnErrors
})(CardModal);
