import React from 'react'
import Lottie from "react-lottie";
import animationData from "../Assets/animations/107043-success.json";

const OrderSuccessPage = () => {
        const defaultOptions = {
          loop: false,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        };
        return (
          <div>
            <Lottie options={defaultOptions} width={650} height={650}/>
            <h5 className="success-later">
              Your order is successful 😍
            </h5>
            <br />
            <br />
          </div>
        );
      };

export default OrderSuccessPage