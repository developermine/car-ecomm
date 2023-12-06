import React from "react";
import { useSelector } from "react-redux";
import { useRemoveFromWishlistMutation } from "../../services/appApi";
import { Link } from "react-router-dom";

const Wishlist = ({ setOpenWishlist }) => {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);

  const userWishlistObj = user.wishlist;
  const wishlistItems = products.filter(
    (product) => userWishlistObj[product._id] != null
  );
  const [removeFromWishlist, { isLoading }] = useRemoveFromWishlistMutation();

  return (
    <div className="sidebar-top">
      <div className="sidebar">
        <div className="bs-canvas-header side-cart-header p-3">
          <div className="d-inline-block main-cart-title">
            My Wishlist <span>({wishlistItems.length} Items)</span>
          </div>
          <button
            type="button"
            className="bs-canvas-close close"
            onClick={() => setOpenWishlist(false)}
          >
            <i className="mdi mdi-close"></i>
          </button>
        </div>
        {wishlistItems.length === 0 ? (
          <p>Wishlist/Watchlist is empty!</p>
        ) : (
          <div className="cart-sidebar-body">
            {wishlistItems.map((row, index) => (
              <div className="cart-row" key={index}>
                <Link
                  to={`/product/${row._id}`}
                  onClick={() => setOpenWishlist(false)}
                >
                  <img
                    style={{ width: 350, height: 200, objectFit: "cover" }}
                    src={row.pictures[0].url}
                    alt="cart"
                  />

                  <div className="cart-text">
                    <h4>{row.makes[0].make}</h4>
                    <div className="cart-radio">
                      <ul className="kggrm-now">
                        <li>
                          <input type="radio" id="a1" name="cart1" />
                          <label>{row.price.toLocaleString()}</label>
                        </li>
                      </ul>
                    </div>

                    <div className="qty-group">
                      <div className="quantity buttons_added">
                        {!isLoading && (
                          <button
                            type="button"
                            className="cart-close-btn"
                            onClick={() =>
                              removeFromWishlist({
                                productId: row._id,
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
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
