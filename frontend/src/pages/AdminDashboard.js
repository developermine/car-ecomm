import React from "react";
import { Container, Nav, Tab, Col, Row } from "react-bootstrap";
import ClientsAdminPage from "../components/ClientsAdminPage";
import DashboardProducts from "../components/DashboardProducts";
import OrdersAdminPage from "../components/OrdersAdminPage";
import SideBar from "../components/account/SideBar";
import { Link, useNavigate } from "react-router-dom";
import TopHeader from "../components/account/TopHeader";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";

const AdminDashboard = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Tab.Container defaultActiveKey="products">
      <div className="wrapper">
        <TopHeader />

        <div className>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-4">
                <div className="left-side-tabs">
                  <div className="dashboard-left-links">
                    <a href="/account/view" className="user-item active">
                      <i className="uil uil-apps" />
                      Overview
                    </a>

                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="products">Cars</Nav.Link>
                      </Nav.Item>

                      <Nav.Item>
                        <Nav.Link eventKey="orders">
                          <i className="uil uil-box" />
                          Orders
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="clients">Clients</Nav.Link>
                      </Nav.Item>
                    </Nav>

                    <a className="user-item" onClick={handleLogout}>
                      <i className="uil uil-exit" />
                      Logout
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-8">
                <div className="dashboard-right">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="main-title-tab">
                        <h4>
                          <i className="uil uil-apps" />
                          Overview
                        </h4>
                      </div>
                      <div className="welcome-text">
                        <h2>Hi! Admin {`${user.firstname}`}</h2>
                      </div>
                    </div>

                    <Col sm={9}>
                      <Tab.Content>
                        <Tab.Pane eventKey="products">
                          <DashboardProducts />
                        </Tab.Pane>
                        <Tab.Pane eventKey="orders">
                          <OrdersAdminPage />
                        </Tab.Pane>
                        <Tab.Pane eventKey="clients">
                          <ClientsAdminPage />
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Tab.Container>
  );
};

export default AdminDashboard;
