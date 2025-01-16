import { List, EditButton, FilterDropdown, getDefaultSortOrder, ShowButton, useSelect, useTable, BooleanField, DateField, CreateButton } from "@refinedev/antd";
import { getDefaultFilter, HttpError, useMany, useTranslate } from "@refinedev/core";
import { Input, Select, Space, Table, theme, Typography } from "antd";
import { IOrder, IOrganization } from "../../interfaces";
import { PaginationTotal } from "../../components/paginationTotal";
import { OrderStatus } from "../../components/order/status";
import { SearchOutlined } from "@ant-design/icons";
import { DeptureStatus } from "../../components/order/departureStatus";


export const OrdersList = () => {
    const { token } = theme.useToken();
    // We'll use pass `tableProps` to the `<Table />` component,
    // This will manage the data, pagination, filters and sorters for us.
    const { tableProps, sorters, filters } = useTable<IOrder, HttpError>({
        //resource: "line_orders",
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
                    field: "organization_id",
                    operator: "in",
                    value: []
                },
                {
                    field: "departure",
                    operator: "in",
                    value: []
                },
                {
                    field: "is_completed",
                    operator: "in",
                    value: []
                }
            ],
        },
        syncWithLocation: true,
    });
    const translate = useTranslate();

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
            headerButtons={<CreateButton hidden />}
        >
            <Table
                {...tableProps}
                rowKey={"id"}
                pagination={{
                    ...tableProps.pagination,
                    showTotal: (total) => (
                        <PaginationTotal
                            total={total}
                        //    entityName="orders"
                        />
                    ),
                }}
            >
                {/* <Table.Column dataIndex="id" title="ID" /> */}
                <Table.Column dataIndex="order_number" title={translate("line_orders.fields.order_number")}
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
                    dataIndex={["order_create_date"]}
                    title={translate("line_orders.fields.order_create_date")}//"Дата заказа"
                    width={150}
                    sorter
                    defaultSortOrder={getDefaultSortOrder("order_create_date", sorters)}
                    render={(value: any) => <DateField
                        style={{
                            whiteSpace: "nowrap",
                        }}
                        value={value} format=" DD.MM.YYYY" />}
                />

                <Table.Column dataIndex="adress_object" title={translate("line_orders.fields.adress_object")}
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
                    title={translate("line_orders.fields.organization")}
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
                                style={{ width: "200px" }}
                            />
                        </FilterDropdown>
                    )}
                    defaultFilteredValue={getDefaultFilter("organization_id", filters, "in")}
                    render={(_, value) => {
                        const organization = organizations.find(
                            (organization) => organization?.id === value?.organization_id,
                        );

                        return (organization?.title || "-")
                    }}
                />

                <Table.Column
                    width={100}
                    dataIndex="costumer_contact_phone"
                    title={translate("line_orders.fields.phone")} />

                <Table.Column
                    dataIndex="departure"
                    title={translate("line_orders.fields.departure.title")}
                    width={100}
                    key={"departure"}
                    defaultFilteredValue={getDefaultFilter("departure", filters, "in")}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ width: "150px" }}
                                allowClear
                                mode="multiple"
                            //placeholder={t("products.filter.isActive.placeholder")}
                            >
                                <Select.Option value="true">
                                    {translate("line_orders.fields.departure.true")}
                                </Select.Option>
                                <Select.Option value="false">
                                    {/* {t("products.fields.isActive.false")} */}
                                    {translate("line_orders.fields.departure.false")}
                                </Select.Option>
                            </Select>
                        </FilterDropdown>
                    )}
                    render={(value: boolean | null) => <DeptureStatus status={value} />} />

                <Table.Column
                    dataIndex={["is_completed"]}
                    title={translate("line_orders.fields.is_active.title")}
                    width={120}
                    key={"is_completed"}
                    sorter
                    defaultSortOrder={getDefaultSortOrder("is_completed", sorters)}
                    defaultFilteredValue={getDefaultFilter("is_completed", filters, "in")}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ width: "150px" }}
                                allowClear
                                mode="multiple"
                            //placeholder={t("products.filter.isActive.placeholder")}
                            >
                                <Select.Option value="true">
                                    {translate("line_orders.fields.is_active.true")}
                                </Select.Option>
                                <Select.Option value="false">
                                    {/* {t("products.fields.isActive.false")} */}
                                    {translate("line_orders.fields.is_active.false")}
                                </Select.Option>
                            </Select>
                        </FilterDropdown>
                    )}
                    render={(value: boolean) => <OrderStatus status={value} />}
                />
                <Table.Column
                    dataIndex={["created_at"]}
                    title={translate("line_orders.fields.created_at")}
                    width={150}
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