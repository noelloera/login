import React from "react";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: "login",
      username: "",
      password: "",
      email: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {

  }
  handleSubmit(e) {

  }

  render() {
    return (
      <div>
        <h1>welcome</h1>
        <Email />
        <Password />
        <h3 onClick={e=>
            {this.state.option ==="login"? 
            this.setState({option: "signup"}):
            this.setState({option: "login"})}}>
                {this.state.option}</h3>
      </div>
    );
  }
}
