import React, { useState } from 'react';
import { Table, Form, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {
  useNavigate,
  NavLink,
  useLocation,
  Outlet,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserDetails, updateUserProfile } from '../actions/userActions';

// components
import Message from '../components/Message';
import Loader from '../components/Loader';
import SVG from '../components/SVG';
import { listMyOrders } from '../actions/orderActions';

const ProfileScreen = () => {
  const location = useLocation()
  const nav = [
    {
      route: 'settings',
      text: 'Account',
      icon: 'settings',
    },
    {
      route: 'order-history',
      text: 'Order History',
      icon: 'refresh',
    },
    {
      route: 'cart',
      text: 'Shopping Cart',
      icon: 'cartInNav',
    },
    {
      route: 'logout',
      text: 'Logout',
      icon: 'logout',
    },
  ];
  return (
    <>
      <section className="flex w-[95%] gap-6">
        <div className="side-nav h-[60vh] flex flex-col border rounded-lg border-slate-400">
          <h3 className="font-medium text-lg mb-2 p-4">Navigation</h3>
          <ul>
            {nav.map((route, index) => (
              <li key={index}>
                <NavLink
                  to={`/profile/${route.route}`}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? 'text-gray-800 bg-green-100 border-l-[4px] border-green-400 flex gap-2 items-center p-4'
                        : 'text-gray-500 flex gap-2 items-center p-4'
                    }`
                  }
                >
                  <SVG
                    item={route.icon}
                    style={{
                      fill:
                        location.pathname === `/profile/${route.route}`
                          ? '#3b3a3a'
                          : '#CCCCCC',
                      stroke:
                        location.pathname === `/profile/${route.route}`
                          ? '#3b3a3a'
                          : '#CCCCCC',

                    }}
                  />
                  {route.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default ProfileScreen;
