import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import { useParams } from 'react-router-dom';

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.userUpdate);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, navigate, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <section className="max-w-[95%] mb-10">
      <Link
        to="/admin/userlist"
        className="p-2 border border-slate-400 rounded-xl mb-4"
      >
        Go Back
      </Link>
      <h2 className="text-xl text-center font-medium my-6">Edit User</h2>
      <div className="w-full flex flex-col gap-4 mb-10">
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <form
            onSubmit={submitHandler}
            className="w-full flex flex-col gap-4 mb-10"
          >
            <div className="flex justify-between items-center gap-4">
              <label htmlFor="name">Name</label>
              <input
                type="name"
                placeholder="Enter name"
                value={name}
                id="name"
                onChange={(e) => setName(e.target.value)}
                className="ml-auto border rounded-md p-2 w-[350px]"
                autoComplete="off"
              />
            </div>

            <div className="flex justify-between items-center">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                className="ml-auto border rounded-md p-2 w-[350px]"
              />
            </div>

            <div className="my-4">
              <input
                type="checkbox"
                label="Is Admin"
                id="isAdmin"
                autoComplete="off"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className='mr-4'
              />
              <label htmlFor="isAdmin">Is this user an <strong>admin</strong>?</label>
            </div>

            <button
              type="submit"
              className="ml-auto py-2 px-4 bg-green-500 rounded-full text-white"
            >
              Update
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default UserEditScreen;
