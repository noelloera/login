import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";

const InputField = (props) => {
  return (
    <div className="col-lg-6 mx-auto">
      <Form.Group controlId={"form" + props.name}>
        <Form.Label>
          {props.name.charAt(0).toUpperCase() + props.name.slice(1) + ":"}
        </Form.Label>
        <Form.Control
          class="form-control"
          name={props.name}
          placeholder={"Enter " + props.placeholder}
          type={props.type}
          onChange={(e) => props.onChange(e)}
        ></Form.Control>
      </Form.Group>
    </div>
  );
};

export default InputField;
