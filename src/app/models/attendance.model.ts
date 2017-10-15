import { Event } from "./event.model";
import { User } from "./user.model";

export class Attendance
{
    id: number;
    user_id: number;
    event_id: number;
    address: string;
    status: string;
    resource_uri: string;
    
}