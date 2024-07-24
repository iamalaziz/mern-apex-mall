import { useEffect } from 'react';
import { Col, Row, ListGroup, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { order, error, success } = useSelector((state) => state.orderCreate);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addDecimals = (n) => {
        return (Math.round(n * 100) / 100).toFixed(2);
    };
    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, curr) => acc + +curr.qty * +curr.price, 0),
    );

    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 50);
    cart.taxPrice = addDecimals(Number((0.05 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2);

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, success]);

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }),
        );
    };

    return (
        <section className="min-w-[95%] md:min-w-[60%] my-4">
            <CheckoutSteps steps={[true, true, true, true]} />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                {cart.shippingAddress.address},{' '}
                                {cart.shippingAddress.city}
                                {cart.shippingAddress.postalCode},{' '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty!</Message>
                            ) : (
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
                                            <th
                                                colSpan="2"
                                                className="px-6 py-3 font-normal text-gray-700 rounded-tr border-b border-slate-400"
                                            >
                                                Subtotal
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.cartItems.map((item, index) => (
                                            <tr key={item._id} className="p-2">
                                                <td className="px-6 py-3 border-b border-slate-400">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-[80px]"
                                                    />
                                                </td>
                                                <td className="px-6 py-3 font-medium text-gray-700 border-b border-slate-400">
                                                    <Link
                                                        to={`/product/${item._id}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-3 text-gray-500 border-b border-slate-400">
                                                    ₩{item.price}
                                                </td>
                                                <td className="px-6 py-3 text-gray-500 border-b border-slate-400">
                                                    ₩
                                                    {(
                                                        item.price * item.qty
                                                    ).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>₩{cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>₩{cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>₩{cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>₩{cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && (
                                    <Message bg="border-red bg-red-200">
                                        {error}
                                    </Message>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <button
                                    type="button"
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                    className="py-2 px-4 float-right bg-green-500 text-white rounded-md"
                                >
                                    Place Order
                                </button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </section>
    );
};

export default PlaceOrderScreen;
