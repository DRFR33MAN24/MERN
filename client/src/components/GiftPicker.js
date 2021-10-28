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
  ModalFooter,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle
} from "reactstrap";

import BTC from "./gift_img/btc.png";
import BTCModal from "./WithdrawModals/BTCModal";
import { cards } from "./WithdrawModals/CardTypes";
import CardModal from "./WithdrawModals/CardModal";
import { object } from "prop-types";

export default class GiftPicker extends Component {
  constructor(props) {
    super(props);
    // this.cardType = {};
  }
  state = {
    showBTC: false,
    showCard: false,
    cardType: {}
  };

  BTCToggle = () => {
    this.setState({ showBTC: !this.state.showBTC });
  };
  CardToggle = card => {
    this.setState({
      showCard: !this.state.showCard,
      cardType: card
    });
  };

  render() {
    // console.log("ON GiftPicker Render", this.state.cardType);
    return (
      <div>
        {this.state.showBTC ? (
          <BTCModal user={this.props.user} toggle={this.BTCToggle} />
        ) : null}
        {this.state.showCard ? (
          <CardModal
            user={this.props.user}
            toggle={this.CardToggle}
            card={this.state.cardType}
            img={require(`${this.state.cardType.img}`).default}
          />
        ) : null}
        <Card className="custom-shadow  mt-5 mb-5">
          <Container className="d-flex justify-content-center p-3 flex-wrap">
            {/* <a href="" className="m-2"> */}
            <Card className="custom-shadow btn m-2" onClick={this.BTCToggle}>
              <CardImg
                top
                width="100%"
                src={BTC}
                width="150"
                height="96"
                alt="Card image cap"
                className="mt-1 gift-card-img"
              />
              <CardBody>
                <CardTitle>Withdraw BTC</CardTitle>
              </CardBody>
            </Card>
            {cards.length != 0
              ? cards.map(card => (
                  <Card
                    className="custom-shadow btn m-2"
                    onClick={e => {
                      this.CardToggle(card);
                    }}
                  >
                    <CardImg
                      top
                      width="100%"
                      src={require(`${card.img}`).default}
                      width="150"
                      height="96"
                      alt="Card image cap"
                      className="mt-1 gift-card-img"
                    />
                    <CardBody>
                      <CardTitle>{card.name}</CardTitle>
                    </CardBody>
                  </Card>
                ))
              : null}
          </Container>
        </Card>
      </div>
    );
  }
}
