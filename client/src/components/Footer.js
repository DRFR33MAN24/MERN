import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <div class="container-fluid bg-dark text-white">
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
                    <li class="mt-0">
                      <a href="https://support.coinguru.biz/hesk/faq.html">
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a href="https://support.coinguru.biz/hesk">
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a href="https://coinguru.biz/privacy_policy.html">
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="col-sm-4 my-sm-0 mt-5">
                  <ul class="list-unstyled">
                    <li class="mt-0">Social Media</li>
                    <li>
                      <a href="https://www.facebook.com/CoinGuru-101259485672243">
                        <i class="fab fa-facebook fa-2x mr-1"></i>
                        Facebook
                      </a>
                    </li>

                    <li>
                      <a href="https://twitter.com/CoinGuru_biz">
                        <i class="fab fa-twitter fa-2x mr-1"></i>
                        Twitter
                      </a>
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
                  <small>CoinGuru &#9400; 2021, All Rights Reserved</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
