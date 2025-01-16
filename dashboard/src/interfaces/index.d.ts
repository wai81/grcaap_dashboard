export interface IOrder {
    id: string;
    order_number: string;
    order_create_date: string;
    adress_object:string;
    is_completed:boolean;
    departure: boolean;
    organization_id: number;
    created_at:string;
}

export interface ILineOrder {
    id: string;
    order_number: string;
    order_create_date: string;
    costumer_contact_phone:string;
    adress_object:string;
    departure:boolean;
    is_completed: boolean;
    organization_id: number;
    created_at:string;
    row_num: number;
}

export interface IOrganization {
    id: number;
    title: string;
    fullname: string;
    is_active:boolean;
    created_at:string;
}

export interface IOrderCount {
    order_date: string;
    count_orders: number;
}
