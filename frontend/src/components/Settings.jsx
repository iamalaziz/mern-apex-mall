import React, { useState, useRef, useTransition } from 'react';
import { Table, Form, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, NavLink, useLocation, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import axios from 'axios';

// components
import Message from '../components/Message';
import Loader from '../components/Loader';
import SVG from '../components/SVG';
import { listMyOrders } from '../actions/orderActions';

// icons
import { ProfileImage } from '../assets';

const Settings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [image, setImage] = useState(null);
  const profileImageRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  // console.log(image);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.updateProfile);
  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
  } = useSelector((state) => state.orderMyList);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
        setImage(user.profileImage);
      }
    }
  }, [dispatch, userInfo, navigate, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password, profileImage: image }));
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    // console.log(file)
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      console.log(formData)
      const { data } = await axios.post('/api/upload', formData, config);
      console.log(data)
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  return (
    <div>
      {message && <Message>{message}</Message>}
      {error && (
        <Message bg="bg-red-200 border border-red-500">{error}</Message>
      )}
      {success && (
        <Message bg="bg-green-200 border border-green-600">
          Profile Updated!
        </Message>
      )}
      {loading && <Loader />}
      <div className="border border-slate-400 rounded-lg">
        <h2 className="px-6 py-3 border-b border-slate-400">
          Account Settings
        </h2>
        <div className="flex">
          <form onSubmit={handleSubmit} className="space-y-3 p-8">
            <div>
              <label
                htmlFor="name"
                className="block text-sm leading-6 text-gray-800"
              >
                Username
              </label>
              <input
                id="name"
                type="text"
                name="email"
                autoComplete="username"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 outline-none text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 pl-4"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm leading-6 text-gray-800"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 outline-none text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 pl-4"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm leading-6 text-gray-800"
                >
                  Password
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="text"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md py-1.5 outline-none text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 pl-4"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm leading-6 text-gray-800"
                >
                  Confirm Password
                </label>
              </div>
              <input
                id="confirm-password"
                name="confirm-password"
                type="text"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 pl-4"
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex px-4 justify-center rounded-full bg-green-600 py-2 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
              >
                Save Changes
              </button>
            </div>
            <div>
              {uploading && <Loader />}
              {image ? (
                <img src={image} width="250px" alt="profileImage" />
              ) : (
                <img src={ProfileImage} width="250px" alt="profileImage" />
              )}
              {/* <input
                type="file"
                placeholder='Enter Image Url'
                // ref={profileImageRef}
                value={image}
                className="placeholder:bg-green-600"
                onChange={(e) => setImage(e.target.files[0])}
              /> */}
              <input
                type="file"
                id="image-file"
                label="Choose Profile Image"
                onChange={uploadFileHandler}
              />
            </div>
          </form>
        </div>
      </div>
      <Row>
        <Col md={9}>
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Settings;
