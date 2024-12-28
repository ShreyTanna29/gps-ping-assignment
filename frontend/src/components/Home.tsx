import React, { useEffect, useState } from 'react';
import PingLogger from './PingLogger';
import { useNavigate } from 'react-router-dom';
import AdminPanel from './Admin';
import API from '../api/axios';

const Home: React.FC = () => {
    const navigate = useNavigate()

    const fetchData = async () => {
        const res = await API.get("/admin/get-all-pings", {
            timeout: 30000,
        })
        setData(await res.data)
    }

    useEffect(() => {
        const email = localStorage.getItem("email")
        if (!email) {
            navigate("/login")
        } else {
            fetchData()
        }
    }, [navigate])

    const [data, setData] = useState([])

    const email = localStorage.getItem('email')
    return (
        <div className="container mx-auto p-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Welcome to PingApp
                </h1>
                <p className="text-gray-600 mb-6">
                    Your real-time GPS ping logging dashboard.
                </p>
                {email === "admin@admin" ? <AdminPanel data={data} onRefresh={fetchData} /> : <PingLogger />}

            </div>
        </div>
    );
};

export default Home;
