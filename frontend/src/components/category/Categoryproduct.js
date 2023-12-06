import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import axios from "../../axios";
import { useParams } from "react-router-dom";
// import ProductPreview from "../products/ProductPreview";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import "./categoryproducts.css";
import { LinkContainer } from "react-router-bootstrap";

const Categoryproduct = () => {
  const { make } = useParams();
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products/makes/${make}`)
      .then(({ data }) => {
        setLoading(false);
        setCars(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  }, [make]);

  if (loading) {
    return <Loading />;
  }

  const modelsSearch = cars.filter((car) =>
    car.makes.models.some((model) =>
      model.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );


  return (
    <div className="category-page-container">
      <div
        className={`pt-3 ${make}-banner-container category-banner-container`}
      >
        <h1 className="name-center">
          {make.charAt(0).toUpperCase() + make.slice(1)}
        </h1>
      </div>
      <div className="filters-container d-flex justify-content-center pt-4 pb-4">
        <input
          type="search"
          placeholder="Search by Model"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {modelsSearch.length === 0 ? (
        <h2>No Models to show</h2>
      ) : (
        <Container>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <div className="d-flex justify-content-center align-items-center flex-wrap">
                {modelsSearch.map((car, index) => (
                  // <ProductPreview {...makes}/>
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
                                  {car.makes.make}
                                </div>

                                <div style={{ textAlign: "center" }}>
                                  {car.makes.models.map((model, modelIndex) => (
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
                                  ))}
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

export default Categoryproduct;
