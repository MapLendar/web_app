export class User
{
	id: number;
	token: string;
	firstName: string;
	lastName: string;
	email: string;
	age: number;
	
	constructor( data: any )
	{
		if( Object.keys( data ).length === 0 )
		{
			this.id = null;
			this.token = null;
			this.firstName = null;
			this.lastName = null;
			this.email = null;
			this.age = null;
		}
		else
		{
			this.id = data.id;
			this.token = data.token;
			this.firstName = data.name;
			this.lastName = data.lastName;
			this.email = data.email;
			this.age = data.age;
		}
	}
}