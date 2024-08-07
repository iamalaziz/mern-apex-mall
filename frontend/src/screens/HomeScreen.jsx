import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { useParams } from 'react-router-dom';

// components
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const { keyword } = useParams();

    const { loading, products, error } = useSelector(
        (state) => state.productList,
    );

    useEffect(() => {
        dispatch(listProducts(keyword));
    }, [dispatch, keyword]);

    return (
        <div className="relative w-full mx-auto pt-8 pb-10">
            <div className="absolute bg-gray-100 w-[120%] top-0 bottom-0 -z-20"></div>
            <h2 className="font-medium text-2x text-center my-10">
                Latest Products
            </h2>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message bg="border-red bg-red-200">{error}</Message>
            ) : (
                <div className="grid grid-cols-1 gap-1 w-full mx-auto max-w-[80%] md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => {
                        return (
                            <div key={product._id}>
                                <Product product={product} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default HomeScreen;
