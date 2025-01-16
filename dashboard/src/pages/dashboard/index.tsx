import { useApiUrl, useCustom, useTranslation } from "@refinedev/core";
import { Button, Card, Col, Dropdown, Row, type MenuProps } from "antd";
import { useMemo, useState } from "react";
import dayjs from "dayjs";

import { DownOutlined } from "@ant-design/icons";
import { List } from "@refinedev/antd";
import { Map } from "../../components/map";
import { StatusOrdersBarChart } from "../../components/dashboard/statusOrders";
import { CounterOrders } from "../../components/dashboard/counter";
import { CurrentOrders } from "../../components/dashboard/currentOrders";

type DateFilter = "lastWeek" | "lastMonth" | "last3Month" | "last6Month" | "last9Month" | "lastYear";

const DATE_FILTERS: Record<
    DateFilter,
    {
        text: string;
        value: DateFilter;
    }
> = {
    lastWeek: {
        text: "lastWeek",
        value: "lastWeek",
    },
    lastMonth: {
        text: "lastMonth",
        value: "lastMonth",
    },
    last3Month: {
        text: "last3Month",
        value: "last3Month",
    },
    last6Month: {
        text: "last6Month",
        value: "last6Month",
    },
    last9Month: {
        text: "last9Month",
        value: "last9Month",
    },
    lastYear: {
        text: "lastYear",
        value: "lastYear",
    },
};

