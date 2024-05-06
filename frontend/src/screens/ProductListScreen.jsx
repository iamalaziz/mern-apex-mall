import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';

import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = () => {
  // const pageNumber = match.params.pageNumber || 1;
  // const pageNumber = 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(
    (state) => state.productList
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.productDelete);

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = useSelector((state) => state.productCreate);

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
    dispatch(listProducts());
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <section className="max-w-[95%] mb-10">
      <div className="flex items-center justify-between my-6 w-full">
        <h2 className="text-xl text-center font-medium">Products</h2>
        <button
          className="p-2 rounded-xl text-white bg-green-500"
          onClick={createProductHandler}
        >
          <i className="fas fa-plus"></i> Create Product
        </button>
      </div>
      {loadingDelete && <Loader />}
      {errorDelete && (
        <Message bg="border-red bg-red-200">{errorDelete}</Message>
      )}
      {loadingCreate && <Loader />}
      {errorCreate && (
        <Message bg="border-red bg-red-200">{errorCreate}</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <table className="border border-separate rounded-xl border-slate-400">
            <thead className="uppercase bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 font-normal text-gray-500 rounded-tl border-b border-slate-400">
                  ID
                </th>
                <th className="px-6 py-3 line-clamp-1 font-normal text-gray-700 border-b border-slate-400">
                  NAME
                </th>
                <th className="px-6 py-3 font-normal text-gray-700 border-b border-slate-400">
                  PRICE
                </th>
                <th className="px-6 py-3 font-normal text-gray-700 border-b border-slate-400">
                  CATEGORY
                </th>
                <th className="px-6 py-3 font-normal text-gray-700 border-b border-slate-400">
                  BRAND
                </th>
                <th className="border-b border-slate-400"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-3 border-b border-slate-400">
                    {product._id}
                  </td>
                  <td className="px-6 py-3 border-b border-slate-400">
                    {product.name}
                  </td>
                  <td className="px-6 py-3 border-b border-slate-400">
                    ₩{product.price}
                  </td>
                  <td className="px-6 py-3 border-b border-slate-400">
                    {product.category}
                  </td>
                  <td className="px-6 py-3 border-b border-slate-400">
                    {product.brand}
                  </td>
                  <td className="px-6 py-3 border-b border-slate-400">
                    <div className="flex gap-2">
                      <NavLink to={`/admin/product/${product._id}/edit`}>
                        <button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </button>
                      </NavLink>
                      <button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
};

export default ProductListScreen;
