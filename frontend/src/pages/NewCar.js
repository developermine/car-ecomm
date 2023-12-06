import React, { useState, useEffect } from "react";
import { Container, Row, Form, Col, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../services/appApi";
import axios from "../axios";
import "./NewProduct.css";

const NewProduct = () => {
  const [trim, setTrim] = useState("");
  const [drivetrain, setDriveTrain] = useState("");
  const [cylinder, setCylinder] = useState("");
  const [color, setColor] = useState("");
  const [transmission, setTransmission] = useState("");
  // const [style, setStyle] = useState("");
  const [fuel, setFuel] = useState("");
  const [body, setBody] = useState("");

  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState(null);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locals, setLocals] = useState([]);
  const [selectedLocal, setSelectedLocal] = useState(null);

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [year, setYear] = useState();
  const [stock, setStock] = useState();

  const [condition, setCondition] = useState("");
  const [mileage, setMileage] = useState("");
  const [images, setImages] = useState([]);
  const [imgToRemove, setImageToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();

  // {name, description, price, category, pictures}
  function handleRemoveImg(imgObj) {
    setImageToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImageToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !trim ||
      !drivetrain ||
      !cylinder ||
      !color ||
      !transmission ||
      // !style ||
      !fuel ||
      !body ||
      !selectedMake ||
      !year ||
      !mileage ||
      !condition ||
      !selectedLocation ||
      !selectedLocal ||
      !description ||
      !price ||
      !selectedModel ||
      !images.length ||
      !stock
    ) {
      return alert("Please fill out all the fiels");
    }

    const selectedMakes = [{ make: selectedMake, models: selectedModel }];

    const selectedLocations = [{ State: selectedLocation, lga: selectedLocal }];

    createProduct({
      trim,
      drivetrain,
      cylinder,
      color,
      transmission,
      // style,
      fuel,
      body,
      description,
      year,
      condition,
      locations: selectedLocations,
      mileage,
      price,
      makes: selectedMakes,
      images,
      stock,
    }).then((data) => {
      if (data.length > 0) {
        console.log(data);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    });
  }

  useEffect(() => {
    const getCars = async () => {
      const { data } = await axios.get("/api/cars/");
      setMakes(data);
    };
    getCars();
  }, []);

  useEffect(() => {
    if (selectedMake) {
      const selectedMakeData = makes.find((make) => make.make === selectedMake);
      setModels(selectedMakeData.models);
    }
  }, [selectedMake, makes]);

  const handleMakeChange = (e) => {
    setSelectedMake(e.target.value);
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  useEffect(() => {
    const getCars = async () => {
      const { data } = await axios.get("/api/location/");
      setLocations(data);
    };
    getCars();
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      const selectedLocationData = locations.find(
        (location) => location.State === selectedLocation
      );
      setLocals(selectedLocationData.lga);
    }
  }, [selectedLocation, locations]);

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleLocalChange = (e) => {
    setSelectedLocal(e.target.value);
  };

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dxtcs",
        uploadPreset: "l8hta",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  }

  return (
    <Container>
      <Row>
        <Col
          md={6}
          className="new-product__form--container"
          style={{ marginTop: "70px" }}
        >
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h2 className="mt-4">Create a Car Ads</h2>
            {isSuccess && (
              <Alert variant="success">Car Ads Created is successful</Alert>
            )}
            {isError && <Alert variant="danger">{error.data}</Alert>}

            <Form.Group className="mb-3" onChange={handleMakeChange}>
              <Form.Label>Car Make:</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Select a make --
                </option>
                {makes.map((make) => (
                  <option key={make.make} value={make.make}>
                    {make.make}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {selectedMake && (
              <Form.Group className="mb-3" onChange={handleModelChange}>
                <Form.Label>Car Model:</Form.Label>
                <Form.Select>
                  <option disabled selected>
                    -- Select a model --
                  </option>
                  {models.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Car Trim:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Trim"
                onChange={(e) => setTrim(e.target.value)}
                value={trim}
                required
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setCylinder(e.target.value)}
            >
              <Form.Label>Cylinder:</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Select Car Cylinder --
                </option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="12">12</option>
                <option value="16">16</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mileage:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Mileage"
                onChange={(e) => setMileage(e.target.value)}
                value={mileage}
                required
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setDriveTrain(e.target.value)}
            >
              <Form.Label>Drive-Train:</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Select Drive Train --
                </option>
                <option value="4x4-Front-Wheel-Drive">
                  4x4 with Front Wheel Drive
                </option>
                <option value="4x4-Rear-Wheel-Drive">
                  4x4 with Rear Wheel Drive
                </option>
                <option value="All-Wheel-Drive">All Wheel Drive</option>
                <option value="Front-Wheel-Drive">Front Wheel Drive</option>
                <option value="Rear-Wheel-Drive">Rear Wheel Drive</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setTransmission(e.target.value)}
            >
              <Form.Label>Transmission:</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Select Transmission --
                </option>
                <option value="Automatic">AUTOMATIC</option>
                <option value="Manual">MANUAL</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setFuel(e.target.value)}
            >
              <Form.Label>Fuel:</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Select Fuel Type --
                </option>
                <option value="CNG">CNG</option>
                <option value="PMS (Petrol)">PMS (Petrol)</option>
                <option value="DIESEL">DIESEL</option>
                <option value="ELECTRIC">ELECTRIC</option>
                <option value="HYBRID">HYBRID</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setYear(e.target.value)}
            >
              <Form.Label>Year:</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Select Year --
                </option>
                <option value="2001">2001</option>
                <option value="2002">2002</option>
                <option value="2003">2003</option>
                <option value="2004">2004</option>
                <option value="2005">2005</option>
                <option value="2006">2006</option>
                <option value="2007">2007</option>
                <option value="2008">2008</option>
                <option value="2009">2009</option>
                <option value="2010">2010</option>
                <option value="2011">2011</option>
                <option value="2012">2012</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setBody(e.target.value)}
            >
              <Form.Label>Car-Body-Type:</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Select Body --
                </option>
                <option value="Saloon">Saloon</option>
                <option value="SUV">SUV</option>
                <option value="Jeep">Jeep</option>
                <option value="Pick-up">Pick Up</option>
                <option value="Family-Bus">Family Bus</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Car description:</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Car description"
                style={{ height: "100px" }}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </Form.Group>

            {/* <Form.Group
              className="mb-3"
              onChange={(e) => setStyle(e.target.value)}
            >
              <Form.Label>Car-Seat:</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Select Seat --
                </option>
                <option value="">2 Seater</option>
                <option value="">4 Seater</option>
                <option value="">8 Seater</option>
                <option value="">16 Seater</option>
                <option value="">18 Seater</option>
              </Form.Select>
            </Form.Group> */}

            <Form.Group className="mb-3">
              <Form.Label>Colour:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Color"
                onChange={(e) => setColor(e.target.value)}
                value={color}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price (₦):</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price (₦)"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="mb-3">Product Stock</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Enter your product stock..."
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setCondition(e.target.value)}
            >
              <Form.Label>Car Condition:</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Select Condition --
                </option>
                <option value="Foreing">Foreing</option>
                <option value="Used">Used</option>
                <option value="New">New</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" onChange={handleLocationChange}>
              <Form.Label>Car Location:</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Select Location --
                </option>
                {locations.map((states) => (
                  <option key={states.State} value={states.State}>
                    {states.State}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {selectedLocation && (
              <Form.Group className="mb-3" onChange={handleLocalChange}>
                <Form.Label>LGA</Form.Label>
                <Form.Select>
                  <option disabled selected>
                    -- Select local government area --
                  </option>
                  {locals.map((local) => (
                    <option key={local} value={local}>
                      {local}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Button type="button" onClick={showWidget}>
                Upload Images
              </Button>
              <div className="mages-preview-container">
                {images.map((image) => (
                  <div className="image-preview">
                    <img alt="" src={image.url} />
                    {/* add icon for removing image */}
                    {imgToRemove !== image.public_id && (
                      <i
                        className="fa fa-times-circle"
                        onClick={() => handleRemoveImg(image)}
                      ></i>
                    )}{" "}
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Button type="submit" disabled={isLoading && isSuccess}>
                Create Ads{" "}
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="new-product__image--container">
          {" "}
        </Col>
      </Row>
    </Container>
  );
};

export default NewProduct;
