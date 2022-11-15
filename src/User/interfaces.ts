export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address?: { //Не обязательное поле, если мы поставим ? 
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company?: {};
}
