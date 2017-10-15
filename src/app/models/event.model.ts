import { Place } from "./place";

export class Event
{
    id: number;    
	name: string;
    description: string;
    site_id: Place;
    start_time: string;
    end_time: string;
    
}