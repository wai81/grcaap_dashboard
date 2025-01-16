import { DownOutlined } from "@ant-design/icons";
import { useGetIdentity, useGetLocale, useLogout, useNavigation, useSetLocale, useTranslate } from "@refinedev/core";
import { Avatar, Button, Dropdown, Layout, Menu, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
    const { i18n } = useTranslation();
    const changeLocale = useSetLocale();
    const locale = useGetLocale();
    //const { mutate, isLoading } = useLogout();
    const { data: identity } = useGetIdentity();
    const t = useTranslate();

    const currentLocale = locale();

    const menuLang = (
        <Menu selectedKeys={currentLocale ? [currentLocale] : []}>
            {[...(i18n.languages || [])].sort().map((lang: string) => (
                <Menu.Item
                    key={lang}
                    onClick={() => changeLocale(lang)}
                    icon={
                        <span style={{ marginRight: 8 }}>
                            <Avatar size={16} src={`/images/flags/${lang}.svg`} />
                        </span>
                    }
                >
                    {lang === "en"
                        ? "English"
                        : lang === "ru"
                            ? "Русский"
                            : "Беларускі"}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        // <>
        //     <h2>Добро пожаловать, <span>{identity?.name ?? ""}</span></h2>
        //     <Link to={listUrl("line_orders")}>Список закзов</Link>
        //     <Link to={createUrl("line_orders")}>Новый заказ</Link>
        //     <button
        //         type="button"
        //         disabled={isLoading}
        //         onClick={mutate}
        //     >
        //         Logout
        //     </button>
        // </>
        <Layout.Header
            style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "0px 24px",
                height: "48px",
                backgroundColor: "#FFF",
            }}
        >
            <Dropdown overlay={menuLang}>
                <Button type="link">
                    <Space>
                        <Avatar size={16} src={`/images/flags/${currentLocale}.svg`} />
                        {currentLocale === "en"
                            ? "English"
                            : currentLocale === "ru"
                                ? "Русский"
                                : "Беларускі"}
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </Layout.Header>
    );
};