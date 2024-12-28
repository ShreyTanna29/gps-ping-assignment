import React from 'react';

interface Coordinate {
    lat: number;
    long: number;
    _id: string;
}

interface UserData {
    _id: string;
    email: string;
    cordinates: Coordinate[];
    createdAt: string;
    updatedAt: string;
}

interface AdminPanelProps {
    data: UserData[];
    onRefresh: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ data, onRefresh }) => {
    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Admin Panel</h1>
                <button
                    onClick={onRefresh}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                </button>
            </div>
            <div className="grid gap-6">
                {data.map((user) => (
                    <div key={user._id} className="bg-white shadow rounded-lg p-4 border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">User: {user.email}</h2>
                        <p className="text-gray-600">
                            <span className="font-medium">Created At:</span>{' '}
                            {new Date(user.createdAt).toLocaleString()}
                        </p>
                        <p className="text-gray-600 mb-4">
                            <span className="font-medium">Updated At:</span>{' '}
                            {new Date(user.updatedAt).toLocaleString()}
                        </p>
                        <h3 className="text-lg font-medium mb-2">Coordinates:</h3>
                        <div className="max-h-40 overflow-auto border-t border-gray-300">
                            {user.cordinates.map((coordinate) => (
                                <div
                                    key={coordinate._id}
                                    className="py-2 px-4 hover:bg-gray-50 flex justify-between items-center"
                                >
                                    <p className="text-gray-700">
                                        <span className="font-medium">Latitude:</span> {coordinate.lat}, <span className="font-medium">Longitude:</span>{' '}
                                        {coordinate.long}
                                    </p>
                                    <span className="text-xs text-gray-500">ID: {coordinate._id}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;
