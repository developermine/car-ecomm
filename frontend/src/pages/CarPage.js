import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Badge,
  Col,
  Container,
  Row,
  Button,
  ButtonGroup,
  Card,
} from "react-bootstrap";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useAddToCartMutation } from "../services/appApi";
import { useAddToWishlistMutation } from "../services/appApi";
import "./ProductPage.css";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import ToastMessage from "../components/ToastMessage";
import Login from "../components/auth/Login";
import { LinkContainer } from "react-router-bootstrap";
import { shuffle } from "lodash";

const CarPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const user = useSelector((state) => state.user);
  const [addToCart, { isSuccess }] = useAddToCartMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const [similar, setSimilar] = useState(null);
  const [similarLoading, setSimilarLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  function handleDragStart(e) {
    e.preventDefault();
  }

  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      if (data) {
        setProduct(data.car);
        setSimilar(shuffle(data.similar));
        setSimilarLoading(false);
      }
    });
  }, [id]);

  if (!product) {
    return <Loading />;
  }

  const images = product
    ? product.pictures.map((picture, index) => (
        <img
          key={index}
          alt={`product ${index}`}
          className="product__carousel--image"
          src={picture.url}
          onDragStart={handleDragStart}
        />
      ))
    : null;

  function handleAddToCart() {
    if (user && user._id) {
      addToCart({
        userId: user._id,
        productId: id,
        price: product.price,
        image: product.pictures[0].url,
      });
    } else {
      setShowLoginModal(true);
    }
  }

  function handleAddToWishlist() {
    if (user && user._id) {
      addToWishlist({
        userId: user._id,
        productId: id,
        image: product.pictures[0].url,
      });
      alert("item added to Wishlist succesfully");
    } else {
      setShowLoginModal(true);
    }
  }

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  //similar cars routes mapping
  let similarCars = [];
  if (similarLoading) {
    similarCars = Array.from({ length: 5 }, (_, index) => (
      <div key={index}>
        <Loading />
      </div>
    ));
  } else if (similar) {
    similarCars = similar.map((car, idex) => (
      <div key={idex}>
        <LinkContainer
          to={`/product/${car._id}`}
          style={{
            cursor: "pointer",
            width: "13rem",
            margin: "10px",
          }}
        >
          <Card style={{ width: "20rem", margin: "10px" }}>
            <Card.Img
              variant="top"
              className="product-preview-img"
              src={car.pictures[0].url}
              style={{ height: "150px", objectFit: "cover" }}
            />
            <Card.Body>
              <Badge bg="warning" text="dark">
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {car.makes[0].make}
                </div>
                <div style={{ textAlign: "center" }}>
                  <Badge
                    bg="secondary"
                    style={{ fontSize: "20px", margin: "0 5px" }}
                  >
                    {car.makes[0].models}
                  </Badge>
                </div>
              </Badge>
            </Card.Body>
          </Card>
        </LinkContainer>
      </div>
    ));
  }

  return (
    <Container className="pt-5" style={{ position: "relative" }}>
      <Row>
        <Col lg={6}>
          {/* <AliceCarousel mouseTracking items={images} controlsStrategy="alternate" /> */}
          {/* <AliceCarousel mouseTracking items={images} controlsStrategy="alternate" /> */}
          <AliceCarousel mouseTracking controlsStrategy="alternate">
            {images}
          </AliceCarousel>
        </Col>
        <Col lg={6} className="pt-4">
          {product &&
            product.makes.map((make, index) => (
              <h1 key={index}>
                <Badge bg="primary">{make.make}</Badge>
              </h1>
            ))}
          <p>
            {product &&
              product.makes[0].models.map((model, index) => (
                <h2 key={index} bg="primary">
                  {model} - {product.trim} - <strong>V</strong>
                  {product.cylinder}. <strong>Year:</strong> {product.year}
                </h2>
              ))}
          </p>
          <p className="product__condition">
            <strong>Condition: </strong>
            {product ? product.condition : ""}. <strong>Color: </strong>
            {product ? product.color : ""}
          </p>
          <p className="product__price">
            <strong>Price:</strong> ₦
            {product ? product.price.toLocaleString() : ""}
          </p>
          <p style={{ textAlign: "justify" }} className="py-3">
            <strong>Description: </strong>
            {product ? product.description : ""}
          </p>
          <p className="product__price">
            <strong>Drivetrain: </strong>
            {product ? product.drivetrain : ""}.<strong>Transmission: </strong>
            {product ? product.transmission : ""}.<strong>Mileage: </strong>
            {product ? product.mileage : ""}.<strong>Fuel: </strong>
            {product ? product.fuel : ""}
          </p>
          {product &&
            product.locations.map((state, index) => (
              <p key={index}>
                <strong>State: </strong>
                {state.State}.
                {product &&
                  product.locations[0].lga.map((local, index) => (
                    <>
                      <strong> LGA: </strong> {local}{" "}
                    </>
                  ))}
              </p>
            ))}
          {user && !user.isAdmin && (
            <ButtonGroup style={{ width: "70%" }}>
              <Button size="lg" onClick={handleAddToCart}>
                Add to cart
              </Button>
              <Button size="lg" onClick={handleAddToWishlist}>
                Add to whishlist
              </Button>
            </ButtonGroup>
          )}
          {!user && (
            <>
              <ButtonGroup style={{ width: "70%" }}>
                <Button size="lg" onClick={handleAddToCart}>
                  Add to cart
                </Button>
                <Button size="lg" onClick={handleAddToWishlist}>
                  Add to whishlist
                </Button>
              </ButtonGroup>
              <Login
                show={showLoginModal}
                setShow={setShowLoginModal}
                onLogin={() => navigate(`/products/${id}`)}
              />
            </>
          )}
          {user && user.isAdmin && (
            <LinkContainer to={`/product/${product._id}/edit`}>
              <Button size="lg">Edit Car</Button>
            </LinkContainer>
          )}
          {isSuccess &&
            product.makes.map((make, index) => (
              <ToastMessage
                bg="info"
                title="Added to cart"
                body={`${make.make} is in your cart`}
              />
            ))}
        </Col>
      </Row>
      <div className="my-4">
        <h2>Suggested Cars</h2>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          <AliceCarousel
            mouseTracking
            items={similarCars}
            responsive={responsive}
            controlsStrategy="alternate"
          />
        </div>
      </div>
    </Container>
  );
};
export default CarPage;
