import { getDefaultFilter, useInfiniteList, useSelect } from "@refinedev/core";
import { ILineOrder, IOrganization } from "../../../interfaces";
import { List as AntdList, Skeleton, Tag, Typography } from "antd";
import { OrderStatus } from "../../order/status";
import { DateField } from "@refinedev/antd";
import { TagOutlined } from "@ant-design/icons";
import { DeptureStatus } from "../../order/departureStatus";

type Props = {
    height?: string;
};

export const CurrentOrders = ({ height = "550px" }: Props) => {

    const { data: orderList, isLoading, hasNextPage, fetchNextPage } = useInfiniteList<ILineOrder>({
        resource: "line_orders/in_line",
        sorters: [
            {
                field: "created_at",
                order: "desc",
            },
        ],
        pagination: {
            pageSize: 11,
            current: 1,
        },
    });

    const orders = orderList?.pages.flatMap((page) => page.data) || [];


    const { query: queryResult, } = useSelect<IOrganization>({
        resource: "organizations",
        optionLabel: "title",
        optionValue: "id",
        sorters: [{ field: "id", order: "asc" }],
        //defaultValue: getDefaultFilter("organization_id", filters, "in"),
        //defaultValue: getDefaultFilter("organization_id", filters, "eq"),
        pagination: {
            pageSize: 25,
        },
    });

    const organizations = queryResult?.data?.data || [];

    return (
        <div
            id="scrollableDiv"
            style={{
                display: "block",
                height: height,
                overflow: "auto",
            }}
        >
            <AntdList
                itemLayout="horizontal"
                dataSource={orders}
                renderItem={(item) => {
                    return (
                        <AntdList.Item>
                            <Skeleton
                                style={{ display: "flex", width: "100%" }}
                                avatar={false}
                                title={false}
                                paragraph={{ rows: 1, width: "100%" }}
                                loading={isLoading}
                                active
                            >
                                <OrderStatus status={item.is_completed} />
                                <Tag color="orange" icon={<TagOutlined />}>
                                    {item.row_num}
                                </Tag>
                                <DeptureStatus status={item.departure} />
                                <Typography.Text strong>
                                    {item.order_number}
                                </Typography.Text>

                                <Typography.Text >
                                    {(() => {
                                        const organization = organizations.find(
                                            (org: any) => org?.id === item?.organization_id,
                                        );
                                        return (organization?.title || "-")
                                    })()}
                                </Typography.Text>

                                <DateField value={item.created_at} format="DD.MM.YYYY HH:mm" />


                            </Skeleton>
                        </AntdList.Item>
                    )
                }}
            />
        </div>
    );
};