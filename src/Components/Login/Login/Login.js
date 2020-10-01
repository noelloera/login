import React from "react";
//InputField reusable component
import InputField from "../InputField/InputField";

//Password validator
import passwordValidator from "password-validator";
//Email validator
import emailValidator from "email-validator";
//email.validate() checks if email requirements are met
const password = new passwordValidator();
//requirements for password
password.is().min(6).is().max(18).has().digits(1).has().not().spaces();
//password.validate() will check if requirements met

const dev = "http://localhost:5000";

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
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNmI5NGU0Y2ZjNjY1MmYxMjVkMWVlYiIsImlhdCI6MTYwMTU3ODc2MSwiZXhwIjoxNjExNTc4NzYxfQ.8AXTahfdAmXK0hYeI5fmexZo_fUJ75tfKx9lc5T4PpQ",
      refreshToken: null,
      //Add the lists of the user to the state
      lists: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //refs
    this.validEmail = React.createRef();
    this.validPass = React.createRef();
    //GET OPTIONS
    this.getOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.accessToken,
      },
    };
    //POST OPTIONS
    this.postOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.accessToken,
      },
    };
  }
  async componentDidMount() {
    if (this.state.accessToken) {
      //Will attempt the access token first, if it recieves a bad status code it will try
      try {
        const response = await (
          await fetch(`${dev}/lists/`, this.getOptions)
        ).json();
        this.setState({ lists: response.lists });
      } catch (error) {
        throw error;
      }
      if (this.state.refreshToken) {
        //If the access token is bad then a call using a refresh token will excecute, if does not work or invalid
      }
      //If all fail then login will be prompted
    }
    if (this.state.refreshToken) {
    } else {
      this.getData();
      // set Interval
      //this.interval = setInterval(this.getData, 1000);
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async getData() {
    try {
      const response = await (
        await fetch(`${dev}/lists/`, this.getOptions)
      ).json();
      this.setState({ lists: response.lists });
    } catch (error) {
      throw error;
    }
  }

  handleChange(e) {
    e.preventDefault();
    const target = e.target;
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

  async handleSubmit(e) {
    e.preventDefault();
    const stateData = this.state;
    if (stateData.option === "login") {
      if (
        stateData.validEmail &&
        stateData.validPass &&
        stateData.email &&
        stateData.password
      ) {
        //This is where the fetch API ocurrs
        try {
          const options = {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.password,
            }),
          };
          const response = await (await fetch(`${dev}/login/`, options)).json();
          console.log(response.access_token);
          this.setState({
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
          });
        } catch (error) {
          throw error;
        }
      } else {
        alert("invalid email / password");
        window.location = "/";
      }
    }
    if (stateData.option === "signup") {
      if (stateData.validEmail && stateData.validPass && stateData.username) {
        try {
          //fetch for the post signup
          console.log("signing up:");
          console.log(stateData);
        } catch (e) {
          alert(e);
          console.log(e);
          window.location = "/";
        }
      } else {
        alert("all inputs must be filled correctly");
        window.location = "/";
      }
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>welcome</h1>
          {this.state.option === "signup" ? (
            <InputField
              name="username"
              placeholder="username"
              onChange={this.handleChange}
            />
          ) : null}

          <InputField
            name="email"
            placeholder="email"
            onChange={this.handleChange}
          />
          {this.state.validEmail || this.state.option === "login" ? null : (
            <p>enter valid email</p>
          )}

          <InputField
            name="password"
            placeholder="password"
            type="password"
            onChange={this.handleChange}
          />
          {this.state.validPass || this.state.option === "login" ? null : (
            <p>enter valid password</p>
          )}

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
        {this.state.lists
          ? this.state.lists.map((obj, i) => {
              return (
                <div key={i}>
                  <h2>{obj.name}</h2>
                  {obj.items
                    ? obj.items.map((item) => {
                        return <p>{item.value}</p>;
                      })
                    : null}
                </div>
              );
            })
          : null}
      </div>
    );
  }
}
