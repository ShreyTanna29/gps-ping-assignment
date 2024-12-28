import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('email');

    const handleLogout = () => {
        localStorage.removeItem('email');
        navigate('/login');
    };

    return (
        <nav className="bg-indigo-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-lg font-bold">
                    <Link to="/">PingApp</Link>
                </h1>
                <div>
                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="mr-4 hover:underline">
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-indigo-800 px-4 py-2 rounded-md hover:bg-indigo-700"
                            >
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
