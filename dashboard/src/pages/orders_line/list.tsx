import { List, EditButton, FilterDropdown, getDefaultSortOrder, ShowButton, useSelect, useTable, BooleanField, DateField, CreateButton, rangePickerFilterMapper } from "@refinedev/antd";
import { getDefaultFilter, HttpError, useMany, useTranslate } from "@refinedev/core";
import { DatePicker, Input, Select, Space, Table, Tag, theme, Typography } from "antd";
import { ILineOrder, IOrganization } from "../../interfaces";
import { PaginationTotal } from "../../components/paginationTotal";
import { OrderStatus } from "../../components/order/status";
import { SearchOutlined, TagOutlined, TagsOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { DeptureStatus } from "../../components/order/departureStatus";

export const OrdersLineList = () => {
    const { token } = theme.useToken();
    const now = dayjs();
    const translate = useTranslate();
    // We'll use pass `tableProps` to the `<Table />` component,
    // This will manage the data, pagination, filters and sorters for us.
    const { tableProps, sorters, filters } = useTable<ILineOrder, HttpError>({
        resource: "line_orders/in_line",
        sorters: { initial: [{ field: "created_at", order: "desc" }] },
        // We're adding default values for our filters
        filters: {
            initial: [
                {
                    field: "order_number",
                    operator: "eq",
                    value: "",
                },
                {
                    field: "adress_object",
                    operator: "contains",
                    value: "",
                },
                {
                    field: "departure",
                    operator: "in",
                    value: []
                },
                {
                    field: "organization_id",
                    operator: "in",
                    value: []
                },
                {
                    field: "order_create_date",
                    operator: "between",
                    value: [
                        now.subtract(1, "month").startOf("day").format('YYYY-MM-DD HH:mm:ss'),
                        now.endOf("day").format(),
                    ],
                },
            ],
        },
        syncWithLocation: true,
    });


    // const { data: organizations, isLoading } = useMany({
    //     resource: "organizations",
    //     //ids: data?.data?.map((order) => order.organization_id) ?? [],
    //     ids: tableProps?.dataSource?.map((order) => order.organization_id) ?? [],
    // });

    const { selectProps: organyzationSelectProps, query: queryResult, } = useSelect<IOrganization>({
        resource: "organizations",
        optionLabel: "title",
        optionValue: "id",
        sorters: [{ field: "id", order: "asc" }],
        //defaultValue: getDefaultFilter("organization_id", filters, "in"),
        defaultValue: getDefaultFilter("organization_id", filters, "eq"),
        pagination: {
            pageSize: 25,
        },
    });

    const organizations = queryResult?.data?.data || [];

    return (
        <List
        >
            <Table
                {...tableProps}
                rowKey={"id"}
                pagination={{
                    ...tableProps.pagination,
                    showTotal: (total) => (
                        <PaginationTotal total={total}
                        //entityName="orders" 
                        />
                    ),
                }}
            >
                <Table.Column dataIndex="row_num" title={translate("in_line.fields.row_num")}
                    width={120}
                    render={(value: any) => {
                        return (
                            <Tag color="orange" icon={<TagOutlined />}>
                                {value}
                            </Tag>
                        )
                    }}
                />
                <Table.Column dataIndex="order_number" title={translate("in_line.fields.order_number")}
                    width={160}
                    sorter
                    defaultSortOrder={getDefaultSortOrder("order_number", sorters)}
                    key={"order_number"}
                    filterIcon={(filtered) => (
                        <SearchOutlined
                            style={{
                                color: filtered ? token.colorPrimary : undefined,
                            }}
                        />
                    )}
                    defaultFilteredValue={getDefaultFilter("order_number", filters, "eq")}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input
                                placeholder={"Введите Номер заказа"}
                            //placeholder={t("products.filter.name.placeholder")} 
                            />
                        </FilterDropdown>
                    )}
                    render={(value: string) => {
                        return (
                            <Typography.Text
                                style={{
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {value}
                            </Typography.Text>
                        );
                    }}
                />
                <Table.Column
                    width={150}
                    dataIndex={["order_create_date"]}
                    title={translate("in_line.fields.order_create_date")}
                    sorter
                    key={"order_create_date"}
                    filterDropdown={(props) => (
                        <FilterDropdown
                            {...props}
                            mapValue={(selectedKeys, event) => {
                                return rangePickerFilterMapper(selectedKeys, event);
                            }}
                        >
                            <DatePicker.RangePicker />
                        </FilterDropdown>
                    )}
                    defaultFilteredValue={getDefaultFilter(
                        "order_create_date",
                        filters,
                        "between",
                    )}
                    defaultSortOrder={getDefaultSortOrder("order_create_date", sorters)}
                    render={(value: any) => <DateField value={value} format=" DD.MM.YYYY" />} />
                <Table.Column
                    width={150}
                    dataIndex="costumer_contact_phone"
                    title={translate("in_line.fields.phone")}
                />
                <Table.Column dataIndex="adress_object" title={translate("in_line.fields.adress_object")}
                    width={350}
                    key={"adress_object"}
                    filterIcon={(filtered) => (
                        <SearchOutlined
                            style={{
                                color: filtered ? token.colorPrimary : undefined,
                            }}
                        />
                    )}
                    defaultFilteredValue={getDefaultFilter("adress_object", filters, "contains")}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input
                                placeholder={"Поиск по строке"}
                            //placeholder={t("products.filter.name.placeholder")} 
                            />
                        </FilterDropdown>
                    )}
                    render={(value: string) => {
                        return (
                            <Typography.Text>
                                {value}
                            </Typography.Text>
                        );
                    }}
                />

                <Table.Column
                    dataIndex={["organization_id", "title"]}
                    title={translate("in_line.fields.organization")}
                    key={"organization_id"}
                    filterDropdown={(props) => (
                        <FilterDropdown
                            {...props}
                            // We'll store the selected id as number
                            //mapValue={(selectedKey) => Number(selectedKey)}
                            selectedKeys={props.selectedKeys.map((item) => Number(item))}
                        >
                            {/* <Select style={{ minWidth: 200 }} {...selectProps} /> */}
                            <Select {...organyzationSelectProps}
                                allowClear
                                mode="multiple"
                                style={{ width: "150px" }}
                            />
                        </FilterDropdown>
                    )}
                    defaultFilteredValue={getDefaultFilter("organization_id", filters, "in")}
                    render={(_, value) => {
                        const organization = organizations.find(
                            (organization) => organization?.id === value?.organization_id,
                        );

                        return (`${organization?.id} ${organization?.title}` || "-")
                    }}
                />

                <Table.Column dataIndex="departure" title={translate("in_line.fields.departure.title")}
                    width={100}
                    key={"departure"}
                    defaultFilteredValue={getDefaultFilter("departure", filters, "in")}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ width: "170px" }}
                                allowClear
                                mode="multiple"
                            //placeholder={t("products.filter.isActive.placeholder")}
                            >
                                <Select.Option value="true">
                                    {translate("in_line.fields.departure.true")}
                                </Select.Option>
                                <Select.Option value="false">
                                    {/* {t("products.fields.isActive.false")} */}
                                    {translate("in_line.fields.departure.false")}
                                </Select.Option>
                            </Select>
                        </FilterDropdown>
                    )}
                    render={(value: boolean | null) => <DeptureStatus status={value} />} />

                <Table.Column
                    width={120}
                    dataIndex={["is_completed"]}
                    title={translate("in_line.fields.is_active.title")}
                    key={"is_completed__in"}
                    render={(value: boolean) => <OrderStatus status={value} />}
                />
                <Table.Column
                    width={150}
                    dataIndex={["created_at"]}
                    title={translate("in_line.fields.created_at")}
                    sorter
                    defaultSortOrder={getDefaultSortOrder("created_at", sorters)}
                    render={(value: any) => <DateField value={value} format=" DD.MM.YYYY HH:mm" />} />
                {/* <Table.Column
                    title=""
                    render={(_, record) => (
                        <Space>
                            <ShowButton hideText size="small" recordItemId={record.id} />
                            <EditButton disabled hideText size="small" recordItemId={record.id} />
                        </Space>
                    )}
                /> */}

            </Table>
        </List>
    );
};