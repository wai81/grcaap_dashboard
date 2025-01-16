import {
    TruckOutlined,
} from "@ant-design/icons";
import { useTranslate } from "@refinedev/core";
import { Tag } from "antd";

type DeptureStatusProps = {
    status: boolean | null
};

export const DeptureStatus: React.FC<DeptureStatusProps> = ({ status }) => {
    const translate = useTranslate();

    if (status === true) {
        return (
            <Tag color={"green"} icon={<TruckOutlined />} />
        );
    } else {
        return (
            <Tag />
        )
    }

};