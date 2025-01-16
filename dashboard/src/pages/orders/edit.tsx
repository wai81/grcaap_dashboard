import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const OrderEdit = () => {
    // const { onFinish, mutation, query } = useForm({
    //     redirect: "show",
    // });

    const { formProps, saveButtonProps, query } = useForm({
        refineCoreProps: {
            redirect: "show",
        },
    });

    const record = query?.data?.data;

    const { selectProps } = useSelect({
        resource: "organizations",
        defaultValue: query?.data?.data?.organization_id,
    });

    // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();

    //     // Using FormData to get the form values and convert it to an object.
    //     const data = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
    //     // Calling onFinish to submit with the data we've collected from the form.
    //     console.log(data)
    //     onFinish({
    //         ...data,
    //         // organization_id: Number(data.organization),
    //     });
    // };


    return (
        <Edit>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Номер заказа" name="order_number">
                    <Input />
                </Form.Item>
                <Form.Item label="Дата заказа" name="order_create_date">
                    <Input />
                </Form.Item>
                <Form.Item label="Телефон" name="costumer_contact_phone">
                    <Input />
                </Form.Item>
                <Form.Item label="ТОР" name={"organization_id"}>
                    <Select {...selectProps} />
                </Form.Item>
                <Form.Item label="Выполенн" name="is_completed">
                    {/* <BooleanField /> */}
                </Form.Item>
                {/* SaveButton renders a submit button to submit our form */}
                {/* <SaveButton {...saveButtonProps} /> */}
            </Form>
        </Edit>
    );
};