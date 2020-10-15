import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Data from "./Data";
import Authenticated from "./Authenticated";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login}></Route>
        <Authenticated>
          <Route path="/main" component={Data}></Route>
        </Authenticated>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
