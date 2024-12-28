import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const PingLogger: React.FC = () => {
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const email = localStorage.getItem("email")
        const interval = setInterval(() => {
            console.log(email);

            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                const log = `Lat: ${latitude}, Lng: ${longitude}`;
                setLogs((prev) => [...prev, log]);
                await API.post('/ping', { latitude, longitude, email });
            });
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Ping Logs</h2>
            <ul className="space-y-2">
                {logs.map((log, index) => (
                    <li key={index} className="text-gray-700">
                        {log}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PingLogger;
