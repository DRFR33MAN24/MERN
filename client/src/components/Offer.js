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
  Alert
} from "reactstrap";
export default class Offer extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       title: props.title,
  //       description: porps.description,
  //       link: props.link,
  //       amount: props.amount
  //     };
  //   }
  render() {
    return (
      <div>
        <Card>
          <CardImg
            top
            width="100%"
            src="/assets/318x180.svg"
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle tag="h5">{this.props.title}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {this.props.amount}
            </CardSubtitle>
            <CardText>{this.props.description}</CardText>
            <Button>Join</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}
