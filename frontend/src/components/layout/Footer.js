import React from 'react'

const Footer = () => {
    return (
        <div>
            {/* Footer */}
            <section className="section-padding bg-white border-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-sm-6">
                            <div className="feature-box">
                                <i className="mdi mdi-truck-fast" />
                                <h6>Fast &amp; Next Day Delivery</h6>
                                <p>Lorem ipsum dolor sit amet, cons...</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="feature-box">
                                <i className="mdi mdi-basket" />
                                <h6>100% Satisfaction Guarantee</h6>
                                <p>Rorem Ipsum Dolor sit amet, cons...</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="feature-box">
                                <i className="mdi mdi-tag-heart" />
                                <h6>Great Daily Deals Discount</h6>
                                <p>Sorem Ipsum Dolor sit amet, Cons...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding footer bg-white border-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3">
                            <h4 className="mb-5 mt-0"><a className="logo" href="index.html"><img src="/" alt="FastCars" /></a></h4>
                            <p className="mb-0"><a className="text-dark" href="#"><i className="mdi mdi-phone" /> +234 704 4055 887</a></p>
                            <p className="mb-0"><a className="text-dark" href="#"><i className="mdi mdi-cellphone-iphone" /> +01 756 1234</a></p>
                        </div>
                        <div className="col-lg-2 col-md-2">
                            <h6 className="mb-4">TOP CITIES </h6>
                            <ul>
                                <li><a href="#">Lagos</a></li>
                                <li><a href="#">Abuja</a></li>
                                <li><a href="#">Portharcourt</a></li>
                                <li><a href="#">Kano</a></li>
                                <li><a href="#">Kaduna</a></li>
                                <ul>
                                </ul></ul></div>
                        <div className="col-lg-2 col-md-2">
                            <h6 className="mb-4">MAKE</h6>
                            <ul>
                                <li><a href="/makes/honda">Honda</a></li>
                                <li><a href="/makes/mercedes">Mercedes</a></li>
                                <li><a href="/makes/bmw">BMW</a></li>
                                <li><a href="/makes/lexus">Lexus</a></li>
                                <li><a href="/makes/toyota">Toyota</a></li>
                                <ul>
                                </ul></ul></div>
                        <div className="col-lg-2 col-md-2">
                            <h6 className="mb-4">ABOUT US</h6>
                            <ul>
                                <li><a href="#">Company Information</a></li>
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">Location</a></li>
                                <li><a href="#">Affillate Program</a></li>
                                <li><a href="#">Copyright</a></li>
                                <ul>
                                </ul></ul></div>
                        <div className="col-lg-3 col-md-3">
                            <h6 className="mb-4">Download App</h6>
                            <div className="app">
                                <a href="#"><img src="img/google.png" alt /></a>
                                <a href="#"><img src="img/apple.png" alt /></a>
                            </div>
                            <h6 className="mb-3 mt-4">GET IN TOUCH FOR PARTNERSHIP</h6>
                            <div className="footer-social">
                                <a className="btn-facebook" href="#"><i className="mdi mdi-facebook" /></a>
                                <a className="btn-twitter" href="#"><i className="mdi mdi-twitter" /></a>
                                <a className="btn-instagram" href="#"><i className="mdi mdi-instagram" /></a>
                                <a className="btn-whatsapp" href="#"><i className="mdi mdi-whatsapp" /></a>
                                <a className="btn-messenger" href="#"><i className="mdi mdi-facebook-messenger" /></a>
                                <a className="btn-google" href="#"><i className="mdi mdi-google" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Footer */}
            {/* Copyright */}
            <section className="pt-4 pb-4 footer-bottom">
                <div className="container">
                    <div className="row no-gutters">
                        <div className="col-lg-6 col-sm-6">
                            <p className="mt-1 mb-0">© Copyright 2024 <strong className="text-dark">DeveloperMine</strong>. All Rights Reserved<br />
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Copyright */}
        </div>
    )
}

export default Footer