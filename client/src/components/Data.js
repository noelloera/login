import React from "react";
import axios from "axios";
import {
  getAccess,
  getRefresh,
  removeAccess,
  removeRefresh,
} from "../helpers/jwt";
import { withRouter } from "react-router-dom";

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      data: [],
    };
    this.newAccess = this.newAccess.bind(this);
  }

  newAccess(refresh) {
    if (refresh) {
      axios
        .post("/token", { token: refresh })
        .then((res) => {
          console.log(res.data.access_token);
          localStorage.setItem("access", res.data.access_token);
          this.props.history.go(0);
        })
        .catch((err) => {
          console.log(err);
          removeRefresh();
          this.props.history.go(0);
        });
    }
  }

  componentDidMount() {
    const access = getAccess();
    const refresh = getRefresh();
    axios
      .get("/me", {
        headers: { Authorization: `Bearer ${access}` },
      })
      .then((res) => {
        //Can set state to response data
        this.setState({
          username: res.data.username,
        });
      })
      .catch((err) => {
        this.newAccess(refresh);
      });
  }

  render() {
    return <h1>{this.state.username}</h1>;
  }
}

export default withRouter(Data);
