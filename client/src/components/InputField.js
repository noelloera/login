import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";

const InputField = (props) => {
  return (
    <div>
      <Form.Group>
        <Form.Label>{props.name}</Form.Label>
        <Form.Input
          name={props.name}
          placeholder={props.placeholder}
          type={props.type}
          onChange={(e) => props.onChange(e)}
        ></Form.Input>
      </Form.Group>
    </div>
  );
};

export default InputField;
