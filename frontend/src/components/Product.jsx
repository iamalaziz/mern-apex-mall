import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';


const Product = ({ product }) => {
  return (
    <Card className="my-3 p-1 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
        <Card.Body>
          <Card.Title as="div" className='h-10px'>
            <strong style={{fontSize: '14px'}}>{product.name}</strong>
          </Card.Title>
          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`(${product.numReviews})`}
            />
          </Card.Text>
          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default Product;
