import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { likeProduct } from '../actions/productActions';
import { handleWishlist } from '../actions/userActions';

// components
import Rating from './Rating';
import SVG from './SVG';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(product.likesCount);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    setIsLiked(product.likes && userInfo && product.likes[userInfo._id]);
  }, []);

  const handleLike = () => {
    if (location.pathname === '/favorites') {
      setAnimationClass('animate-remove');
      setTimeout(() => {
        dispatch(likeProduct(product._id));
        dispatch(handleWishlist(product._id));
        isLiked ? setLikesCount(likesCount - 1) : setLikesCount(likesCount + 1);
        setIsLiked(!isLiked);
        setAnimationClass('');
      }, 300);
    } else {
      if (userInfo) {
        dispatch(likeProduct(product._id));
        dispatch(handleWishlist(product._id));
        isLiked ? setLikesCount(likesCount - 1) : setLikesCount(likesCount + 1);
        setIsLiked(!isLiked);
      } else {
        navigate('/register');
      }
    }
  };

  const salePercent = Math.round(
    ((product.price - product.salePrice) / product.price) * 100
  );

  return (
    <div
      className={`product-container h-full border rounded-lg relative bg-white hover:border hover:border-[#00B207] hover:shadow-3xl ${animationClass}`}
    >
      {salePercent !== 100 && (
        <div className="sale absolute bg-red-500 text-white p-1 rounded-lg top-2 left-2">
          SALE {salePercent}%
        </div>
      )}
      <button
        onClick={handleLike}
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
      <Link to={`/product/${product._id}`} className="block">
        <img
          src={product.image}
          alt="product"
          className="rounded-t-lg w-full h-46 object-cover"
        />
        <div className="flex justify-between p-2">
          <div>
            <h3 className="font-light leading-none pb-2 min-h-12 max-w-[220px]">
              <strong className="text-sm line-clamp-2">{product.name}</strong>
            </h3>
            <p className="text-xl">
              ₩{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </p>
            <div className="flex items-center gap-2">
              <Rating value={product.rating} text={`${product.numReviews}`} />
              <div className="flex items-center gap-2 text-gray-400">
                <SVG item="like" style={{ stroke: 'red', width: '18px' }} />
                <span>{likesCount}</span>
              </div>
            </div>
          </div>
          <div className="card-cart min-w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gray-200 transition-colors duration-100">
            <SVG
              item="cart"
              style={{ width: '30px' }}
              className="stroke-current text-red-500 hover:text-white"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
