import { NavLink } from 'react-router-dom';

const AuthButtons = ({ isUserAuthenticated, account, handleSignOut, activeStyle }) => {
  return (
    <>
      {isUserAuthenticated ? (
        <>
          <li className='hidden md:block text-black/60 list-none'>
            {account?.email}
          </li>
          <li className='hidden md:block list-none'>
            <NavLink
              to='/my-orders'
              className={({ isActive }) => (isActive ? activeStyle : undefined)}>
              My Orders
            </NavLink>
          </li>
          <li className='hidden md:block list-none'>
            <NavLink
              to='/my-account'
              className={({ isActive }) => (isActive ? activeStyle : undefined)}>
              My Account
            </NavLink>
          </li>
          <li className='hidden md:block list-none'>
            <button onClick={handleSignOut} className='hover:text-gray-500'>
              Sign Out
            </button>
          </li>
        </>
      ) : (
        null
      )}
    </>
  );
};

export default AuthButtons;