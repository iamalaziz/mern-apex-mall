import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Grandpa } from '../assets';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
    } else {
      dispatch(register(name, email, password));
    }
  };

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, userInfo } = useSelector(
    (state) => state.userRegister
  );
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  return (
    <section className="my-10 flex flex-col items-center justify-center gap-6 sm:flex-row w-[95%]">
      <div className="hidden sm:block w-[40%]">
        <img src={Grandpa} alt="grandpa with basket" className="drop-shadow-2xl" />
      </div>
      <div className="w-[60%] max-w-[600px] sm:w-1/2 border rounded-xl px-6 py-4 shadow-xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-medium leading-9 tracking-tight text-gray-900">
            Create account
          </h2>
          {message && <Message>{message}</Message>}
          {error && <Message bg="border-red bg-red-200">{error}</Message>}
          {loading && <Loader />}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="name"
                className="block text-sm leading-6 text-gray-500"
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
                className="block w-full rounded-md border-0 py-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 pl-4"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm leading-6 text-gray-500"
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
                className="block w-full rounded-md border-0 py-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 pl-4"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm leading-6 text-gray-500"
                >
                  Password
                </label>
                <div className="text-sm">
                  <span
                    onClick={() => setShow(!show)}
                    className="font-semibold text-green-600 hover:text-green-500 cursor-pointer"
                  >
                    {show ? 'Hide?' : 'Show?'}
                  </span>
                </div>
              </div>
              <input
                id="password"
                name="password"
                type={show ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md py-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 pl-4"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm leading-6 text-gray-500"
                >
                  Confirm Password
                </label>
              </div>
              <input
                id="confirm-password"
                name="confirm-password"
                type={show ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 pl-4"
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-full bg-green-500 py-2 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            New Customer?{' '}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
              className="font-semibold leading-6 text-green-500 hover:text-green-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterScreen;
