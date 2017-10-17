import { Place } from "./place.model";

export class Event
{
    id: number;    
    name: string;
    description: string;
    site_id: Place;
    start_time: string;
    end_time: string;
    
    constructor( data: any )
	{
		if( Object.keys( data ).length === 0 )
		{
			this.id = null;
			this.name = null;
			this.description = null;
			this.site_id = null;
			this.start_time = null;
			this.end_time = null;
		}
		else
		{
			this.id = data.id;
			this.name = data.name;
			this.description = data.description;
			this.site_id = data.site_id;
			this.start_time = data.start_time;
			this.end_time = data.end_time;
		}
	}

}
