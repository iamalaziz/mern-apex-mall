import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { useParams } from 'react-router-dom';

// components
import Loader from '../components/Loader';
import Message from '../components/Message';
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
      <h2 className='font-medium text-2xl text-center my-6'>Introducing Our Products</h2>
      {/* <Hero /> */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="flex flex-wrap w-full max-w-[80%]">
          {products.map((product) => {
            return (
              <div key={product._id} className='w-1/2 border md:w-1/3 lg:w-1/4'>
                <Product product={product} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default HomeScreen;
