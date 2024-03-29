import React, { Component } from "react";
import {
  Button,
  Container,
  Card,
  CardImg,
  CardBody,
  CardText,
  CardSubtitle,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import OfferModal from "./OfferModal";
import siteLogo from "./site_logo2.png";
import ReportOfferModal from "./ReportOfferModal";

export default class Offer extends Component {
  state = {
    openModal: false,
    reportModal: false
  };
  click = () => {
    this.setState({ openModal: !this.state.openModal });
    //window.location.href = `${this.props.link}`;
  };

  reportOffer = () => {
    this.setState({ reportModal: !this.state.reportModal });
  };

  shareFB = offerID => {
    window.FB.ui(
      {
        display: "popup",
        method: "share",

        href: `https://coinguru.biz/app/Offer/${offerID}`
      },
      function(response) {}
    );
  };
  render() {
    return (
      <div>
        {this.state.openModal ? (
          <div>
            <OfferModal
              subid={this.props.subid}
              modal={this.click}
              title={this.props.title}
              description={this.props.description}
              link={this.props.link}
              amount={this.props.amount}
              conversion={this.props.conversion}
              device={this.props.device}
            />
          </div>
        ) : null}

        {this.state.reportModal ? (
          <div>
            <ReportOfferModal
              modal={this.reportOffer}
              title={this.props.title}
            />
          </div>
        ) : null}
        <Card className="m-2 custom-shadow p-3">
          {/* <Container
            fluid={true}
            className="d-flex flex-row justify-content-between "
          >
            <Container fluid={true} className=" d-flex justify-content-start ">
              <img className="mb-5 " src={siteLogo} width="80" height="16" />
            </Container>
            <Container className="d-flex flex-row justify-content-center py-3 ">
              <Row className="pl-2">
                <div className=" btn btn-white ">
                  {" "}
                  <i className="fab fa-facebook fa-pull-right social-btn"></i>{" "}
                </div>
                <div className=" btn btn-white ">
                  <i className="fab fa-twitter fa-pull-right social-btn"></i>
                </div>
              </Row>
            </Container>
          </Container> */}
          <Container
            fluid={true}
            className="d-flex
                        flex-row mb-2
                        "
          >
            <Col xs="6" className="d-flex align-items-start">
              <img src={siteLogo} width="80" height="16" />
            </Col>
            <Col xs="6" className=" d-flex  justify-content-end">
              <a href="#">
                {" "}
                <i
                  className="fab fa-facebook mr-1   social-btn"
                  onClick={this.shareFB}
                ></i>
              </a>
              {/* <a
                href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                class="twitter-share-button"
                data-text={this.props.title}
                data-url={`https://coinguru.biz/app/Offer/${this.props.id}`}
                data-via="coinguru"
                data-show-count="false"
              > */}
              <a
                href={
                  "https://twitter.com/intent/tweet?url=https://coinguru.biz/app/Offer/" +
                  this.props.id +
                  "&text=" +
                  this.props.title +
                  "%0aComplete this offer now and get%0a" +
                  this.props.amount +
                  "%0a"
                }
              >
                <i className="fab fa-twitter  social-btn"></i>
              </a>
              {/* </a> */}
            </Col>
          </Container>
          <CardImg
            top
            width="100%"
            className="offer-img align-self-center"
            src={this.props.img}
            alt="Card image cap"
          />
          <Container className="d-flex justify-content-start align-items-center mt-2 ">
            <a onClick={this.reportOffer}>
              <i class="fas fa-info-circle px-2 py-1   align-self-start text-muted "></i>
            </a>

            <div className="ml-auto">
              {this.props.category === "Mobile" ? (
                <i className="fa fa-download px-2 py-1 align-self-end "></i>
              ) : null}
              {this.props.device === "android" ? (
                <i className="fab fa-android px-2 py-1 align-self-end "></i>
              ) : null}
              {this.props.device === "ios" ? (
                <i className="fab fa-apple px-2 py-1 align-self-end "></i>
              ) : null}
            </div>
          </Container>
          <CardBody>
            <CardTitle tag="h5" className="truncate">
              {this.props.title}
            </CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted truncate">
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
