import React from "react";
import Email from "../Email/Email"
import Username from "../Username/Username"
import Password from "../Password/Password"
import Button from "../Button/Button"
//Password validator
import passwordValidator from "password-validator"
//Email validator
import emailValidator from "email-validator"
//email.validate() checks if email requirements are met
const password = new passwordValidator();
//requirements for password
password
.is().min(6)
.is().max(18)
.has().digits(1)
.has().not().spaces()
//password.validate() will check if requirements met

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: "login",
      username: "",
      validUser: true,
      password: "",
      validPass: true,
      email: "",
      validEmail: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) { 
    //if(email){validEmail = false / if(emailValidator.validate(email.value)){validEmail=false}}
    //if(password & option==signup)
    //if(password)
    ///if(signup){//validPassword = false / if(password.validate)
    //}else{state.password=value}
    //if(username)
  }
  handleSubmit(e) { }

  render() {
    return (
      <div>
        <h1>welcome</h1>
        {this.state.option==="signup"?<Email onChange={this.handleChange} />: null}
        {this.state.validEmail? null: <p>enter valid email</p>}
        <Username onChange={this.handleChange} />
        {this.state.validUser? null: <p>enter valid username</p>}
        <Password onChange={this.handleChange} />
        {this.state.validPass? null: <p>enter valid email</p>}
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
