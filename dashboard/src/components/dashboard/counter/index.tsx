import SlotCounter from "react-slot-counter"
import './styles.css'
import { Col, Row } from "antd";
import { useTranslate } from "@refinedev/core";

export const CounterOrders = ({ data }) => {
    const complet = 1000//data.map((c) => c.completed);
    if (!data || data.lenght === 0) {
        return <div style={{ textAlign: "center" }}>Загрузка...</div>; // Handle case where no data is passed 
    }
    const { count_orders, completed_orders, not_completed_orders } = data[0];
    const translate = useTranslate()
    return (
        <div className="counters">
            <div className="number">
                <div className="counter" style={{ color: "red" }}>
                    <SlotCounter value={count_orders}
                        animateOnVisible={{ triggerOnce: false, rootMargin: '0px 0px -100px 0px' }}

                    />
                </div>
                <span className="label">{translate("dashboard.counter.all_orders")}</span>
            </div>
            <div className="number">
                <div className="counter" style={{ color: "#41b4f2" }}>
                    <SlotCounter value={not_completed_orders}
                        animateOnVisible={{ triggerOnce: false, rootMargin: '0px 0px -100px 0px' }}
                    />
                </div>
                <span className="label">{translate("dashboard.counter.in_work")}</span>
            </div>
            <div className="number">
                <div className="counter" style={{ color: "#82ca9d" }}>
                    <SlotCounter value={completed_orders}
                        animateOnVisible={{ triggerOnce: false, rootMargin: '0px 0px -100px 0px' }}
                    />
                </div>
                <span className="label">{translate("dashboard.counter.completed")}</span>
            </div>

        </div>
    )
}