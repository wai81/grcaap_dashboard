import { Suspense } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const DailyOrders = ({ data, width, height, barSize }) => {

    //console.log(data)
    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart width={width} height={height} data={data}>
                {/* <BarChart data={data}> */}
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timeText" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey="count_orders" fill="lightblue" barSize={barSize} />
            </BarChart>
        </ResponsiveContainer>
    );
}


