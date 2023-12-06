import React from "react";
import { Link } from "react-router-dom";

const Biddingoffer = () => {
  return (
    <div>
      <div className="section145">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="main-title-tt">
                <div className="main-title-left">
                  <span>Offers</span>
                  <h2>Bidding Offers</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <Link href="#" className="best-offer-item">
                <img src="img/" alt="/" />
              </Link>
            </div>
            <div className="col-lg-4 col-md-6">
              <Link href="#" className="best-offer-item">
                <img src="img/" alt="/" />
              </Link>
            </div>
            <div className="col-lg-4 col-md-6">
              <Link href="/" className="best-offer-item offr-none">
                <img src="img/" alt="/" />
                <div className="cmtk_dt">
                  <div
                    className="product_countdown-timer offer-counter-text"
                    data-countdown="2021/01/06"
                  >
                    165 days 01:28:33
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-12">
              <Link href="/" className="code-offer-item">
                <img src="img/" alt="/" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biddingoffer;
