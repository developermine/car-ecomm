import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useParams } from "react-router-dom";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import "../components/category/categoryproducts.css";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";

const AllCarsPage = () => {
  const { make } = useParams();
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products/makes/all`)
      .then(({ data }) => {
        setLoading(false);
        setCars(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  }, []);

  // Filter cars based on the combined make and model search term
  const filteredCars = cars.filter((car) => {
    const makeAndModel = `${car.makes[0].make} ${car.makes[0].models.join(" ")}`;
    return makeAndModel.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="category-page-container">
      <div className={`pt-3 ${make}-banner-container category-banner-container`}>
        <h1 className="text-center">All</h1>
      </div>
      <div className="filters-container d-flex justify-content-center pt-4 pb-4 ">
        <input
          type="search"
          placeholder="Search by make and model"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredCars.length === 0 ? (
        <h2>No Car Make to show</h2>
      ) : (
        <Container>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <div className="d-flex justify-content-center align-items-center flex-wrap">
                {filteredCars.map((car, index) => (
                  <div key={index}>
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
                          style={{
                            height: "auto",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <Card.Body>
                          <div>
                            <Badge bg="warning" text="dark">
                              <div>
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
                                  {car.makes[0].models.map(
                                    (model, modelIndex) => (
                                      <Badge
                                        key={modelIndex}
                                        bg="secondary"
                                        style={{
                                          fontSize: "20px",
                                          margin: "0 5px",
                                        }}
                                      >
                                        {model}
                                      </Badge>
                                    )
                                  )}
                                </div>
                              </div>
                            </Badge>
                          </div>
                        </Card.Body>
                      </Card>
                    </LinkContainer>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default AllCarsPage;
