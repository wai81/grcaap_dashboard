import React from "react";
import { BaseRecord, HttpError, useTranslation } from "@refinedev/core";
import { useTable, List, BooleanField, DateField } from "@refinedev/antd";
import { Table, Space } from "antd";
import { IOrganization } from "../../interfaces";

export const OrganizationList = () => {
    const { tableProps } = useTable<IOrganization, HttpError>({
        syncWithLocation: true,
    });
    const { translate } = useTranslation();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title={translate("organizations.fields.id")} />
                <Table.Column dataIndex="title" title={translate("organizations.fields.title")} />
                <Table.Column dataIndex="fullname" title={translate("organizations.fields.fullname")} />
                <Table.Column
                    dataIndex={["is_active"]}
                    title={translate("organizations.fields.is_active.title")}
                    render={(value: any) => <BooleanField value={value} />}
                />
                <Table.Column
                    dataIndex={["created_at"]}
                    title={translate("organizations.fields.created_at")}
                    render={(value: any) => <DateField value={value} format=" DD.MM.YYYY" />}
                />
            </Table>
        </List>
    );
};
