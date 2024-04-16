import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// components
import Message from '../components/Message';
import Product from '../components/Product';

const LikeScreen = () => {
  const { likedItems } = useSelector((state) => state.liked);
  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <section className="max-w-[95%]">
      <h2 className="font-medium text-2x text-center my-10">My Wishlist</h2>
      {likedItems.length === 0 || !userInfo ? (
        <Message>
          Your Wishlist is empty{' '}
          <Link to="/" className="underline text-green-500">
            Go Back
          </Link>
        </Message>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2 w-full mx-auto max-w-[80%] md:grid-cols-3 lg:grid-cols-4">
            {likedItems?.map((product) => {
              console.log(product);
              return (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default LikeScreen;
