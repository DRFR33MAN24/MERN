import React, { Component } from "react";
import { Container } from "reactstrap";

export default class NoContent extends Component {
  render() {
    return (
      <div>
        <Container
          className="d-flex justify-content-center
         text-muted "
        >
          <h1>{this.props.text}</h1>
        </Container>
      </div>
    );
  }
}
