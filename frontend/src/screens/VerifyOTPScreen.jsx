import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { verifyEmail } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyOTPScreen = () => {
  const [code, setCode] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.userRegister);
  const { userLoginInfo } = useSelector((state) => state.userLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo._id, code);
    dispatch(verifyEmail(userInfo._id, code, userInfo.email, userInfo.name));
  };

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userLoginInfo) {
      navigate('/');
    }
  }, [userLoginInfo, navigate]);

  return (
    <div>
      <h1>Verify Your Email</h1>
      <p>
        We have sent an email with 6-digit code which expires in 1 hour. Please
        confirm your email to check if the email provided is valid and really
        belongs to you. These actions are taken to avoid robots to viloate too.
      </p>
      <Form onSubmit={handleSubmit} inline="true" className="d-flex w-100">
        <Form.Group controlId="name">
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mx-3">
          Confirm
        </Button>
      </Form>
    </div>
  );
};

export default VerifyOTPScreen;
