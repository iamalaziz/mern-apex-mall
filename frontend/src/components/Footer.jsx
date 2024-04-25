import React from 'react';
//
import { Link, NavLink } from 'react-router-dom';

// icons
import { Plant, ApplePay, Discover, Mastercard, Visa } from '../assets';

const Footer = () => {
  return (
    <footer className="w-full mt-10 py-8 bg-gray-900 text-gray-400">
      <div className="max-w-[1300px] w-[95%] mx-auto">
        <div className="flex flex-wrap gap-4 justify-between py-4 mb-4">
          <div className="flex flex-col gap-3">
            <NavLink to="/">
              <div className="logo flex items-center">
                <span className="mr-2">
                  <img src={Plant} alt="plant icon" />
                </span>
                <h1 className="text-xl text-white">
                  <span className="font-medium">Eco</span>
                  <span className="font-extralight">bazar</span>
                </h1>
              </div>
            </NavLink>
            <p className="">
              Phone:{' '}
              <span className="ml-2 text-white border-b-[2px] border-green-600">
                (+82) 10-3208-0203
              </span>
            </p>
            <p>
              Github:
              <Link
                to="https://github.com/iamalaziz"
                className="border-b-[2px] border-green-600 ml-2 text-white"
              >
                @iamalaziz
              </Link>
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-white">My Account</h3>
            <NavLink to="/profile" className="hover:text-white">
              My Account
            </NavLink>
            <NavLink to="/profile/order-history" className="hover:text-white">
              Order History
            </NavLink>
            <NavLink to="/profile/cart" className="hover:text-white">
              Shopping Cart
            </NavLink>
            <NavLink to="/favorites" className="hover:text-white">
              Wishlist
            </NavLink>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-white">Helps</h3>
            <NavLink className="hover:text-white">Contact</NavLink>
            <NavLink className="hover:text-white">Order History</NavLink>
            <NavLink className="hover:text-white">Faqs</NavLink>
            <NavLink className="hover:text-white">Terms & Condition</NavLink>
            <NavLink className="hover:text-white">Privacy Policy</NavLink>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-white">Categories</h3>
            <NavLink className="hover:text-white">Fruit & Vegetables</NavLink>
            <NavLink className="hover:text-white">Meat & Fish</NavLink>
            <NavLink className="hover:text-white">Bread & Bakery</NavLink>
            <NavLink className="hover:text-white">Beauty & Health</NavLink>
            <NavLink className="hover:text-white">Technologies</NavLink>
          </div>
        </div>
        <div className="flex justify-between items-center py-4 border-t border-slate-400 flex-col gap-2 md:flex-row">
          <p>Ecobazar eCommerce © 2024. All Rights Reserved</p>
          <ul className="flex items-center gap-2">
            <li className="p-3 border rounded-lg h-10 w-15 flex justify-center items-center">
              <img src={ApplePay} alt="applepay" />
            </li>
            <li className="p-3 border rounded-lg h-10 w-15 flex justify-center items-center">
              <img src={Visa} alt="Visa" />
            </li>
            <li className="p-3 border rounded-lg h-10 w-15 flex justify-center items-center">
              <img src={Discover} alt="DiscVer" />
            </li>
            <li className="p-3 border rounded-lg h-10 w-15 flex justify-center items-center">
              <img src={Mastercard} alt="Mastercard" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
