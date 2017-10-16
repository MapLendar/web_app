export class User
{
	id: number;
	token: string;
	first_name: string;
	last_name: string;
	email: string;
	age: number;
	
	constructor( data: any )
	{
		if( Object.keys( data ).length === 0 )
		{
			this.id = null;
			this.token = null;
			this.first_name = null;
			this.last_name = null;
			this.email = null;
			this.age = null;
		}
		else
		{
			this.id = data.id;
			this.token = data.token;
			this.first_name = data.name;
			this.last_name = data.lastName;
			this.email = data.email;
			this.age = data.age;
		}
	}
}