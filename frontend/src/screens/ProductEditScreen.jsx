import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const [uploading, setUploading] = useState(false);

  const ProductCategoryEnum = [
    'Electronics',
    'Clothing',
    'Books',
    'Fresh Fruit',
    'Vegetables',
    'Beauty & Health',
    'Sports',
    'Bread & Bakery',
    'Meat & Fish',
    'Others',
  ];

  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.productUpdate);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setSalePrice(product.salePrice);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate, productId, successUpdate, product._id]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data.image);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
        salePrice
      })
    );
  };

  return (
    <div>
      <Link to="/admin/productlist" className="p-2 border border-slate-400 rounded-xl mb-4">Go Back</Link>
      <h2 className="text-xl text-center font-medium my-6">Edit Product</h2>
      {loadingUpdate && <Loader />}
      {errorUpdate && (
        <Message bg="border-red bg-red-200">{errorUpdate}</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message bg="border-red bg-red-200">{error}</Message>
      ) : (
        <form onSubmit={submitHandler} className="w-full flex flex-col gap-4 mb-10">
          <div className="flex justify-between items-center">
            <label htmlFor="title">Product Title</label>
            <input
              type="title"
              placeholder="Enter title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="ml-auto border rounded-md p-2 w-[350px]"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border rounded-md p-2 w-[350px]"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="salePrice">Sale Price</label>
            <input
              type="number"
              placeholder="Enter price"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="border rounded-md p-2 w-[350px]"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="image-url">Image</label>
            <div>
              <input
                type="text"
                id="image-url"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="border rounded-md p-2 w-[350px]"
                required
              />
            </div>
            {uploading && <Loader />}
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="image"></label>
            <input
              type="file"
              id="image-file"
              label="Choose File"
              onChange={uploadFileHandler}
            />
            {uploading && <Loader />}
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="border rounded-md p-2 w-[350px]"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="countInStock">Count In Stock</label>
            <input
              type="number"
              placeholder="Enter countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              className="border rounded-md p-2 w-[350px]"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-md p-2 w-[350px]"
            >
              {ProductCategoryEnum.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-md p-2 w-[350px]"
            />
          </div>

          <button
            type="submit"
            className="ml-auto py-2 px-4 bg-green-400 rounded-full text-white"
          >
            Save Product
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductEditScreen;
