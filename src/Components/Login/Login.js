import React from "react";

import Button from "../Button/Button";
//Password validator
import passwordValidator from "password-validator";
//Email validator
import emailValidator from "email-validator";
//email.validate() checks if email requirements are met
const password = new passwordValidator();
//requirements for password
password.is().min(6).is().max(18).has().digits(1).has().not().spaces();
//password.validate() will check if requirements met

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: "login",
      username: "",
      password: "",
      validPass: true,
      email: "",
      validEmail: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //refs
    this.validEmail = React.createRef();
    this.validPass = React.createRef();
  }

  handleChange(e) {
    e.preventDefault();
    const target = e.target;
    //On event should check which of the refs are being triggered
    if (target.name === "email") {
      this.setState({ validEmail: false });
      if (emailValidator.validate(target.value)) {
        this.setState({
          email: target.value,
          validEmail: true,
        });
      }
    }
    if (target.name === "password") {
      this.setState({ validPass: false });
      if (password.validate(target.value)) {
        this.setState({
          password: target.value,
          validPass: true,
        });
      }
    }
    if (target.name === "username") {
      this.setState({ username: target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const stateData = this.state;
    if (stateData.option === "login") {
      if (stateData.validEmail && stateData.validPass) {
        //write the fetch post login
        console.log("logging in:")
        console.log(stateData)

      } else {
        alert("invalid username or password");
        window.location = "/";
      }
    }
    if (stateData.option === "signup") {
      if (stateData.validEmail &&stateData.validPass &&stateData.username) {
        try{
          //fetch for the post signup
          console.log("signing up:")
          console.log(stateData)

        }catch(e){
          alert(e)
          console.log(e)
          window.location = "/";
        }
      }
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>welcome</h1>
          {this.state.option === "signup" ? (
            <input
              name="username"
              placeholder="username"
              onChange={this.handleChange}
            />
          ) : null}
          <br></br>

          <input
            name="email"
            placeholder="email"
            onChange={this.handleChange}
          />
          <br></br>
          {this.state.validEmail ? null : <p>enter valid email</p>}
          <br></br>

          <input
            name="password"
            placeholder="password"
            type="password"
            onChange={this.handleChange}
          />
          <br></br>

          {this.state.validPass ? null : <p>enter valid password</p>}
          <br></br>

          <button onSubmit={this.handleSubmit}>
            {this.state.option === "login" ? "LOG IN" : "SIGN UP"}
          </button>
          <h3
            onClick={(e) => {
              this.state.option === "login"
                ? this.setState({ option: "signup" })
                : this.setState({ option: "login" });
            }}
          >
            {this.state.option}
          </h3>
        </form>
      </div>
    );
  }
}
