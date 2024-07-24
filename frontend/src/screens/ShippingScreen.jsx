import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
    const { shippingAddress } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };

    return (
        <section className="min-w-[95%] md:min-w-[60%]">
            <CheckoutSteps steps={[true, true, false, false]} />
            {/* <h1 className="text-2xl font-semibold mb-6">Shipping</h1> */}
            <form
                onSubmit={submitHandler}
                className="space-y-6 min-w-[95%] lg:min-w-[60%] mt-4"
            >
                <div className="flex items-center justify-between">
                    <label htmlFor="address" className="mb-2">
                        Address
                    </label>
                    <input
                        id="address"
                        type="text"
                        placeholder="Enter Address"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                        className="border p-2 rounded-md"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <label htmlFor="city" className="mb-2">
                        City
                    </label>
                    <input
                        id="city"
                        type="text"
                        placeholder="Enter City"
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                        className="border p-2 rounded-md"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <label htmlFor="postalCode" className="mb-2">
                        Postal Code
                    </label>
                    <input
                        id="postalCode"
                        type="text"
                        placeholder="Enter Postal Code"
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="border p-2 rounded-md"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <label htmlFor="country" className="mb-2">
                        Country
                    </label>
                    <input
                        id="country"
                        type="text"
                        placeholder="Enter Country"
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                        className="border p-2 rounded-md"
                    />
                </div>

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

export default ShippingScreen;
