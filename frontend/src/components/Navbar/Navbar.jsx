import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const Navbar = ({ user }) => {
  const [nav, setNav] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect or update user state after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto py-4">
        <div className="flex justify-between items-center">
            <Link
               to="/"
               className="text-white text-lg font-semibold hover:text-[#00df9a]"
               >

                <h1 className="text-3xl font-bold text-[#00df9a]">REACT.</h1>
            </Link>
          
          <div className="hidden md:flex space-x-4">
            
            <nav className="flex space-x-4">
              <NavLink
                to="/dnslookup"
                activeClassName="text-[#00df9a]"
                className="text-gray-300 hover:text-[#00df9a]"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/deviceList"
                activeClassName="text-[#00df9a]"
                className="text-gray-300 hover:text-[#00df9a]"
              >
                Devices
              </NavLink>
              <NavLink
                to="/settings"
                activeClassName="text-[#00df9a]"
                className="text-gray-300 hover:text-[#00df9a]"
              >
                Settings
              </NavLink>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-300">Hello, {user.email}</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-[#00df9a]"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                activeClassName="text-[#00df9a]"
                className="text-gray-300 hover:text-[#00df9a]"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
