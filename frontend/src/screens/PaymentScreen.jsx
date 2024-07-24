import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = () => {
    const { shippingAddress } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!shippingAddress) navigate('/shipping');

    const [paymentMethod, setPaymentMethod] = useState('Paypal');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <section className="min-w-[95%] md:min-w-[60%]">
            <CheckoutSteps steps={[true, true, true, false]} />
            <form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col className="mx-3 my-4">
                        <Form.Check
                            type="radio"
                            label="PayPal or Credit Card"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        <Form.Check
                            type="radio"
                            label="Stripe"
                            id="Stripe"
                            name="paymentMethod"
                            value="Stripe"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <button
                    type="submit"
                    className="py-2 px-4 float-right bg-green-500 text-white rounded-md"
                >
                    Continue
                </button>
            </form>
        </section>
    );
};

export default PaymentScreen;
