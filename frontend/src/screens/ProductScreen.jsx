import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import {
  createProductReview,
  listProductDetails,
  likeProduct,
} from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import { Profile } from '../assets';
import SVG from '../components/SVG';

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id: currentProductId } = useParams();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const isLiked = product.likes && userInfo && product.likes[userInfo._id];

  const addToCartHandler = () => {
    if (userInfo) {
      dispatch(addToCart(product._id, qty));
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };

  const { success: successProductReview, error: errorProductReview } =
    useSelector((state) => state.productReview);

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(currentProductId));
  }, [dispatch, currentProductId, successProductReview]);

  function submitHandler(e) {
    e.preventDefault();
    dispatch(createProductReview(currentProductId, { rating, comment }));
  }

  return (
    <section className="max-w-[75%]">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="flex flex-col gap-6 py-8 border-b-[1px] md:flex-row">
            <div className="md:w-1/2">
              <img
                src={product.image}
                width="100%"
                alt={product.name}
                loading="lazy"
              />
            </div>
            <div className="md:w-1/2">
              <div>
                <div className="title flex items-start mb-2">
                  <h3 className="text-2xl font-medium flex-1">
                    {product.name}
                  </h3>
                  {product.countInStock > 0 ? (
                    <span className="px-2 py-1 ml-2 bg-green-100 text-green-600 rounded-lg">
                      In Stock
                    </span>
                  ) : (
                    <span className="px-2 py-1 ml-2 bg-gray-800 text-white rounded-lg">
                      Out of Stock
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                  ·
                  <div className="flex items-center gap-2 text-gray-400">
                    <SVG item="like" style={{ stroke: 'red', width: '18px' }} />
                    <span>
                      {product.likes && Object.keys(product.likes).length} likes
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-medium text-green-700 py-6 border-b-[1px]">
                  ${product.price}
                </h3>
                <p className="text-gray-500 py-4 border-b-[1px]">
                  {product.description}
                </p>
              </div>
              <div className="py-4 border-b-[1px]">
                <div className="flex items-center h-12 gap-2">
                  <div className="count flex p-2 rounded-full border border-gray-200">
                    <button
                      onClick={() => setQty(qty - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      id="quantity"
                      name="quantity"
                      value={qty}
                      className="w-8 mx-auto text-center"
                      onChange={(e) => setQty(e.target.value)}
                    />
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className="flex items-center justify-center gap-2 h-full flex-1 bg-green-500 text-white rounded-full disabled:bg-gray-400"
                  >
                    Add To Cart
                    <span>
                      <SVG
                        item="cart"
                        style={{ stroke: '#fff' }}
                        className="stroke-white"
                      />
                    </span>
                  </button>
                  <button
                    onClick={() => dispatch(likeProduct(product._id))}
                    className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center cursor-pointer"
                  >
                    {isLiked ? (
                      <SVG
                        item="like"
                        style={{ width: '20px', fill: 'red', stroke: 'red' }}
                      />
                    ) : (
                      <SVG
                        item="like"
                        style={{ width: '20px', stroke: 'green' }}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl my-4">Customer Feedback</h3>
            {product && product.reviews && product.reviews.length === 0 && (
              <Message>No Reviews</Message>
            )}
            <ul>
              {product &&
                product.reviews?.map((review) => (
                  <li key={review._id} className="py-4 border-b-[1px]">
                    <div className="flex gap-4 w-full mb-2">
                      <img src={Profile} alt="profile" />
                      <div>
                        <strong className="font-normal">{review.name}</strong>
                        <Rating value={review.rating} />
                      </div>
                      <p className="ml-auto text-gray-500">
                        {review.createdAt.substring(0, 10)}
                      </p>
                    </div>
                    <p className="text-gray-500">{review.comment}</p>
                  </li>
                ))}
            </ul>
            <div>
              <h2 className="text-2xl my-4">Write a Customer Review</h2>
              {errorProductReview && (
                <Message variant="danger">{errorProductReview}</Message>
              )}
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <div>
                    <label htmlFor="rating">Rating {'>'} </label>
                    <select
                      value={rating}
                      id="rating"
                      onChange={(e) => setRating(e.target.value)}
                      className="text-gray-500"
                    >
                      <option value="">Choose</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>
                  <div>
                    <textarea
                      value={comment}
                      id="comment"
                      row="20"
                      onChange={(e) => setComment(e.target.value)}
                      className="peer h-full min-h-[100px] w-full rounded-lg border border-blue-gray-200 my-4 p-3 text-blue-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-1 focus:border-gray-900 focus:outline-0"
                      placeholder="Comment..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="px-2 py-1 bg-green-100 text-green-600 rounded-lg ml-auto"
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <Message>
                  Please, <Link to="/login">sing in</Link> first
                </Message>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductScreen;
