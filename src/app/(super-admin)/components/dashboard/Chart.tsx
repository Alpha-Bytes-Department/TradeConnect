// Fahim
// Recharts graph component must be a client component.

"use client";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend }
    from "recharts";

const chartData = [
    { date: "21 Dec", Logins: 186, NewBusinesses: 80 },
    { date: "22 Dec", Logins: 305, NewBusinesses: 200 },
    { date: "23 Dec", Logins: 237, NewBusinesses: 120 },
    { date: "24 Dec", Logins: 73, NewBusinesses: 190 },
    { date: "25 Dec", Logins: 209, NewBusinesses: 130 },
    { date: "26 Dec", Logins: 214, NewBusinesses: 140 },
    { date: "27 Dec", Logins: 219, NewBusinesses: 170 },
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
                    <Line type="monotone" dataKey="Logins" stroke="#3B82F6" />
                    <Line type="monotone" dataKey="NewBusinesses" stroke="#10B981" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}



