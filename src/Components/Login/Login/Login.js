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
      accessToken: null,
      refreshToken: null,
      //Add the lists of the user to the state
      lists: [],
      currentListId: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //refs
    this.validEmail = React.createRef();
    this.validPass = React.createRef();
    //GET OPTIONS
    /*this.getOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.accessToken,
      },
    };*/
    //POST OPTIONS
    this.postOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.accessToken,
      },
    };

    this.getLists = this.getLists.bind(this)
  }
  async getLists() {
    if (this.state.accessToken) {
      try {
        const getOptions = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.state.accessToken,
          },
        };
        console.log(getOptions.headers.Authorization)
        const raw = await fetch(`${dev}/lists/`, getOptions);
        const response = await raw.json();
        if (raw.status === 200|| raw.status === 304 ) {
          if (!response.lists === this.state.lists) {
            console.log(response.lists);
            this.setState({
              mounted: true,
              lists: response.lists,
              currentListId: this.state.currentListId,
            })
          }
          if (!this.state.currentListId) {
            this.setState({ currentListId: response.lists[0]._id })
            console.log(this.state.currentListId)
          }
        }
        if (raw.status === 500) {
          console.log(response.message)
        }
      } catch (error) {
        console.log(error);
        //Refreshes every 3 seconds
        setTimeout(function () { window.location = "/"; }, 30000);
      }
    }
  }


  async componentDidMount() {
    this.getLists()
    this.interval = setInterval(this.getLists, 10000)
    setTimeout(() => {
      window.location = "/"
    }, 50000)
  }



  componentWillUnmount() {
    clearInterval(this.interval)
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
          this.setState({
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
          });
          console.log(this.state.accessToken + " " + this.state.refreshToken)
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
