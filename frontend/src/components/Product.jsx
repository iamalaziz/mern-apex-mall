import React from 'react';
import Rating from './Rating';
import SVG from './SVG';
import { Link } from 'react-router-dom';
import { likeProduct } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const isLiked = product.likes && product.likes[userInfo._id];
  return (
    <>
      <div className="h-full border rounded-lg relative bg-white hover:border hover:border-[#00B207] hover:shadow-3xl">
        <button
          onClick={() => dispatch(likeProduct(product._id))}
          className="absolute top-2 right-2 border border-gray-400 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white"
        >
          {isLiked ? (
            <SVG
              item="like"
              style={{ width: '20px', fill: 'red', stroke: 'red' }}
            />
          ) : (
            <SVG item="like" style={{ width: '20px' }} />
          )}
        </button>
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            width="100%"
            alt="product"
            className="rounded-t-lg"
          />
          <div className="flex justify-between p-2">
            <div>
              <h3 className="font-light leading-none pb-2 min-h-12 max-w-[220px]">
                <strong className="text-sm line-clamp-2">{product.name}</strong>
              </h3>
              <p className="text-xl">${product.price}</p>
              <div>
                <Rating value={product.rating} text={`${product.numReviews}`} />
              </div>
            </div>
            <div className="card-cart min-w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gray-200 hover:bg-[#00B207] transition-colors duration-100">
              <SVG
                item="cart"
                style={{ width: '30px' }}
                className="stroke-current text-red-500 hover:text-white"
              />
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Product;
