import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../features/userSlice";

import Button from "react-bootstrap/Button";
import Login from "../auth/Login";
import Cartsidebar from "../cartsidebar/Cartsidebar";
import Wishlist from "../Wishlist/Wishlist";

const Navigation = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchtxt, setSearchtxt] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);

  //cart to navigation totals
  const userCartObj = user ? user.cart : {};
  let cart = user
    ? products.filter((product) => userCartObj[product._id] != null)
    : [];

  // Wishlist to navigation total
  const userWishlistObj = user ? user.wishlist : {};
  const wishlist = user
    ? products.filter((product) => userWishlistObj[product._id] != null)
    : [];

  const handleChange = (e) => {
    setSearchtxt(e.target.value);
  };

  const handleSearch = () => {
    if (searchtxt.trim() !== "") {
      navigate(`/products/allcars?search=${encodeURIComponent(searchtxt)}`);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <header className="header clearfix">
        <div className="my-2 my-lg-0">
          <ul className="list-inline main-nav-rig"></ul>
        </div>
        <nav className="navbar navbar-light navbar-expand-lg bg-dark bg-faded osahan-menu">
          <div className="container-fluid">
            <a className="navbar-brand" href="/" style={{ color: "#fff" }}>
              Fast-Cars
            </a>
            <button
              id="navbarToggler"
              className="navbar-toggler navbar-toggler-white"
              type="button"
              data-toggle="collapse"
              data-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="navbar-collapse" id="navbarNavDropdown">
              <div className="navbar-nav mr-auto mt-2 mt-lg-0 margin-auto top-categories-search-main">
                {/* <div className="top-categories-search">
                  <div className="input-group">
                    <input
                      className="form-control"
                      placeholder="Search products in Your City"
                      aria-label="Search products in Your City"
                      type="text"
                      id="input"
                      name="searchtxt"
                      value={searchtxt}
                      onChange={handleChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                    />
                    <span className="input-group-btn">
                      <Link to="/makes/all">
                        <button
                          className="btn btn-secondary"
                          type="button"
                          onClick={handleSearch}
                        >
                          <i className="mdi mdi-file-find" /> Search
                        </button>
                      </Link>
                    </span>
                  </div>
                </div> */}
              </div>
              <div className="my-2 my-lg-0">
                <ul className="list-inline main-nav-right">
                  <li className="list-inline-item">
                    {!user && (
                      <Button
                        variant="link"
                        onClick={() => setShowLoginModal(true)}
                        style={
                          user ? { display: "none" } : { display: "block" }
                        }
                      >
                        <i className="mdi mdi-account-circle" /> Login/Sign Up
                      </Button>
                    )}
                    {user && (
                      <div
                        style={
                          user ? { display: "block" } : { display: "none" }
                        }
                        className="dropdown"
                      >
                        <button
                          className="btn-n btn-account dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {`${user.email}`}
                        </button>
                        {user.isAdmin && (
                          <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <Link className="dropdown-item" to="/admin">
                              <i className="uil uil-apps" />
                              Dashboard
                            </Link>
                            <a className="dropdown-item" href="/new-car">
                              <i
                                className="mdi mdi-account-outline"
                                aria-hidden="true"
                              ></i>
                              Create Car Ads
                            </a>

                            {/* <a
                            className="dropdown-item"
                            href="/account/order/list"
                          >
                            <i
                              className="mdi mdi-format-list-bulleted"
                              aria-hidden="true"
                            ></i>{" "}
                            Orders List
                          </a> */}
                            <div className="dropdown-divider"></div>
                            <span
                              className="dropdown-item"
                              onClick={handleLogout}
                            >
                              <i
                                className="mdi mdi-lock"
                                aria-hidden="true"
                              ></i>{" "}
                              Logout
                            </span>
                          </div>
                        )}
                        {user && (
                          <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <Link className="dropdown-item" to="/account/view">
                              <i className="uil uil-apps" />
                              Dashboard
                            </Link>
                            <a
                              className="dropdown-item"
                              href="/account/profile"
                            >
                              <i
                                className="mdi mdi-account-outline"
                                aria-hidden="true"
                              ></i>
                              My Profile
                            </a>
                            {/* <a className="dropdown-item" href="/account/wishlist">
                            <i
                              className="mdi mdi-heart-outline"
                              aria-hidden="true"
                            ></i>
                            Wish List
                          </a> */}
                            <a
                              className="dropdown-item"
                              href="/account/order/list"
                            >
                              <i
                                className="mdi mdi-format-list-bulleted"
                                aria-hidden="true"
                              ></i>{" "}
                              Orders List
                            </a>
                            <div className="dropdown-divider"></div>
                            <span
                              className="dropdown-item"
                              onClick={handleLogout}
                            >
                              <i
                                className="mdi mdi-lock"
                                aria-hidden="true"
                              ></i>{" "}
                              Logout
                            </span>
                          </div>
                        )}

                        {!user.isAdmin && user && (
                          <>
                            <li className="list-inline-item cart-btn">
                              <span
                                onClick={() => setOpenWishlist(true)}
                                className="btn btn-link border-none"
                              >
                                <i className="mdi mdi-heart-outline" />
                                <small className="cart-value">
                                  {wishlist && wishlist.length}
                                </small>
                              </span>
                            </li>
                            <li className="list-inline-item cart-btn">
                              <span
                                onClick={() => setOpenCart(true)}
                                className="btn btn-link border-none"
                              >
                                <i className="mdi mdi-cart" />
                                <small className="cart-value">
                                  {cart && cart.length}
                                </small>
                              </span>
                            </li>
                            {/* cart popup */}
                            {openCart ? (
                              <Cartsidebar setOpenCart={setOpenCart} />
                            ) : null}

                            {/* wishlist popup */}
                            {openWishlist ? (
                              <Wishlist setOpenWishlist={setOpenWishlist} />
                            ) : null}
                          </>
                        )}
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* login popup */}
      {!user && (
        <>
          <Login show={showLoginModal} setShow={setShowLoginModal} />
        </>
      )}
    </div>
  );
};

export default Navigation;
