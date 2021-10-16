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
  CardTitle
} from "reactstrap";

import razerCard from "../gift_img/razer-gold.png";
import googleCard from "../gift_img/google.png";
import freefireCard from "../gift_img/freefire.png";
import PUBGCard from "../gift_img/pubg-mobile.png";
import BTC from "../gift_img/btc.png";
import BTCModal from "./WithdrawModals/BTCModal";
import GoogleModal from "./WithdrawModals/GoogleModal";
export default class GiftPicker extends Component {
  state = {
    showBTC: false,
    showGoogle: false
  };

  BTCToggle = () => {
    this.setState({ showBTC: !this.state.showBTC });
  };
  GoogleToggle = () => {
    this.setState({ showGoogle: !this.state.showGoogle });
  };
  RazerWithdraw = () => {};
  GoogleWithdraw = () => {};
  FreeFireWithdraw = () => {};
  PUBGWithdraw = () => {};
  render() {
    return (
      <div>
        {this.state.showBTC ? (
          <BTCModal
            user={this.props.user}
            toggle={this.BTCToggle}
            withdraw={() => console.log("clicked")}
          />
        ) : null}
        {this.state.showGoogle ? (
          <GoogleModal
            user={this.props.user}
            toggle={this.GoogleToggle}
            withdraw={() => console.log("clicked")}
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
            <Card className="custom-shadow btn m-2">
              <CardImg
                top
                width="100%"
                src={razerCard}
                width="150"
                height="96"
                alt="Card image cap"
                className="mt-1"
              />
              <CardBody>
                <CardTitle>Razer Gold</CardTitle>
              </CardBody>
            </Card>
            {/* </a> */}
            {/* <a href="" className="m-2"> */}
            <Card className="custom-shadow btn m-2" onClick={this.GoogleToggle}>
              <CardImg
                top
                width="100%"
                src={googleCard}
                width="150"
                height="96"
                alt="Card image cap"
                className="mt-1"
              />
              <CardBody>
                <CardTitle>Google Play</CardTitle>
              </CardBody>
            </Card>
            {/* </a> */}
            {/* <a href="" className="m-2"> */}
            <Card className="custom-shadow btn m-2">
              <CardImg
                top
                width="100%"
                src={freefireCard}
                width="150"
                height="96"
                alt="Card image cap"
                className="mt-1"
              />
              <CardBody>
                <CardTitle>FreeFire</CardTitle>
              </CardBody>
            </Card>
            {/* </a> */}
            {/* <a href="" className="m-2"> */}
            <Card className="custom-shadow btn m-2">
              <CardImg
                top
                width="100%"
                src={PUBGCard}
                width="150"
                height="96"
                alt="Card image cap"
                className="mt-1"
              />
              <CardBody>
                <CardTitle>PUBG</CardTitle>
              </CardBody>
            </Card>
            {/* </a> */}
          </Container>
        </Card>
      </div>
    );
  }
}
