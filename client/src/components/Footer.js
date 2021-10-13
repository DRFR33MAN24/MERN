import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="bg-dark text-white">
          <div className="footer-copyright text-center py-3">
            <div className="container-fluid">
              &copy; {new Date().getFullYear()} Copyright:{" "}
              <a href="https://www.coinguru.biz"> CoinGuru.biz </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
