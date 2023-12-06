import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../../features/productSlice";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Loading from "../Loading";
import CarPreview from "../CarPreview.js";

const Topstample = () => {
  const [isloaded, setIsloaded] = useState(false);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 8);

  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
    setIsloaded(true);
  }, [dispatch]);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <section className="product-items-slider section-padding">
        <div className="container" id="header-category-bk">
          <div className="section-header">
            <span>For You</span>
            <h5 className="heading-design-h5">
              {/* <div>
            <Link to="/products/allcars" style={{textAlign: 'right', display: 'block', textDecoration: 'none'}}>
              See more {">>"}
            </Link>
          </div> */}
              <Link
                to="/makes/all"
                style={{
                  textAlign: "right",
                  display: "block",
                  textDecoration: "none",
                }}
              >
                See more {">>"}
              </Link>
            </h5>
          </div>
          {isloaded ? (
            <Slider {...settings}>
              {lastProducts.map((product, index) => (
                <CarPreview {...product} key={index} />
              ))}
            </Slider>
          ) : (
            <div className="progress-bar-bk">
              <Loading color="secondary" />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Topstample;