export const DashboardPage: React.FC = () => {
    const API_URL = useApiUrl();
    const { translate } = useTranslation();

    const [selecetedDateFilter, setSelectedDateFilter] = useState<DateFilter>(
        DATE_FILTERS.lastWeek.value,
    );

    const dateFilters: MenuProps["items"] = useMemo(() => {
        const filters = Object.keys(DATE_FILTERS) as DateFilter[];

        return filters.map((filter) => {
            return {
                key: DATE_FILTERS[filter].value,
                label: translate(`dashboard.filter.date.${DATE_FILTERS[filter].text}`), //DATE_FILTERS[filter].text,//t(`dashboard.filter.date.${DATE_FILTERS[filter].text}`),
                onClick: () => {
                    setSelectedDateFilter(DATE_FILTERS[filter].value);
                },
            };
        });
    }, []);

    const dateFilterQuery = useMemo(() => {
        const now = dayjs();
        switch (selecetedDateFilter) {
            case "lastWeek":
                return {
                    start: now.subtract(6, "days").startOf("day").format('YYYY-MM-DD HH:mm:ss'),
                    end: now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                };
            case "lastMonth":
                return {
                    start: now.subtract(1, "month").startOf("day").format('YYYY-MM-DD HH:mm:ss'),
                    end: now.endOf("day").format(),
                };
            case "last3Month":
                return {
                    start: now.subtract(3, "month").startOf("day").format('YYYY-MM-DD HH:mm:ss'),
                    end: now.endOf("day").format(),
                };
            case "last6Month":
                return {
                    start: now.subtract(6, "month").startOf("day").format('YYYY-MM-DD HH:mm:ss'),
                    end: now.endOf("day").format(),
                };
            case "last9Month":
                return {
                    start: now.subtract(9, "month").startOf("day").format('YYYY-MM-DD HH:mm:ss'),
                    end: now.endOf("day").format(),
                };
            case "lastYear":
                return {
                    start: now.subtract(12, "month").startOf("day").format('YYYY-MM-DD HH:mm:ss'),
                    end: now.endOf("day").format(),
                };
            default:
                return {
                    start: now.subtract(7, "days").startOf("day").format('YYYY-MM-DD HH:mm:ss'),
                    end: now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                };
        }
    }, [selecetedDateFilter]);

    const now = dayjs();

    const { data: dailyOrdersAllData } = useCustom({
        // url: `${API_URL}/dashboard/ordercount`,
        url: `${API_URL}/dashboard/ordercount_by_status_by_date`,
        method: "get",
        config: {
            filters: [
                // {
                //     field: "organization_id__in",
                //     operator: "eq",
                //     value: "400"
                // },
                {
                    field: "order_create_date_gte",
                    operator: "eq",
                    value: dateFilterQuery.start,//now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: dateFilterQuery.end//now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });

    const { data: counterOrdersAllData } = useCustom({

        // url: `${API_URL}/dashboard/ordercount`,
        url: `${API_URL}/dashboard/ordercount_by_status`,
        method: "get",
        config: {
            filters: [
                {
                    field: "order_create_date",
                    operator: "gte",
                    value: dateFilterQuery.start,//now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: dateFilterQuery.end//now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });

    const { data: orders400Data } = useCustom({
        url: `${API_URL}/dashboard/ordercount_by_status_by_date`,
        method: "get",
        config: {
            filters: [
                {
                    field: "organization_id__in",
                    operator: "eq",
                    value: "400,401"
                },
                {
                    field: "order_create_date_gte",
                    operator: "eq",
                    value: dateFilterQuery.start,//now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: dateFilterQuery.end,//now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });

    const { data: couterOrders400Data } = useCustom({

        url: `${API_URL}/dashboard/ordercount_by_status`,
        method: "get",
        config: {
            filters: [
                {
                    field: "organization_id__in",
                    operator: "eq",
                    value: "400,401"
                },
                {
                    field: "order_create_date_gte",
                    operator: "eq",
                    value: dateFilterQuery.start,//now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: dateFilterQuery.end//now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });

    const { data: orders410Data } = useCustom({

        url: `${API_URL}/dashboard/ordercount_by_status_by_date`,
        method: "get",
        config: {
            filters: [
                {
                    field: "organization_id__in",
                    operator: "eq",
                    value: "410,411,412,413"
                },
                {
                    field: "order_create_date_gte",
                    operator: "eq",
                    value: dateFilterQuery.start,//now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: dateFilterQuery.end,//now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });

    const { data: couterOrders410Data } = useCustom({

        url: `${API_URL}/dashboard/ordercount_by_status`,
        method: "get",
        config: {
            filters: [
                {
                    field: "organization_id__in",
                    operator: "eq",
                    value: "410,411,412,413"
                },
                {
                    field: "order_create_date_gte",
                    operator: "eq",
                    value: dateFilterQuery.start,//now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: dateFilterQuery.end//now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });

    const { data: orders420Data } = useCustom({

        url: `${API_URL}/dashboard/ordercount_by_status_by_date`,
        method: "get",
        config: {
            filters: [
                {
                    field: "organization_id__in",
                    operator: "eq",
                    value: "420,421,422"
                },
                {
                    field: "order_create_date_gte",
                    operator: "eq",
                    value: dateFilterQuery.start//now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: dateFilterQuery.end,//now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });


    const { data: couterOrders420Data } = useCustom({

        url: `${API_URL}/dashboard/ordercount_by_status`,
        method: "get",
        config: {
            filters: [
                {
                    field: "organization_id__in",
                    operator: "eq",
                    value: "420,421,422"
                },
                {
                    field: "order_create_date_gte",
                    operator: "eq",
                    value: dateFilterQuery.start,//now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: dateFilterQuery.end//now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });

    const { data: orders430Data } = useCustom({

        url: `${API_URL}/dashboard/ordercount_by_status_by_date`,
        method: "get",
        config: {
            filters: [
                {
                    field: "organization_id__in",
                    operator: "eq",
                    value: "430,431"
                },
                {
                    field: "order_create_date_gte",
                    operator: "eq",
                    value: dateFilterQuery.start,//now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: dateFilterQuery.end,//now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });

    const { data: couterOrders430Data } = useCustom({

        url: `${API_URL}/dashboard/ordercount_by_status`,
        method: "get",
        config: {
            filters: [
                {
                    field: "organization_id__in",
                    operator: "eq",
                    value: "430,431"
                },
                {
                    field: "order_create_date_gte",
                    operator: "eq",
                    value: dateFilterQuery.start,//now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: dateFilterQuery.end//now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });

    const { data: couterOrders440Data } = useCustom({

        url: `${API_URL}/dashboard/ordercount_by_status`,
        method: "get",
        config: {
            filters: [
                {
                    field: "organization_id__in",
                    operator: "eq",
                    value: "440,441,442,443"
                },
                {
                    field: "order_create_date_gte",
                    operator: "eq",
                    value: dateFilterQuery.start,//now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: dateFilterQuery.end//now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });

    const { data: orders440Data } = useCustom({
        url: `${API_URL}/dashboard/ordercount_by_status_by_date`,
        method: "get",
        config: {
            filters: [
                {
                    field: "organization_id__in",
                    operator: "eq",
                    value: "440,441,442,443"
                },
                {
                    field: "order_create_date_gte",
                    operator: "eq",
                    value: dateFilterQuery.start,//now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: dateFilterQuery.end,//now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });

    const { data: couterOrders450Data } = useCustom({
        url: `${API_URL}/dashboard/ordercount_by_status`,
        method: "get",
        config: {
            filters: [
                {
                    field: "organization_id__in",
                    operator: "eq",
                    value: "450,451,452"
                },
                {
                    field: "order_create_date_gte",
                    operator: "eq",
                    value: dateFilterQuery.start,//now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: dateFilterQuery.end//now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });

    const { data: orders450Data } = useCustom({

        url: `${API_URL}/dashboard/ordercount_by_status_by_date`,
        method: "get",
        config: {
            filters: [
                {
                    field: "organization_id__in",
                    operator: "eq",
                    value: "450,451,452"
                },
                {
                    field: "order_create_date_gte",
                    operator: "eq",
                    value: dateFilterQuery.start,//now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: dateFilterQuery.end,//now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });
    const ordersCounterAll = useMemo(() => {
        const data = counterOrdersAllData?.data;
        if (!data) return [];
        const plotData = data.map((order) => {
            return {
                completed_orders: order.completed_orders,
                not_completed_orders: order.not_completed_orders,
                count_orders: order.count_orders,
            };
        });

        return {
            data: plotData,
        };
    }, [counterOrdersAllData]);

    const ordersCounter400 = useMemo(() => {
        const data = couterOrders400Data?.data;
        if (!data) return [];
        const plotData = data.map((order) => {
            return {
                completed_orders: order.completed_orders,
                not_completed_orders: order.not_completed_orders,
                count_orders: order.count_orders,
            };
        });

        return {
            data: plotData,
        };
    }, [couterOrders400Data]);

    const ordersCounter410 = useMemo(() => {
        const data = couterOrders410Data?.data;
        if (!data) return [];
        const plotData = data.map((order) => {
            return {
                completed_orders: order.completed_orders,
                not_completed_orders: order.not_completed_orders,
                count_orders: order.count_orders,
            };
        });

        return {
            data: plotData,
        };
    }, [couterOrders410Data]);

    const ordersCounter420 = useMemo(() => {
        const data = couterOrders420Data?.data;
        if (!data) return [];
        const plotData = data.map((order) => {
            return {
                completed_orders: order.completed_orders,
                not_completed_orders: order.not_completed_orders,
                count_orders: order.count_orders,
            };
        });

        return {
            data: plotData,
        };
    }, [couterOrders420Data]);

    const ordersCounter430 = useMemo(() => {
        const data = couterOrders430Data?.data;
        if (!data) return [];
        const plotData = data.map((order) => {
            return {
                completed_orders: order.completed_orders,
                not_completed_orders: order.not_completed_orders,
                count_orders: order.count_orders,
            };
        });
        return {
            data: plotData,
        };
    }, [couterOrders430Data]);

    const ordersCounter440 = useMemo(() => {
        const data = couterOrders440Data?.data;
        if (!data) return [];
        const plotData = data.map((order) => {
            return {
                completed_orders: order.completed_orders,
                not_completed_orders: order.not_completed_orders,
                count_orders: order.count_orders,
            };
        });
        return {
            data: plotData,
        };
    }, [couterOrders440Data]);

    const ordersCounter450 = useMemo(() => {
        const data = couterOrders450Data?.data;
        if (!data) return [];
        const plotData = data.map((order) => {
            return {
                completed_orders: order.completed_orders,
                not_completed_orders: order.not_completed_orders,
                count_orders: order.count_orders,
            };
        });
        return {
            data: plotData,
        };
    }, [couterOrders450Data]);

    const allOrdersCount = useMemo(() => {
        const data = dailyOrdersAllData?.data;
        if (!data) return [];

        const plotData = data.map((order) => {
            const date = dayjs(order.order_date);
            return {
                timeText: date.format("DD.MM.YYYY"),
                completed: order.completed_orders,
                work: order.not_completed_orders,
                count_orders: order.count_orders,
            };
        });

        return {
            data: plotData,
        };
    }, [dailyOrdersAllData]);

    const orders400Count = useMemo(() => {
        const data = orders400Data?.data;
        if (!data) return [];

        const plotData = data.map((order) => {
            const date = dayjs(order.order_date);
            return {
                timeText: date.format("DD.MM.YYYY"),
                completed: order.completed_orders,
                work: order.not_completed_orders,
                count_orders: order.count_orders,
            };
        });

        return {
            data: plotData,
        };
    }, [orders400Data]);

    const orders410Count = useMemo(() => {
        const data = orders410Data?.data;
        if (!data) return [];

        const plotData = data.map((order) => {
            const date = dayjs(order.order_date);
            return {
                timeText: date.format("DD.MM.YYYY"),
                completed: order.completed_orders,
                work: order.not_completed_orders,
                count_orders: order.count_orders,
            };
        });

        return {
            data: plotData,
        };
    }, [orders410Data]);


    const orders420Count = useMemo(() => {
        const data = orders420Data?.data;
        if (!data) return [];

        const plotData = data.map((order) => {
            const date = dayjs(order.order_date);
            return {
                timeText: date.format("DD.MM.YYYY"),
                completed: order.completed_orders,
                work: order.not_completed_orders,
                count_orders: order.count_orders,
            };
        });

        return {
            data: plotData,
        };
    }, [orders420Data]);



    const orders430Count = useMemo(() => {
        const data = orders430Data?.data;
        if (!data) return [];

        const plotData = data.map((order) => {
            const date = dayjs(order.order_date);
            return {
                timeText: date.format("DD.MM.YYYY"),
                completed: order.completed_orders,
                work: order.not_completed_orders,
                count_orders: order.count_orders,
            };
        });

        return {
            data: plotData,
        };
    }, [orders430Data]);



    const orders440Count = useMemo(() => {
        const data = orders440Data?.data;
        if (!data) return [];

        const plotData = data.map((order) => {
            const date = dayjs(order.order_date);
            return {
                timeText: date.format("DD.MM.YYYY"),
                completed: order.completed_orders,
                work: order.not_completed_orders,
                count_orders: order.count_orders,
            };
        });

        return {
            data: plotData,
        };
    }, [orders440Data]);



    const orders450Count = useMemo(() => {
        const data = orders450Data?.data;
        if (!data) return [];

        const plotData = data.map((order) => {
            const date = dayjs(order.order_date);
            return {
                timeText: date.format("DD.MM.YYYY"),
                completed: order.completed_orders,
                work: order.not_completed_orders,
                count_orders: order.count_orders,
            };
        });

        return {
            data: plotData,
        };
    }, [orders450Data]);

    return (
        <List

            headerButtons={() => (
                <Dropdown menu={{ items: dateFilters }}>
                    <Button>
                        {translate(
                            `dashboard.filter.date.${DATE_FILTERS[selecetedDateFilter].text}`,
                        )}
                        {/* {DATE_FILTERS[selecetedDateFilter].text} */}
                        <DownOutlined />
                    </Button>
                </Dropdown>

            )}
        >
            <Row gutter={[16, 16]}>
                <Col md={24}>
                    <Row gutter={[16, 16]}>
                        <Col xl={{ span: 21 }} lg={19} md={19} sm={24} xs={24}>
                            <Card title={translate("dashboard.grodnoRegion")}>
                                <StatusOrdersBarChart data={allOrdersCount.data} width={1500} height={270} />
                                {/* height={170} data={ordersCount.data} /> */}
                            </Card>
                        </Col>
                        <Col xl={{ span: 3 }} lg={5} md={5} sm={24} xs={24}>
                            <Card title={translate("dashboard.grodnoRegion")} >
                                <CounterOrders data={ordersCounterAll.data} />
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col md={24}>
                    <Row gutter={[16, 16]}>
                        <Col xl={{ span: 9 }} lg={9} md={8} sm={24} xs={24}>
                            <Card title={translate("dashboard.grodno")}>
                                {/* <DailyOrders data={orders400Count.data} width={440} height={170} barSize={10} /> */}
                                <StatusOrdersBarChart data={orders400Count.data} width={440} height={270} />
                            </Card>
                        </Col>
                        <Col xl={{ span: 3 }} lg={3} md={4} sm={24} xs={24}>
                            <Card title={translate("dashboard.grodno")}>
                                <CounterOrders data={ordersCounter400.data} />
                            </Card>
                        </Col>
                        <Col xl={{ span: 9 }} lg={9} md={8} sm={24} xs={24}>
                            <Card title={translate("dashboard.volkovysk")}>
                                <StatusOrdersBarChart data={orders410Count.data} width={440} height={270} />
                            </Card>
                        </Col>
                        <Col xl={{ span: 3 }} lg={3} md={4} sm={24} xs={24}>
                            <Card title={translate("dashboard.volkovysk")}>
                                <CounterOrders data={ordersCounter410.data} />
                            </Card>
                        </Col>

                    </Row>
                </Col>
                <Col md={24}>
                    <Row gutter={[16, 16]}>
                        <Col xl={{ span: 9 }} lg={9} md={8} sm={24} xs={24}>
                            <Card title={translate("dashboard.lida")}>
                                <StatusOrdersBarChart data={orders420Count.data} width={440} height={270} />
                            </Card>
                        </Col>
                        <Col xl={{ span: 3 }} lg={3} md={4} sm={24} xs={24}>
                            <Card title={translate("dashboard.lida")}>
                                <CounterOrders data={ordersCounter420.data} />
                            </Card>
                        </Col>
                        <Col xl={{ span: 9 }} lg={9} md={8} sm={24} xs={24}>
                            <Card title={translate("dashboard.novogrudok")}>
                                <StatusOrdersBarChart data={orders430Count.data} width={440} height={270} />
                            </Card>
                        </Col>
                        <Col xl={{ span: 3 }} lg={3} md={4} sm={24} xs={24}>
                            <Card title={translate("dashboard.novogrudok")}>
                                <CounterOrders data={ordersCounter430.data} />
                            </Card>
                        </Col>

                    </Row>
                </Col>
                <Col md={24}>
                    <Row gutter={[16, 16]}>
                        <Col xl={{ span: 9 }} lg={9} md={8} sm={24} xs={24}>
                            <Card title={translate("dashboard.oshmyany")}>
                                <StatusOrdersBarChart data={orders440Count.data} width={440} height={270} />
                            </Card>
                        </Col>
                        <Col xl={{ span: 3 }} lg={3} md={4} sm={24} xs={24}>
                            <Card title={translate("dashboard.oshmyany")}>
                                <CounterOrders data={ordersCounter440.data} />
                            </Card>
                        </Col>
                        <Col xl={{ span: 9 }} lg={9} md={8} sm={24} xs={24}>
                            <Card title={translate("dashboard.slonim")}>
                                <StatusOrdersBarChart data={orders450Count.data} width={440} height={270} />
                            </Card>
                        </Col>
                        <Col xl={{ span: 3 }} lg={3} md={4} sm={24} xs={24}>
                            <Card title={translate("dashboard.slonim")}>
                                <CounterOrders data={ordersCounter450.data} />
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                    <Card>
                        <Map />
                    </Card>
                </Col>
                <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                    <Card>
                        <CurrentOrders height={"550px"} />
                    </Card>
                </Col>
            </Row>
        </List >
    )
};

