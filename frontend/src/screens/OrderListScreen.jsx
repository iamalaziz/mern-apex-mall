import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { listOrders } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const OrderListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, orders } = useSelector((state) => state.orderList);
    const { userInfo } = useSelector((state) => state.userLogin);

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            navigate('/login');
        }
    }, [userInfo, dispatch, navigate]);

    return (
        <section className="max-w-[95%] mb-10">
            <h2 className="text-xl text-center font-medium">Orders</h2>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message bg="border-red bg-red-200">{error}</Message>
            ) : (
                <table className="border border-separate rounded-xl border-slate-400">
                    <thead className="uppercase bg-gray-50 text-left">
                        <tr>
                            <th className="px-6 py-3 font-normal text-gray-500 rounded-tl border-b border-slate-400">
                                ID
                            </th>
                            <th className="px-6 py-3 font-normal text-gray-700 border-b border-slate-400">
                                USER
                            </th>
                            <th className="px-6 py-3 font-normal text-gray-700 border-b border-slate-400">
                                DATE
                            </th>
                            <th className="px-6 py-3 font-normal text-gray-700 border-b border-slate-400">
                                TOTAL
                            </th>
                            <th className="px-6 py-3 font-normal text-gray-700 border-b border-slate-400">
                                PAID
                            </th>
                            <th className="px-6 py-3 font-normal text-gray-700 border-b border-slate-400">
                                DELIVERED
                            </th>
                            <th className="border-b border-slate-400"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            return (
                                <tr key={order._id}>
                                    <td className="px-6 py-3 border-b border-slate-400">
                                        {order._id
                                            .substring(0, 5)
                                            .toUpperCase()}
                                    </td>
                                    <td className="px-6 py-3 border-b border-slate-400">
                                        {order.user && order.user.name}
                                    </td>
                                    <td className="px-6 py-3 border-b border-slate-400">
                                        {order.createdAt.substring(0, 10)}
                                    </td>
                                    <td className="px-6 py-3 border-b border-slate-400">
                                        ₩{order.totalPrice}
                                    </td>
                                    <td className="px-6 py-3 border-b border-slate-400 text-center">
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: 'red' }}
                                            ></i>
                                        )}
                                    </td>
                                    <td className="px-6 py-3 border-b border-slate-400 text-center">
                                        {order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: 'red' }}
                                            ></i>
                                        )}
                                    </td>
                                    <td className="px-6 py-3 border-b border-slate-400">
                                        <NavLink to={`/order/${order._id}`}>
                                            <button
                                                variant="light"
                                                className="underline"
                                            >
                                                Details
                                            </button>
                                        </NavLink>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </section>
    );
};

export default OrderListScreen;
