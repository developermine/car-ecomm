import React from 'react'
import { useSelector } from 'react-redux';
import "./Dashboard.css"
import TopHeader from '../components/account/TopHeader';
import SideBar from '../components/account/SideBar';

const Dashboard = () => {
  const user = useSelector((state) => state.user);
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
                                        <h4><i className="uil uil-apps" />Overview</h4>
                                    </div>
                                    <div className="welcome-text">
                                        <h2>Hi! {`${user.firstname}`}</h2>
                                    </div>
                                </div>


                                {/* <div className="col-lg-6 col-md-12">
                                    <div className="pdpt-bg">
                                        <div className="pdpt-title">
                                            <h4>My Rewards</h4>
                                        </div>
                                        <div className="ddsh-body">
                                            <h2>6 Rewards</h2>
                                            <ul>
                                                <li>
                                                    <a href="#" className="small-reward-dt hover-btn">Won $2</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="small-reward-dt hover-btn">Won 40% Off</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="small-reward-dt hover-btn">Caskback $1</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="rewards-link5">+More</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <a href="#" className="more-link14">Rewards and Details <i className="uil uil-angle-double-right" /></a>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <div className="pdpt-bg">
                                        <div className="pdpt-title">
                                            <h4>My Orders</h4>
                                        </div>
                                        <div className="ddsh-body">
                                            <h2>2 Recently Purchases</h2>
                                            <ul className="order-list-145">
                                                <li>
                                                    <div className="smll-history">
                                                        <div className="order-title">2 Items <span data-inverted data-tooltip="2kg broccoli, 1kg Apple" data-position="top center">?</span></div>
                                                        <div className="order-status">On the way</div>
                                                        <p>$22</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <a href="#" className="more-link14">All Orders <i className="uil uil-angle-double-right" /></a>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="pdpt-bg">
                                        <div className="pdpt-title">
                                            <h4>My Wallet</h4>
                                        </div>
                                        <div className="wllt-body">
                                            <h2>Credits $100</h2>
                                            <ul className="wallet-list">
                                                <li>
                                                    <a href="#" className="wallet-links14"><i className="uil uil-card-atm" />Payment Methods</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="wallet-links14"><i className="uil uil-gift" />3 offers Active</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="wallet-links14"><i className="uil uil-coins" />Points Earning</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <a href="#" className="more-link14">Rewards and Details <i className="uil uil-angle-double-right" /></a>
                                    </div>
                                </div> */}


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

)
}

export default Dashboard