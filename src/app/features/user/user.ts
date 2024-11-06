export interface User
{
      address: {
            geolocation: {
                  lat: string,
                  long: string;
            },
            city: string,
            street: string,
            number: number,
            zipcode: string;
      };
      id: number;
      username: string;
      name: {
            firstname: string,
            lastname: string;
      };
      email: string;
      password: string;
      phone: string;

      avatarUrl?: string;
      role?: UserRole;
}

export enum UserRole
{
      admin,
      regular
}

export let mockUser: User = {
      "address": {
            "geolocation": {
                  "lat": "-37.3159",
                  "long": "81.1496"
            },
            "city": "kilcoole",
            "street": "new road",
            "number": 7682,
            "zipcode": "12926-3874"
      },
      "id": 1,
      "email": "john@gmail.com",
      "username": "johnd",
      "password": "m38rmF$",
      "name": {
            "firstname": "john",
            "lastname": "doe"
      },
      "phone": "1-570-236-7033"
};