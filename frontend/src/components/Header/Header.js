import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const Header = ({ user }) => {
    const handleLogout = async () => {
        try {
            await signOut(auth);
            // Redirect or update user state after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <header className="bg-blue-500 p-4 flex justify-between items-center">
            <div className="flex items-center">
                <Link to="/" className="text-white text-lg font-semibold">
                    IoT Threat Analysis
                </Link>
            </div>
            <nav className="flex space-x-4">
                <NavLink
                    to="/dashboard"
                    activeClassName="text-white"
                    className="text-gray-300 hover:text-white"
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/devices"
                    activeClassName="text-white"
                    className="text-gray-300 hover:text-white"
                >
                    Devices
                </NavLink>
                <NavLink
                    to="/settings"
                    activeClassName="text-white"
                    className="text-gray-300 hover:text-white"
                >
                    Settings
                </NavLink>
                {user ? (
                    <>
                        <span className="text-gray-300">Hello, {user.email}</span>
                        <button
                            onClick={handleLogout}
                            className="text-gray-300 hover:text-white"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <NavLink
                        to="/login"
                        activeClassName="text-white"
                        className="text-gray-300 hover:text-white"
                    >
                        Login
                    </NavLink>
                )}
            </nav>
        </header>
    );
};

export default Header;
