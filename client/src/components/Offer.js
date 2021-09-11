import React, { Component } from "react";
import {
  Button,
  Container,
  Card,
  CardImg,
  CardBody,
  CardText,
  CardSubtitle,
  CardTitle
} from "reactstrap";
import OfferModal from "./OfferModal";

export default class Offer extends Component {
  state = {
    openModal: false
  };
  click = () => {
    this.setState({ openModal: true });
    //window.location.href = `${this.props.link}`;
  };
  render() {
    return (
      <div>
        {this.openModal ? (
          <div>
            <OfferModal
              modal={true}
              title={this.props.title}
              description={this.props.description}
              link={this.props.link}
              amount={this.props.amount}
              conversion={this.props.conversion}
            />
          </div>
        ) : null}
        <Card>
          <CardImg top width="100%" src={this.props.img} alt="Card image cap" />
          <CardBody>
            <CardTitle tag="h5">{this.props.title}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {this.props.conversion}
            </CardSubtitle>
            {/* <CardText tag="h6">
              <div>{this.props.description}</div>
            </CardText> */}
            <Button className="btn btn-lg w-100" onClick={this.click}>
              {this.props.amount}
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}
