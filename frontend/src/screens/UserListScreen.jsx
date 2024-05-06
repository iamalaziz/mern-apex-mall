import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';
import { NavLink, useNavigate } from 'react-router-dom';

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, users } = useSelector((state) => state.userList);
  const { userInfo } = useSelector((state) => state.userLogin);

  const { success: successDelete } = useSelector((state) => state.userDelete);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <section className="max-w-[95%] mb-10">
      <h2 className="text-xl text-center font-medium mb-6">Users</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <table className="border border-separate rounded-xl border-slate-400">
          <thead className="uppercase bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 font-normal text-gray-500 rounded-tl border-b border-slate-400">
                ID
              </th>
              <th className="px-6 py-3 font-normal text-gray-500 rounded-tl border-b border-slate-400">
                NAME
              </th>
              <th className="px-6 py-3 font-normal text-gray-500 rounded-tl border-b border-slate-400">
                EMAIL
              </th>
              <th className="px-6 py-3 font-normal text-gray-500 rounded-tl border-b border-slate-400">
                ADMIN
              </th>
              <th className="px-6 py-3 font-normal text-gray-500 rounded-tl border-b border-slate-400"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-3 border-b border-slate-400">
                  {user._id}
                </td>
                <td className="px-6 py-3 border-b border-slate-400">
                  {user.name}
                </td>
                <td className="px-6 py-3 border-b border-slate-400">
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td className="px-6 py-3 border-b border-slate-400 text-center">
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td className="px-6 py-3 border-b border-slate-400">
                  <div className="flex gap-2">
                    <NavLink to={`/admin/user/${user._id}/edit`}>
                      <i className="fas fa-edit"></i>
                    </NavLink>
                    <button
                      className="text-red-500"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default UserListScreen;
