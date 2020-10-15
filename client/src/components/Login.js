import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import InputField from "./InputField";
import passwordValidator from "password-validator";
import emailValidator from "email-validator";
import { getRefresh } from "../helpers/jwt";
const password = new passwordValidator();
password.is().min(6).is().max(18).has().digits(1).has().not().spaces();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: "login",
      username: "",
      password: "",
      email: "",
      validPass: false,
      validEmail: false,
      //Add the lists of the user to the state
    };
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
    //refs
    this.validEmail = React.createRef();
    this.validPass = React.createRef();
  }

  componentDidMount() {
    const refresh = getRefresh();
    if (refresh) {
      this.props.history.push("/main");
    }
  }

  optionChange() {
    this.state.option === "login"
      ? this.setState({ option: "signup" })
      : this.setState({ option: "login" });
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submit(e) {
    e.preventDefault();
    //Will either post to login or signup and check using validators
    if (this.state.option === "login") {
      axios
        .post("/login", {
          email: this.state.email,
          password: this.state.password,
        })
        .then((res) => {
          //depending on status and response create logic
          localStorage.setItem("access", res.data.access_token);
          localStorage.setItem("refresh", res.data.refresh_token);
          this.props.history.push("/main");
        })
        .catch((err) => {
          console.log(err);
          alert("Incorrect Email/Password");
          this.props.history.go(0);
        });
    }
    if (this.state.option === "signup") {
      axios
        .post("/signup", {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        })
        .then((res) => {
          //depending on status and response create logic
          localStorage.setItem("access", res.data.access_token);
          localStorage.setItem("refresh", res.data.refresh_token);
          this.props.history.push("/main");
        }).catch(err => {
          alert("All values must be correctly filled")
          this.props.history.go(0)
        })
    }
  }

  render() {
    return (
      <form onSubmit={(e) => this.submit(e)}>
        <h1>welcome</h1>
        {this.state.option === "signup" ? (
          <InputField
            name="username"
            placeholder="username"
            onChange={(e) => this.change(e)}
          />
        ) : null}

        <InputField
          name="email"
          placeholder="email"
          onChange={(e) => this.change(e)}
        />

        <InputField
          name="password"
          placeholder="password"
          type="password"
          onChange={(e) => {
            this.change(e);
          }}
        />
        <button>{this.state.option}</button>
        <h3
          onClick={(e) => {
            this.optionChange();
          }}
        >
          {this.state.option}
        </h3>
      </form>
    );
  }
}

export default withRouter(Login);
