import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "../../axios";
import Delivery from "./Delivery";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import { useCreateOrderMutation } from "../../services/appApi";
import { Alert } from "react-bootstrap";
import { PaystackButton } from "react-paystack";

const Checkout = () => {
  const publicKey = "ghfghhff";
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);

  const [state, setState] = useState([]);
  const [lga, setLga] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedLga, setSelectedLga] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [createOrder, { isLoading, isError, isSuccess }] =
    useCreateOrderMutation();
  const [paying, setPaying] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const userCartObj = user.cart;
  let cart = products.filter((product) => userCartObj[product._id] != null);
 

  const subTotal = parseFloat(user.cart.total).toLocaleString();
  const vat = parseFloat(user.cart.total * 0.075).toLocaleString();
  const delevery = parseFloat(user.cart.total * 0.0223).toLocaleString();
  const totalPrice = parseFloat(
    user.cart.total + user.cart.total * 0.075 + user.cart.total * 0.0223
  ).toLocaleString();

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/location/");
      setState(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedState) {
      const selectedStateData = state.find(
        (location) => location.State === selectedState
      );
      setLga(selectedStateData ? selectedStateData.lga : []);
    }
  }, [selectedState, state]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedLga(null);
  };

  const handleLgaChange = (e) => {
    setSelectedLga(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const isDeliveryFilled =
    formData.name &&
    formData.phone &&
    formData.address &&
    selectedLga &&
    selectedState;

  const orderPayload = {
    userId: user._id,
    cart: user.cart,
    address: formData.address,
    state: selectedState,
    lga: selectedLga,
    phone: formData.phone,
    totalPrice: parseFloat(totalPrice.replace(/,/g, "")),
    name: formData.name,
    delevery,
    vat,
    paymentInfo: {},
    make: cart.length > 0 ? cart[0].makes[0].make : "",
    model: cart.length > 0 ? cart[0].makes[0].models[0] : "",
    image: cart.length > 0 ? cart[0].pictures[0].url : "",
    
  };
  console.log(orderPayload.image)

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    orderPayload.paymentInfo = {
      type: "Cash On Delivery",
    };

    createOrder(orderPayload).then(() => {
      if (!isLoading && !isSuccess) {
        setAlertMessage(`payment Cash On Delivery`);
        setTimeout(() => {
          navigate("/order/success");
        }, 3000);
      }
    });
  };

  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    if (paymentMethod === "cash") {
      cashOnDeliveryHandler(e);
    } else if (paymentMethod === "card") {
      if (!stripe || !elements || user.cart.count <= 0) return;
      setPaying(true);
      const { client_secret } = await fetch(
        "http://localhost:8181/create-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ",
          },
          body: JSON.stringify({
            amount: parseInt(totalPrice.replace(/,/g, ""), 10),
          }),
        }
      ).then((res) => res.json());
      const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      setPaying(false);
      if (paymentIntent) {
        orderPayload.paymentInfo = {
          id: paymentIntent.id,
          status: paymentIntent.status,
          type: "Credit Card",
        };
        createOrder(orderPayload).then(() => {
          if (!isLoading && !isError) {
            setAlertMessage(`Payment ${paymentIntent.status}`);
            setTimeout(() => {
              navigate("/order/success");
            }, 3000);
          } else {
            setAlertMessage("Order failed");
            setTimeout(() => {
              navigate("/order/failure");
            }, 3000);
          }
        });
      }
    }
  };

  // paystack payment

  const componentProps = {
    email: `${user.email}`,
    amount: parseInt(totalPrice.replace(/,/g, ""), 10) * 100,
    metadata: {
      name: formData.name,
      phone: formData.phone,
    },
    publicKey,
    text: "Pay With Paystack",
    onSuccess: () => {
      orderPayload.paymentInfo = {
        status: "Succeeded",
        type: "Paystack",
      };
      createOrder(orderPayload).then(() => {
        setAlertMessage("sucessfull payment");
        setTimeout(() => {
          navigate("/order/success");
        }, 2000);
      });
    },
  };

  return (
    <div className="top-checkout">
      <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white single-product-header-bk">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <a href="/">
                <strong>
                  <span class="mdi mdi-home"></span> Home
                </strong>
              </a>{" "}
              <span class="mdi mdi-chevron-right"></span> <Link>Checkout</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="checkout-page section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              {isLoaded ? (
                <div className="checkout-step">
                  <div className="accordion" id="accordionExample">
                    <div className="card checkout-step-one">
                      <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                          <button
                            className="btn btn-link checkout-login-bk"
                            disabled
                          >
                            <span className="number">1</span> Login{" "}
                            <span className="mdi mdi-checkbox-marked-circle-outline"></span>
                          </button>
                          <div className="_2jDL7w">
                            <div>
                              <span className="dNZmcB">{user.firstname}: </span>
                              <span className="_3MeY5j">{user.email}</span>
                            </div>
                          </div>
                        </h5>
                      </div>
                    </div>
                    <div className="card checkout-step-two">
                      <div className="card-header" id="headingTwo">
                        <h5 className="mb-0">
                          <button
                            className="btn btn-link collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            <span className="number">2</span> Delivery Address
                          </button>
                        </h5>
                      </div>
                      <div
                        id="collapseTwo"
                        className={`collapse ${isDeliveryFilled ? "show" : ""}`}
                        aria-labelledby="headingTwo"
                        data-parent="#accordionExample"
                      >
                        <Delivery
                          formData={formData}
                          setFormData={setFormData}
                          selectedState={selectedState}
                          lga={lga}
                          state={state}
                          selectedLga={selectedLga}
                          handleStateChange={handleStateChange}
                          handleLgaChange={handleLgaChange}
                        />
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header" id="headingThree">
                        <h5 className="mb-0">
                          <button
                            className="btn btn-link collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                            disabled={!isDeliveryFilled}
                          >
                            <span className="number">3</span> Payment
                          </button>
                        </h5>
                      </div>
                      <div
                        id="collapseThree"
                        className="collapse"
                        aria-labelledby="headingThree"
                        data-parent="#accordionExample"
                      >
                        <div className="checkout-step-body">
                          <div className="payment_method-checkout">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="rpt100">
                                  <ul className="radio--group-inline-container_1">
                                    <li>
                                      <div className="radio-item_1">
                                        <input
                                          id="cashondelivery1"
                                          value="cash"
                                          name="paymentmethod"
                                          type="radio"
                                          checked={paymentMethod === "cash"}
                                          onChange={handlePaymentMethodChange}
                                        />
                                        <label
                                          htmlFor="cashondelivery1"
                                          className="radio-label_1"
                                        >
                                          Cash on Delivery
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="radio-item_1">
                                        <input
                                          id="card1"
                                          value="card"
                                          name="paymentmethod"
                                          type="radio"
                                          checked={paymentMethod === "card"}
                                          onChange={handlePaymentMethodChange}
                                        />
                                        <label
                                          htmlFor="card1"
                                          className="radio-label_1"
                                        >
                                          Pay With Card
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="radio-item_1">
                                        <PaystackButton
                                          htmlFor="card1"
                                          className="radio-label_1"
                                          {...componentProps}
                                        />
                                      </div>
                                    </li>
                                  </ul>
                                  {paymentMethod === "card" && (
                                    <div className="card-container">
                                      <label>card details:</label>
                                      <CardElement
                                        id="card-element"
                                        className="card-information"
                                      />
                                    </div>
                                    // <CardElement id="card-element" />
                                  )}
                                </div>
                                {alertMessage && <Alert>{alertMessage}</Alert>}
                                <button
                                  className="next-btn16 hover-btn"
                                  disabled={
                                    user.cart.count <= 0 || paying || isSuccess
                                  }
                                  onClick={handleConfirmOrder}
                                >
                                  {paying ? "Processing..." : "Confirm"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Loading />
              )}
            </div>
            <div className="col-md-4">
              <div className="card">
                <h5 className="card-header">
                  My Cart{" "}
                  <span className="text-secondary float-right">
                    ({cart.length} item)
                  </span>
                </h5>
                {cart.map((row, index) => (
                  <div className="card-body pt-0 pr-0 pl-0 pb-0" key={index}>
                    <div className="cart-list-product">
                      <img
                        className="img-fluid"
                        src={row.pictures[0].url}
                        alt="cart"
                      />
                      {/* <span className="badge badge-success">{row.discountPer}% OFF</span> */}
                      <h5>{row.makes[0].make}</h5>
                      {/* <h6><strong><span className="mdi mdi-approval" /> Available in</strong> - {row.unitSize} gm</h6>
                                                <p className="offer-price mb-0">&#x20B9;{row.qty + '*' + row.netPrice} <i className="mdi mdi-tag-outline" /> <span className="regular-price">&#x20B9;{row.price}</span></p> */}
                    </div>
                  </div>
                ))}
                <div className="total-checkout-group">
                  <div className="cart-total-dil">
                    <h4>Sub Total</h4>
                    <span>&#8358;{subTotal && subTotal}</span>
                  </div>
                  <div className="cart-total-dil">
                    <h4>Total VAT</h4>
                    <span>&#8358;{vat && vat}</span>
                  </div>
                  <div className="cart-total-dil pt-3">
                    <h4>Delivery Charges</h4>
                    <span>&#8358;{delevery && delevery}</span>
                  </div>
                  <div className="main-total-cart">
                    <h2>Total</h2>
                    <span>&#8358;{totalPrice && totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
