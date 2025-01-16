import { Suspense } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import "./style.css";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label}`}</p>
                <p className="desc">{`Принято : ${payload[0].value}`}</p>
                <p className="desc">{`В работе : ${payload[1].value}`}</p>
                <p className="desc">{`Выполнено : ${payload[2].value}`}</p>

                {/* <p className="intro">{getIntroOfPage(label)}</p> */}
                {/* <p className="desc">Anything you want can be displayed here.</p> */}
            </div>
        );
    }

    return null;
};

export const StatusOrdersBarChart = ({ data, width, height }: any) => {

    //console.log(data)
    return (
        <ResponsiveContainer width="100%" height={height}>
            <ComposedChart width={width} height={height} data={data}>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timeText" />
                <YAxis />
                <Tooltip content={CustomTooltip} />
                <Line type="monotone" dataKey={"count_orders"} stroke="red" activeDot={{ r: 5 }} dot={{ r: 0 }} />
                <Area type="monotone" dataKey={"work"} fill="#41b4f2" stroke="#41b4f2" />
                <Area type="monotone" dataKey={"completed"} fill="#82ca9d" stroke="#82ca9d" />
            </ComposedChart>
        </ResponsiveContainer>
    );
}


