import React from "react";
import { withRouter } from "react-router-dom";
import {
  getAccess,
  getRefresh,
  removeAccess,
  removeRefresh,
} from "../helpers/jwt.js";

class Authenticated extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    };
  }
  componentDidMount() {
    const access = getAccess();
    const refresh = getRefresh();
    if (!refresh) {
      removeAccess();
      this.props.history.push("/login");
    }
    if (access || refresh) {
      this.setState({ authenticated: true });
      this.props.history.push("/main");
    }
  }

  render() {
    if (this.state.authenticated) {
      return <div>{this.props.children}</div>;
    }
    return <div>no content</div>;
  }
}

export default withRouter(Authenticated);
