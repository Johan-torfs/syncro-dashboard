import { Priority } from "../admin/priority/priority";
import { User } from "../admin/user/user";
import { Comment as TicketComment } from 'src/app/comment/comment';

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
    comments: TicketComment[];
}