import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Category from "../category/Category";
const Bannerslider = () => {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
       <Category /> 
      <Slider {...settings}>
        <div className="owl-item">
          <img src="img/banners/offer-8.jpg" alt="supermarket" />
        </div>
        <div className="owl-item">
          <img src="img/banners/offer-5.jpg" alt="supermarket" />
        </div>
        <div className="owl-item">
          <img src="img/banners/offer-6.jpg" alt="supermarket" />
        </div>
      </Slider>
    </div>
  );
};

export default Bannerslider;
