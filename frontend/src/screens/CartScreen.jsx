import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../components/Message';
import { useNavigate, Link } from 'react-router-dom';
import { Cross } from '../assets';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <section className="max-w-[95%]">
      <h2 className="font-medium text-2x text-center my-10">
        My Shopping Cart
      </h2>
      {cartItems.length === 0 || !userInfo ? (
        <Message>
          Your cart is empty{' '}
          <Link to="/" className="underline text-green-500">
            Go Back
          </Link>
        </Message>
      ) : (
        <div className="flex flex-wrap flex-row items-start gap-4">
          <div className="overflow-x-auto">
            <table className="border border-separate rounded-xl border-slate-400">
              <thead className="uppercase bg-gray-50 text-left">
                <tr>
                  <th className="px-6 py-3 font-normal text-gray-500 rounded-tl border-b border-slate-400">
                    Image
                  </th>
                  <th className="px-6 py-3 font-normal text-gray-700 border-b border-slate-400">
                    Product
                  </th>
                  <th className="px-6 py-3 font-normal text-gray-700 border-b border-slate-400">
                    Price
                  </th>
                  <th className="px-6 py-3 font-normal text-gray-700 border-b border-slate-400">
                    Quantity
                  </th>
                  <th
                    colSpan="2"
                    className="px-6 py-3 font-normal text-gray-700 rounded-tr border-b border-slate-400"
                  >
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.product} className="p-2">
                    <td className="px-6 py-3 border-b border-slate-400">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[80px]"
                      />
                    </td>
                    <td className="px-6 py-3 font-medium text-gray-700 border-b border-slate-400">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td className="px-6 py-3 text-gray-500 border-b border-slate-400">
                      ${item.price}
                    </td>
                    <td className="px-6 py-3 border-b border-slate-400">
                      <div className="count flex p-2 rounded-full border border-gray-200">
                        <button
                          onClick={(e) => {
                            if (item.qty === 1) {
                              dispatch(removeFromCart(item.product));
                              return;
                            }
                            dispatch(addToCart(item.product, item.qty - 1));
                          }}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          id={item.product}
                          value={item.qty}
                          className="max-w-8 mx-auto text-center"
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        />
                        <button
                          onClick={() =>
                            dispatch(addToCart(item.product, item.qty + 1))
                          }
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-gray-500 border-b border-slate-400">
                      ${(item.price * item.qty).toFixed(2)}
                    </td>
                    <td className="px-6 py-3 text-gray-500 border-b border-slate-400">
                      <button
                        className="cursor-pointer"
                        onClick={() => dispatch(removeFromCart(item.product))}
                      >
                        <img
                          src={Cross}
                          alt="clear"
                          style={{ minWidth: '25px' }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="6" className="text-right">
                    <button onClick={() => navigate('/')} className='rounded-full bg-gray-100 px-4 py-2 m-2 cursor-pointer'>
                      Continue Shopping
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          {userInfo && (
            <table className="border border-separate rounded-xl border-slate-400">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th
                    colSpan="2"
                    className="px-3 py-2 font-normal text-gray-700 border-b border-slate-400 rounded-t-xl uppercase"
                  >
                    Cart Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 pt-2 text-gray-700">
                    Number of Products
                  </td>
                  <td className="px-3">
                    {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 text-gray-700">Subtotal</td>
                  <td className="px-3">
                    $
                    {cartItems
                      .reduce((acc, curr) => acc + curr.qty * curr.price, 0)
                      .toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 text-gray-700">Shipping</td>
                  <td className="px-3">Free</td>
                </tr>
                <tr>
                  <td className="px-3 font-medium border-t border-stone-400">
                    Total
                  </td>
                  <td className="px-3 font-medium border-t border-stone-400">
                    {' '}
                    $
                    {cartItems
                      .reduce((acc, curr) => acc + curr.qty * curr.price, 0)
                      .toFixed(2)}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2">
                    <button
                      type="button"
                      className="w-full text-center bg-green-500 rounded-xl py-2 text-white"
                      disabled={cartItems.length === 0}
                      onClick={() => navigate('/shipping')}
                    >
                      Checkout
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      )}
    </section>
  );
};

export default CartScreen;
