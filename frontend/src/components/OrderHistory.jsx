import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { listMyOrders } from '../actions/orderActions';
// components
import Message from './Message';
import Loader from './Loader';

const OrderHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
  } = useSelector((state) => state.orderMyList);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(listMyOrders());
    }
  }, [dispatch, userInfo, user]);

  return (
    <React.Fragment>
      <h2>My Orders</h2>
      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Message variant="danger">{errorOrders}</Message>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-separate rounded-xl border-slate-400">
            <thead className="uppercase bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 font-normal text-gray-500 rounded-tl border-b border-slate-400">
                  Image
                </th>
                <th className="px-6 py-3 font-normal text-gray-700 border-b border-slate-400">
                  Product
                </th>
                <th className="px-6 py-3 font-normal text-gray-700 border-b border-slate-400">
                  Date
                </th>
                <th className="px-6 py-3 font-normal text-gray-700 border-b border-slate-400">
                  Total
                </th>
                <th className="px-6 py-3 font-normal text-gray-700 border-b border-slate-400">
                  PAID
                </th>
                <th
                  colSpan="2"
                  className="px-6 py-3 font-normal text-gray-700 rounded-tr border-b border-slate-400"
                >
                  DELIVERED
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id} className="p-2">
                  <td className="px-6 py-3 border-b border-slate-400">
                    <img
                      src={order.orderItems[0].image}
                      alt={order._id}
                      className="w-[80px]"
                    />
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-700 border-b border-slate-400">
                    {order.orderItems[0].name}
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-500 border-b border-slate-400">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="px-6 py-3 text-gray-500 border-b border-slate-400">
                    ₩{order.totalPrice}
                  </td>
                  <td className="px-6 py-3 border-b text-gray-500 border-slate-400">
                    {order.isPaid ? (
                      <span className="text-green-500">
                        {order.paidAt.substring(0, 10)}
                      </span>
                    ) : (
                      'Not completed'
                    )}
                  </td>
                  <td className="px-6 py-3 text-gray-500 border-b border-slate-400">
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : 'Not delivered'}
                  </td>
                  <td className="px-6 py-3 text-gray-500 border-b border-slate-400">
                    <Link to={`/order/${order._id}`}>
                      <button className="py-2 px-4 border border-green-400 text-green-400 rounded-full">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="6" className="text-right">
                  <button
                    onClick={() => navigate('/')}
                    className="rounded-full bg-gray-100 px-4 py-2 m-2 cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </React.Fragment>
  );
};

export default OrderHistory;
