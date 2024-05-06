// icons

import { NavLink } from 'react-router-dom';

// components
import SVG from './SVG';
import { Bg } from '../assets';

export default function Navbar() {
  return (
    <div
      className="w-full bg-cover mb-6"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <nav className="w-[95%] mx-auto flex items-center gap-4 p-6 text-white">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive ? 'text-green-500' : 'text-slate-100'
            } flex items-center gap-1`
          }
          style={({ isActive }) => {
            return isActive ? { color: 'green' } : {};
          }}
        >
          Home
          <SVG item="chevron-down" />
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `${
              isActive ? 'text-green-500' : 'text-slate-100'
            } flex items-center gap-1`
          }
          style={({ isActive }) => {
            return isActive ? { color: 'green' } : {};
          }}
        >
          Products
          <SVG item="chevron-down" />
        </NavLink>
      </nav>
    </div>
  );
}
