import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './Login'

function App() {
  return <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={Login}></Route>
    </Switch>
  </BrowserRouter>
}

export default App;
