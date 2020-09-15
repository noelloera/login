import React from "react";
import Email from "../Email/Email";
import Username from "../Username/Username";
import Password from "../Password/Password";
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
    this.email = React.createRef();
    this.password = React.createRef();
    this.username = React.createRef();
  }

  handleChange(e) {
    //On event should check which of the refs are being triggered
    console.log(this.email.current.value)
    console.log(this.password.current.value)
    //console.log(this.username.current.value)

    /*if (this.email.current.value!==null) {
      console.log("email is triggered");
    }
    if (this.password.current.value!==null) {
      console.log("password is triggered");
    }
    if (this.username.current.value!==null) {
      console.log("username is triggered");
    }*/
    /*if(email){
      validEmail = false 
      if(emailValidator.validate(e.target.value)){validEmail=false}}*/
    //if(password & option==signup)
    //if(password)
    ///if(signup){//validPassword = false / if(password.validate)
    //}else{state.password=value}
    //if(username)
  }
  handleSubmit(e) {}

  render() {
    return (
      <div>
        <h1>welcome</h1>
        {this.state.option === "signup" ? (
          <Username ref={this.username} onChange={this.handleChange} />
        ) : null}
        {this.state.validEmail ? null : <p>enter valid email</p>}
        <Email ref={this.email} onChange={this.handleChange} />
        <Password ref={this.password} onChange={this.handleChange} />
        {this.state.validPass ? null : <p>enter valid email</p>}
        <Button option={this.state.option} onSubmit={this.handleSubmit} />
        <h3
          onClick={(e) => {
            this.state.option === "login"
              ? this.setState({ option: "signup" })
              : this.setState({ option: "login" });
          }}
        >
          {this.state.option}
        </h3>
      </div>
    );
  }
}
