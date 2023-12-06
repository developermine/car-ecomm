import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import "./Dashboard.css";
import axios from "../axios";
import SideBar from "../components/account/SideBar";
import TopHeader from "../components/account/TopHeader";
import Loading from "../components/Loading";
import { Badge, Button, Modal } from "react-bootstrap";

const OrdersPage = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products);
  const [orderToShow, setOrderToShow] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/user/${user._id}/orders`)
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, [user._id]);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <h1 className="text-center pt-3">No orders yet</h1>;
  }
  console.log("available ordered", products);

  function showOrder(productsObj) {
    let productsToShow = products.filter((product) => productsObj[product._id]);
    productsToShow = productsToShow.map((product) => {
      const productCopy = { ...product };
      productCopy.count = productsObj[product._id];
      delete productCopy.description;
      return productCopy;
    });
    setShow(true);
    setOrderToShow(productsToShow);
  }

  return (
    <div className="wrapper">
      <TopHeader />
      <div className>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <SideBar />
            </div>
            <div className="col-lg-9 col-md-8">
              <div className="dashboard-right">
                <div className="row">
                  <div className="col-md-12">
                    <div className="main-title-tab">
                      <h4>
                        <i className="uil uil-box" />
                        My Orders
                      </h4>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="pdpt-bg">
                      <div className="pdpt-title">
                        <h6>Order List</h6>
                      </div>
                      <div className="order-body10">
                        <div class="card card-body account-right">
                          <div class="widget">
                            <div class="order-list-tabel-main table-responsive">
                              <table
                                class="datatabel table table-striped table-bordered order-list-tabel"
                                width="100%"
                                cellspacing="0"
                              >
                                <thead>
                                  <tr>
                                    <th>Order #</th>
                                    <th>Name</th>
                                    <th>Date Purchased</th>
                                    <th>Status</th>
                                    <th>Shipping Address</th>
                                    <th>Payment Type</th>
                                    <th>Price</th>
                                    <th>Delivery</th>
                                    <th>VAT</th>
                                    <th>Total</th>
                                    <th>View Order</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {orders.map((order, index) => (
                                    <tr key={index}>
                                      <td>#{order._id}</td>
                                      <td>
                                        {order.make}- {order.model}
                                      </td>
                                      <td>
                                        <Moment format="MMMM Do YYYY">
                                          {order.createdAt}
                                        </Moment>
                                      </td>

                                      <td>
                                        <Badge
                                          bg={`${
                                            order.status === "processing"
                                              ? "warning"
                                              : "success"
                                          }`}
                                          text="white"
                                        >
                                          {order.status}
                                        </Badge>
                                      </td>
                                      <td>{order.address}</td>
                                      <td>{order.paymentInfo.type}</td>
                                      <td>{order.total}</td>
                                      <td>{order.delevery}</td>
                                      <td>{order.vat}</td>
                                      <td>{order.totalPrice}</td>
                                      <td>
                                        <span
                                          style={{ cursor: "pointer" }}
                                          onClick={() =>
                                            showOrder(order.products)
                                          }
                                        >
                                          View order{" "}
                                          <i className="fa fa-eye"></i>
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Order details</Modal.Title>
                                </Modal.Header>
                                {orderToShow.map((order) => (
                                  <div className="order-details__container d-flex justify-content-around py-2">
                                    <img
                                      alt=""
                                      src={order.pictures[0].url}
                                      style={{
                                        maxWidth: 100,
                                        height: 100,
                                        objectFit: "cover",
                                      }}
                                    />
                                    <p>
                                      <span>{order.count} x </span> {order.name}
                                    </p>
                                    <p>
                                      Price: $
                                      {Number(order.price) * order.count}
                                    </p>
                                  </div>
                                ))}
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                  >
                                    Close
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
