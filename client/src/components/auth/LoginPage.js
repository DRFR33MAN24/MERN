import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Card
} from "reactstrap";
export default class LoginPage extends Component {
  render() {
    return (
      <Container className=" mx-auto justify-content-center">
        <Card className="p-2">
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="with a placeholder"
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="password placeholder"
              />
            </FormGroup>

            <Button>Submit</Button>
          </Form>
        </Card>
      </Container>
    );
  }
}
