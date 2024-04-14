import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { useParams } from 'react-router-dom';

// components
import Loader from '../components/Loader';
import Message from '../components/Message';
import Hero from '../components/Hero/Hero';
import Product from '../components/Product';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {keyword} = useParams();

  const { loading, products, error } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <h1>Latest Products</h1>
      <Hero />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col sm={12} md={6} lg={3} key={product._id}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
