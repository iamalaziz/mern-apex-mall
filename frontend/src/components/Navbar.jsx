import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// components
import SVG from './SVG';
// icons
import { Bg } from '../assets';

export default function Navbar() {
    const { userInfo } = useSelector((state) => state.userLogin);
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
                {userInfo.isAdmin && (
                    <>
                        <NavLink
                            to="/admin/userlist"
                            className={({ isActive }) =>
                                `${
                                    isActive
                                        ? 'text-green-500'
                                        : 'text-slate-100'
                                } flex items-center gap-1`
                            }
                            style={({ isActive }) => {
                                return isActive ? { color: 'green' } : {};
                            }}
                        >
                            Users
                            <SVG item="chevron-down" />
                        </NavLink>
                        <NavLink
                            to="/admin/productlist"
                            className={({ isActive }) =>
                                `${
                                    isActive
                                        ? 'text-green-500'
                                        : 'text-slate-100'
                                } flex items-center gap-1`
                            }
                            style={({ isActive }) => {
                                return isActive ? { color: 'green' } : {};
                            }}
                        >
                            Products
                            <SVG item="chevron-down" />
                        </NavLink>
                        <NavLink
                            to="/admin/orderlist"
                            className={({ isActive }) =>
                                `${
                                    isActive
                                        ? 'text-green-500'
                                        : 'text-slate-100'
                                } flex items-center gap-1`
                            }
                            style={({ isActive }) => {
                                return isActive ? { color: 'green' } : {};
                            }}
                        >
                            Orders
                            <SVG item="chevron-down" />
                        </NavLink>
                    </>
                )}
            </nav>
        </div>
    );
}
