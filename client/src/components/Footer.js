import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="bg-dark text-white">
          <div class="row justify-content-center mb-0 pt-5 pb-0 row-2 px-3">
            <div class="col-12">
              <div class="row row-2">
                <div class="col-sm-4 text-md-center">
                  <h4>
                    <b> CoinGuru</b>
                  </h4>
                </div>
                <div class="col-sm-4 my-sm-0 mt-5">
                  <ul class="list-unstyled">
                    <li class="mt-0">FAQ</li>
                    <li>Help Center</li>
                    <li>Privacy Policy</li>
                  </ul>
                </div>
                <div class="col-sm-4 my-sm-0 mt-5">
                  <ul class="list-unstyled">
                    <li class="mt-0">Social Media</li>
                    <li>
                      <i className="fab fa-facebook fa-2x mr-1"></i>
                      Facebook
                    </li>

                    <li>
                      <i className="fab fa-twitter fa-2x mr-1"></i>
                      Twitter
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-center mt-0 pt-0 row-1 mb-0 px-sm-3 px-2">
            <div class="col-12">
              <div class="row my-4 row-1 no-gutters">
                <div class="col-12 col-auto text-center">
                  <small>&#9400; 2021, All Rights Reserved</small>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
