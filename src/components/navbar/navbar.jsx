import React, { Component } from "react";
import "./navbar.css";
import { ReactComponent as Logo } from "../../assets/logo.svg";

class Navbar extends Component {
  render() {
    return (
      <nav className="mb-1 navbar navbar-expand-lg navbar-dark orange lighten-1">
        <div className="container">
          <a className="navbar-brand" href="/dashboard">
            <Logo />
            <span className="navTitle">MTB ASSIST</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto nav-flex-icons" />
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
