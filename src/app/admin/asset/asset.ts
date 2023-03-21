import { User } from "../user/user";

export interface Asset {
    id: number;
    name: string;
    customer: User;
    created_at: Date;
    updated_at: Date;
    asset_type: string;
}