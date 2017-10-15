import { Event } from "./event";
import { User } from "./user";

export class Attendance
{
    id: number;
    user_id: User.id;
    event_id: Event.id;
    address: string;
    status: string;
    resource_uri: string;
    
}