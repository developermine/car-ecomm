import React from "react";
import { useSelector } from "react-redux";
import { useRemoveFromCartMutation } from "../../services/appApi";
import { Link } from "react-router-dom";

const Cartsidebar = ({ setOpenCart }) => {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);

  const userCartObj = user.cart;
  let cart = products.filter((product) => userCartObj[product._id] != null);
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

  const subTotal = parseFloat(user.cart.total).toLocaleString();
  const vat = parseFloat(user.cart.total * 0.075).toLocaleString();
  const delevery = parseFloat(user.cart.total * 0.0223).toLocaleString();
  const totalPrice = parseFloat(
    user.cart.total + user.cart.total * 0.075 + user.cart.total * 0.0223
  ).toFixed(2);

  return (
    <div className="sidebar-top">
      <div className="sidebar">
        <div className="bs-canvas-header side-cart-header p-3 ">
          <div className="d-inline-block  main-cart-title">
            My Cart <span>({cart.length} Items)</span>
          </div>

          <button
            type="button"
            className="bs-canvas-close close"
            onClick={() => setOpenCart(false)}
          >
            <i className="mdi mdi-close"></i>
          </button>
        </div>
        {cart.length === 0 ? (
          <p>Cart is empty!</p>
        ) : (
          <div className="cart-sidebar-body">
            {cart.map((row, index) => (
              <div className="cart-rowrow" key={index}>
                <img
                  style={{ width: 350, height: 200, objectFit: "cover" }}
                  src={row.pictures[0].url}
                  alt="cart"
                />

                <div className="cart-text">
                  <div className="cart-nameholder">
                    <h1>
                      <b>{row.makes[0].make}</b>
                    </h1>
                    <h1>
                      <i>
                        {row.makes[0].models}-{row.trim}-V{row.cylinder}:
                        {row.year}
                      </i>
                    </h1>
                    <h4 className="font-[400] text-[15px] text-[#00000082]">
                      {/* ${row.discountPrice} * {value} // value is the decremented number*/}
                    </h4>
                    <h4 className="cart-number">
                      &#8358;{row.price.toLocaleString()}
                    </h4>
                  </div>
                  <div className="qty-group">
                    <div className="quantity buttons_added">
                      {/* <input type="button" defaultValue="-" className="minus minus-btn" onClick={() => handleDecrease({ productId: row._id, price: row.price, userId: user._id })} /> */}
                      {/* <input type="number" value={row.qty} className="input-text qty text" disabled /> */}
                      {/* <input type="button" defaultValue="+" className="plus plus-btn" onClick={() => increaseCart({ productId:row._id, price:row.price, userId: user._id })} /> */}
                      {!isLoading && (
                        <button
                          type="button"
                          className="cart-close-btn"
                          onClick={() =>
                            removeFromCart({
                              productId: row._id,
                              price: row.price,
                              userId: user._id,
                            })
                          }
                        >
                          <i className="mdi mdi-close" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="cart-sidebar-footer">
          <div className="cart-store-details">
            <p>
              Sub Total{" "}
              <strong className="float-right">
                &#8358;{subTotal && subTotal}
              </strong>
            </p>
            <p>
              VAT{" "}
              <strong className="float-right">
                &#8358;
                {vat && vat}
              </strong>
            </p>
            <p>
              Driver{" "}
              <strong className="float-right">
                &#8358;
                {delevery && delevery}
              </strong>
            </p>
          </div>

          <button className="px-5 mb-3" onClick={() => setOpenCart(false)}>
            {/* checkout buttons */}
            {cart.length > 0 && totalPrice > 0 ? (
            <Link to="/checkout">
              <div
                className="h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]"
              >
                <h1 className="text-[#fff] text-[18px] font-[600]">
                  Checkout Now &#8358;{totalPrice && totalPrice}
                </h1>
              </div>
            </Link>
            ) : (
              <div
                className="h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px] opacity-50 cursor-not-allowed"
              >
                <h1 className="text-[#fff] text-[18px] font-[600]">
                  Checkout Now &#8358;{totalPrice && totalPrice}
                </h1>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cartsidebar;
