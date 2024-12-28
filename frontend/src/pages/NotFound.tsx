import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
            <p className="text-xl text-gray-700 mb-6">Page Not Found</p>
            <Link
                to="/"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
