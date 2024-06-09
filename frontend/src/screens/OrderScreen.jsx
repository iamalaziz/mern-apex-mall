import { useEffect } from 'react';
import { Col, Row, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import { PayPalButton } from 'react-paypal-button-v2';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from '../actions/orderActions';
import axios from 'axios';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants';

const OrderScreen = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.orderPay
  );
  const { success: successDeliver } = useSelector(
    (state) => state.orderDeliver
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: orderId } = useParams();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { userInfo } = useSelector((state) => state.userLogin);

  if (!loading) {
    const addDecimals = (n) => {
      return (Math.round(n * 100) / 100).toFixed(2);
    };
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, curr) => acc + +curr.qty * +curr.price, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    const loadPayPalScript = async () => {
      try {
        const { data } = await axios.get('/api/config/paypal');
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': data.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });

        // Wait for the PayPal script to load and then set the loading status to resolved
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${data.clientId}&currency=USD`;
        script.async = true;
        script.onload = () => {
          paypalDispatch({ type: 'setLoadingStatus', value: 'resolved' });
        };
        document.body.appendChild(script);
      } catch (error) {
        console.error('Error loading PayPal script:', error);
      }
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (order && !order.isPaid) {
      if (!window.paypal) {
        loadPayPalScript();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, orderId, successPay]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        console.log(details);
        dispatch(payOrder(orderId, details));
        // refetch();
        alert('Payment successful');
      } catch (err) {
        alert(err?.data?.message || err.error);
      }
    });
  }

  // TESTING ONLY! REMOVE BEFORE PRODUCTION
  // async function onApproveTest() {
  //   await payOrder({ orderId, details: { payer: {} } });
  //   // refetch();

  //   console.log('Order is paid');
  // }

  function onError(err) {
    window.alert(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }
  
  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message bg="border-red bg-red-200">{error}</Message>
  ) : (
    <section>
      <h2 className="text-green-500 break-after-column">
        Order {order._id.substring(0, 5)} {'>'}{' '}
        <span className="text-gray-800 italic">
          {order.isDelivered
            ? `Delivered at: ${order.deliveredAt}`
            : 'In Progress'}
        </span>
      </h2>
      <br />
      <hr />
      <br />
      <div>
        <div>
          <div>
            <div className="flex ">
              <h4 className="min-w-[100px]">Shipping</h4>
              <div className="flex flex-col gap-3">
                <p>
                  <span className="font-medium">Name: </span> {order.user.name}
                </p>
                <p>
                  <span className="font-medium">Email: </span>{' '}
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p className="max-w-[60%]">
                  <span className="font-medium">Address:</span>
                  {order.shippingAddress.address}, {order.shippingAddress.city}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message className="text-green-500 bg-transparent border border-green-500">
                    Delivered
                  </Message>
                ) : (
                  <Message>Not Delivered</Message>
                )}
              </div>
            </div>
            <div>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on {order.paidAt.substring(0, 10)}
                </Message>
              ) : (
                <Message bg="border-red bg-red-200">Not Paid</Message>
              )}
            </div>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty!</Message>
              ) : (
                <ListGroup variant="flush" className="mx-4">
                  {order.orderItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ₩{item.price} = ₩
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </div>
        </div>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₩{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₩{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₩{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₩{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      {/* <button
                        onClick={onApproveTest}
                        style={{ marginBottom: '10px' }}
                      >
                        Test Pay Order
                      </button> */}
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item className="d-grid">
                    <Button
                      type="button"
                      onClick={deliverHandler}
                      className="w-full btn btn-block"
                    >
                      Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </div>
    </section>
  );
};

export default OrderScreen;
