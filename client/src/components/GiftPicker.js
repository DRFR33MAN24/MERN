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

import razerImg from "../gift_img/razer-gold.png";
import googleImg from "../gift_img/google.png";
import freefireImg from "../gift_img/freefire.png";
import PUBGImg from "../gift_img/pubg-mobile.png";
import BTC from "../gift_img/btc.png";
import BTCModal from "./WithdrawModals/BTCModal";
import { googleCard, cards } from "./WithdrawModals/CardTypes";
import CardModal from "./WithdrawModals/CardModal";
import { mapFinderOptions } from "sequelize/types/lib/utils";
export default class GiftPicker extends Component {
  state = {
    showBTC: false,
    showCard: false,
    cardType: {}
  };

  BTCToggle = () => {
    this.setState({ showBTC: !this.state.showBTC });
  };
  CardToggle = type => {
    this.setState({ showCard: !this.state.showCard, cardType: type });
  };

  render() {
    return (
      <div>
        {this.state.showBTC ? (
          <BTCModal
            user={this.props.user}
            toggle={this.BTCToggle}
            withdraw={this.props.withdraw}
          />
        ) : null}
        {this.state.showCard ? (
          <CardModal
            user={this.props.user}
            toggle={this.GoogleToggle}
            withdraw={this.props.withdraw}
          />
        ) : null}
        <Card className="custom-shadow  mt-5 mb-5">
          <Container className="d-flex justify-content-start p-3">
            {/* <a href="" className="m-2"> */}
            <Card className="custom-shadow btn m-2" onClick={this.BTCToggle}>
              <CardImg
                top
                width="100%"
                src={BTC}
                width="150"
                height="96"
                alt="Card image cap"
                className="mt-1"
              />
              <CardBody>
                <CardTitle>Withdraw BTC</CardTitle>
              </CardBody>
            </Card>
            {cards.length != 0
              ? cards.map(({ name, img, varients }) => (
                  <Card
                    className="custom-shadow btn m-2"
                    onClick={this.CardToggle(name)}
                  >
                    <CardImg
                      top
                      width="100%"
                      src={img}
                      width="150"
                      height="96"
                      alt="Card image cap"
                      className="mt-1"
                    />
                    <CardBody>
                      <CardTitle>{name}</CardTitle>
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
