import React, { Component } from "react";
import { Navbar } from 'react-bootstrap'

class NaviBar extends React.Component {
  render() {
    return (
      <div>

        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://static.thenounproject.com/png/3147006-200.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
             &nbsp; Stream rules
          </Navbar.Brand>
          <Navbar.Brand href="#analytics">
            <img
              alt=""
              src="https://cdn1.vectorstock.com/i/1000x1000/76/15/analytics-icon-on-transparent-analytics-sign-vector-20707615.jpg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
             &nbsp; Visualization & Analytics
          </Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}

export default NaviBar;