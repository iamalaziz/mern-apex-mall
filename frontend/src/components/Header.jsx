import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { useNavigate, NavLink } from 'react-router-dom';

// components
import SearchBox from './SearchBox';
import Navbar from './Navbar';
// icons
import { Address, Cart, Like, Plant, User } from '../assets/index';

const Header = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }
  return (
    <header>
      <div className="top text-sm border-b-[1px] border-gray-300 w-full text-gray-500">
        <div className="flex justify-between w-full max-w-[95%] py-3 mx-auto">
          <div className="flex">
            <img src={Address} alt="address pin" />
            <div className="ml-2 overflow-hidden">
              Store Location: 67, Gaya 366, Busan, South Korea
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select id="language">
              <option value="english">En</option>
              <option value="Korean">Kr</option>
            </select>
            <select id="currency">
              <option value="dollar">USD</option>
              <option value="won">WON</option>
            </select>
            {userInfo ? (
              <button
                onClick={handleLogout}
                className="hover:text-gray-900 cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <>
                <div className="h-[20px] bg-gray-400 w-[1px]"></div>
                <NavLink to="/login">
                  <span className="hover:text-gray-900 cursor-pointer">
                    Sign In
                  </span>
                </NavLink>
                /
                <NavLink to="/register">
                  <span className="hover:text-gray-900 cursor-pointer">
                    Sign Up
                  </span>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="navbar py-3 flex items-center justify-between w-full max-w-[95%] mx-auto">
        <NavLink to="/">
          <div className="logo flex items-center">
            <span className="mr-2">
              <img src={Plant} alt="plant icon" />
            </span>
            <h1 className="text-xl">
              <span className="font-medium">Eco</span>
              <span className="font-extralight">bazar</span>
            </h1>
          </div>
        </NavLink>
        <div className="search">
          <SearchBox />
        </div>
        <nav className="flex items-center gap-2">
          <NavLink to="/favorites">
            <img src={Like} alt="Like button" />
          </NavLink>
          <div className="h-[30px] bg-gray-400 w-[1px]"></div>
          <NavLink to="/cart">
            <img src={Cart} alt="Cart button" />
          </NavLink>
          <NavLink to="/profile/settings">
            <img src={User} alt="user" />
          </NavLink>
        </nav>
      </div>
      <Navbar />
      {/* 
      {userInfo && userInfo.isAdmin && (
        <NavDropdown title="Admin" id="adminmenu">
          <LinkContainer to="/admin/userlist">
            <NavDropdown.Item>Users</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/admin/productlist">
            <NavDropdown.Item>Products</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/admin/orderlist">
            <NavDropdown.Item>Orders</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
      )} */}
    </header>
  );
};

export default Header;
