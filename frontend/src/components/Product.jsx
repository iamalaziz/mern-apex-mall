import React from 'react';
import Rating from './Rating';
import SVG from './SVG';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <>
      <div className="h-full relative hover:border hover:border-[#00B207] hover:shadow-2xl">
        <div className="absolute top-2 right-2 border border-gray-400 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white" >
          <SVG item='like' style={{width: '20px'}}/>
        </div>
        <Link to={`/product/${product._id}`}>
          <img src={product.image} width="100%" alt='product'/>
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
            <div className='card-cart min-w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gray-200 hover:bg-[#00B207] transition-colors duration-100'>
              <SVG item='cart' style={{width: '30px'}} className="stroke-current text-red-500 hover:text-white"/>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Product;
