import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './index.css';
import App from './App/App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Switch>
            <Route exact path={"/:id"} component={App} />
            <Route exact path={"/"} component={App} />
        </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
