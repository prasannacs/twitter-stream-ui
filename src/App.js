import React, { Component } from "react";
import Rules from "./components/rules";
import NaviBar from "./components/navibar";
import Analytics from "./components/analytics";
import { Route, NavLink, HashRouter } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <HashRouter>
      <div>
        <NaviBar />
      </div>
      <div className="content">
            <Route path="/home" component={Rules}/>
            <Route path="/analytics" component={Analytics}/>
          </div>
      </HashRouter>
    );
  }
}

export default App;
