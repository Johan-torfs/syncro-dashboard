import { Priority } from "../priority/priority";
import { User } from "../user/user";

export interface Ticket {
    id: number;
    number: number;
    subject: string;
    created_at: Date;
    updated_at: Date;
    status: string;
    due_date?: Date;
    start_date?: Date;
    end_date?: Date;
    priority?: Priority;
    technician?: User;
    customer: User;
    comments: Comment[];
}