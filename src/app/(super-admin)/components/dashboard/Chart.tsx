// Fahim
// Recharts graph component must be a client component.

"use client";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend }
    from "recharts";

const chartData = [
    { date: "21 Dec", logins: 186, newBusinesses: 80 },
    { date: "22 Dec", logins: 305, newBusinesses: 200 },
    { date: "23 Dec", logins: 237, newBusinesses: 120 },
    { date: "24 Dec", logins: 73, newBusinesses: 190 },
    { date: "25 Dec", logins: 209, newBusinesses: 130 },
    { date: "26 Dec", logins: 214, newBusinesses: 140 },
    { date: "27 Dec", logins: 219, newBusinesses: 170 },
];

export default function Chart() {
    return (
        <div className="max-w-[1600px] mx-auto h-[450px] border bg-white rounded-lg p-6">
            <h1 className="font-poppins font-medium text-[#313131] mb-2">User Activity Over Time</h1>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="logins" stroke="#3B82F6" />
                    <Line type="monotone" dataKey="newBusinesses" stroke="#10B981" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}



