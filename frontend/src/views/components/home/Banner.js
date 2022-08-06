import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

import Fade from "react-reveal/Fade";
import "./Banner.scss";

const Banner = () => {
  return (
    <>
      <Carousel
        autoPlay={true}
        showStatus={false}
        emulateTouch={true}
        showArrows={true}
        showThumbs={false}
        swipeable={true}
        style={{ zIndex: -1 }}
      >
        <div className="firstSlide addBg2">
          <Fade left>
            <div className="left">
              <h1>
                Apple <br /> iPhone 13 Pro Max
              </h1>
              <p>UNDER FAVORABLE SMARTPHONES</p>
              <p>From</p>
              <h2>
                <sup>$</sup>1700<sup>99</sup>
              </h2>
              <Link to={`/product/62a07e3c4f1ec9a8972e6b02`}>
                <button>Start Buying</button>
              </Link>
            </div>
          </Fade>

          <Fade right>
            <div className="right">
              <img src="https://i.ibb.co/YjqGtbd/aaaa.png" alt="" />
            </div>
          </Fade>
        </div>

        <div className="firstSlide addBg1">
          <div className="left">
            <h1>
              Samsung <br /> Galaxy S6
            </h1>
            <p>UNDER FAVORABLE SMARTPHONES</p>
            <p>From</p>
            <h2>
              <sup>$</sup>300<sup>99</sup>
            </h2>
            <Link to={`/product/62a63170346dea5388e993e4`}>
              <button>Start Buying</button>
            </Link>
          </div>

          <div className="right">
            <img
              src="https://transvelo.github.io/electro-html/2.0/assets/img/416X420/img2.png"
              alt=""
            />
          </div>
        </div>

        <div className="firstSlide addBg2">
          <div className="left">
            <h1>
              Fossil Men's <br /> Chronograph Watch
            </h1>
            <p>UNDER FAVORABLE SMARTWATCHES</p>
            <p>From</p>
            <h2>
              <sup>$</sup>61<sup>99</sup>
            </h2>
            <Link to={`/product/62a629abda7f2392e005bee1`}>
              <button>Start Buying</button>
            </Link>
          </div>

          <div className="right">
            <img
              src="https://transvelo.github.io/electro-html/2.0/assets/img/416X420/img1.png"
              alt=""
            />
          </div>
        </div>

        <div className="firstSlide addBg3">
          <div className="left">
            <h1>
              Bopmen <br /> Headphones
            </h1>
            <p>UNDER FAVORABLE HEADPHONES</p>
            <p>From</p>
            <h2>
              <sup>$</sup>30<sup>99</sup>
            </h2>

            <Link to={`/product/62a62c0ada7f2392e005bf0a`}>
              <button>Start Buying</button>
            </Link>
          </div>

          <div className="right">
            <img src="https://i.ibb.co/mGXWTz2/banner.png" alt="" />
          </div>
        </div>
      </Carousel>
    </>
  );
};

export default Banner;
