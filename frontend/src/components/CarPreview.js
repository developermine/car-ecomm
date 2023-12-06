import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CarPreview = ({ _id, makes, pictures }) => {
  return (
    <LinkContainer to={`/product/${_id}`} style={{ cursor: "pointer", width: "13rem", margin: "10px" }}>
      <Card style={{ width: "20rem", margin: "10px" }}>
        <Card.Img variant="top" className='product-preview-img' src={pictures[0].url} style={{ height: "auto", width: "100%", objectFit: 'cover' }} />
        <Card.Body>
          <div>
            <Badge bg="warning" text='dark'>
              {makes.map((makeObj, index) => (
                <div key={index}>
                  <div style={{ fontSize: "20px", fontWeight: "bold", textAlign: "center" }}>{makeObj.make}</div>

                   <div style={{ textAlign: "center" }}>
                    {makeObj.models.map((model, modelIndex) => (
                      <Badge key={modelIndex} bg='secondary' style={{ fontSize: "20px", margin: "0 5px" }}>
                        {model}
                      </Badge>
                    ))}
                  </div> 
                </div>
              ))}
            </Badge>
          
          </div>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}

export default CarPreview;

