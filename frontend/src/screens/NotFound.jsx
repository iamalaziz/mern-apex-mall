import React from 'react';
import { NavLink } from 'react-router-dom';
// icons/images
import { NotFoundImage } from '../assets';

const NotFound = () => {
  return (
    <section className="mt-20 flex flex-col items-center">
      <img
        src={NotFoundImage}
        alt="not found illustration"
        className="w-1/2 mx-auto"
      />
      <h2 className="text-center">Oops! Page Not Found</h2>
      <p className="text-center text-gray-400">
        Current page you are in now is not a valid route.
      </p>
      <button className="px-6 py-2 bg-green-600 rounded-full text-white mt-2 hover:bg-green-700">
        <NavLink to="/">Back to Home</NavLink>
      </button>
    </section>
  );
};

export default NotFound;
