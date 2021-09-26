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
import siteLogo from "./site_logo2.png";

export default class Offer extends Component {
  state = {
    openModal: false
  };
  click = () => {
    this.setState({ openModal: !this.state.openModal });
    //window.location.href = `${this.props.link}`;
  };
  render() {
    return (
      <div>
        {this.state.openModal ? (
          <div>
            <OfferModal
              modal={this.click}
              title={this.props.title}
              description={this.props.description}
              link={this.props.link}
              amount={this.props.amount}
              conversion={this.props.conversion}
            />
          </div>
        ) : null}
        <Card className="m-2 custom-card-shadow p-3">
          <Container
            fluid={true}
            className="d-flex flex-row justify-content-center"
          >
            <Container fluid={true} className="mr-4">
              <img
                className="mb-5 ml-2 "
                src={siteLogo}
                width="80"
                height="16"
              />
            </Container>
            <Container className="d-flex flex-row justify-content-center p-3">
              <div className=" btn btn-white d-flex justify-content-center">
                {" "}
                <i class="fab fa-facebook social-btn"></i>{" "}
              </div>
              <div className=" btn btn-white d-flex justify-content-center">
                <i class="fab fa-twitter social-btn"></i>
              </div>
              <div className=" btn btn-white d-flex justify-content-center">
                <i class="fab fa-instagram social-btn "></i>
              </div>
            </Container>
          </Container>
          <CardImg top width="100%" src={this.props.img} alt="Card image cap" />
          <Container className="d-flex justify-content-end align-items-center mt-2">
            <i className="fa fa-download px-2 py-1"></i>
            <i className="fab fa-android px-2 py-1"></i>
            <i className="fab fa-apple px-2 py-1"></i>
          </Container>
          <CardBody>
            <CardTitle tag="h5" className="truncate">
              {this.props.title}
            </CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {this.props.conversion}
            </CardSubtitle>
            {/* <CardText tag="h6">
              <div>{this.props.description}</div>
            </CardText> */}
            <Button
              className="btn btn-lg btn-warning custom-btn "
              block
              onClick={this.click}
            >
              {this.props.amount}
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}
