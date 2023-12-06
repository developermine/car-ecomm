import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
  };
  return (
    <div>
      <div className="left-side-tabs">
        <div className="dashboard-left-links">
          <a href="/account/view" className="user-item active">
            <i className="uil uil-apps" />
            Overview
          </a>
          <a href="/account/view" className="user-item">
            <i className="mdi mdi-account-outline" />
            My profile
          </a>
          <a href="/account/order/list" className="user-item">
            <i className="uil uil-box" />
            My Orders
          </a>
          <a href="/account/rewards" className="user-item">
            <i className="uil uil-gift" />
            My Rewards
          </a>
          <a href="/account/wishlist" className="user-item">
            <i className="uil uil-heart" />
            Shopping Wishlist
          </a>
          <a href="/account/address" className="user-item">
            <i className="uil uil-location-point" />
            My Address
          </a>
          <a className="user-item" onClick={handleLogout}>
            <i className="uil uil-exit" />
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
