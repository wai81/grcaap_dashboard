import { MarkdownField, Show, TextField } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Input, Row, Tag, Typography } from "antd";
import { OrderStatus } from "../../components/order/status";
import { ILineOrder } from "../../interfaces";
import { TagOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export const OrderShow = () => {
    const { query: { data, isLoading }, } = useShow<ILineOrder>();

    const order = data?.data

    const { data: organizationData, isLoading: organizationIsLoading } = useOne({
        resource: "organizations",
        id: order?.organization_id || "",
        queryOptions: {
            enabled: !!data?.data,
        },
    });

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    const statusOrder = order?.is_completed

    return (
        <Show>
            {/* <Typography.Title level={5}>Id</Typography.Title>
            <TextField value={data?.data?.id} /> */}

            <Typography.Title level={5}>Номер заказа</Typography.Title>
            <TextField value={data?.data?.order_number} />
            {statusOrder ? (
                <OrderStatus status={statusOrder} />
            ) : (
                <Row>
                    <OrderStatus status={statusOrder} />
                    <Tag color="orange" icon={<TagOutlined />}>
                        {data?.data?.row_num}
                    </Tag>
                </Row>

                // <OrderStatus status={statusOrder} />
            )}


            <Typography.Title level={5}>Дата заказа</Typography.Title>
            <TextField value={dayjs(order?.order_create_date).format("DD.MM.YYYY")} />

            <Typography.Title level={5}>Телефон</Typography.Title>
            <MarkdownField value={order?.costumer_contact_phone} />

            <Typography.Title level={5}>ТОР</Typography.Title>
            <TextField
                value={organizationIsLoading ? "Загрузка..." : organizationData?.data?.title}
            />

            <Typography.Title level={5}>Создан</Typography.Title>
            <TextField value={dayjs(order?.created_at).format("DD.MM.YYYY HH:mm")} />
        </Show>);
};