export class User {
    id = 0;
    name = '';
    email = '';
    addresses: Address[];
}

export class Address {
    street = '';
    city = '';
    state = '';
}

export const users: User[] = [
    {
        id: 1,
        name: 'Phuong',
        email: 'maithanhphuong.cntt@gmail.com',
        addresses: [
        {street: '111 Abc street', city: 'Ben Tre', state: 'Viet Nam'},
        {street: '222 Abc street', city: 'Da Lat', state: 'Viet Nam'},
        ],
    },
    {
        id: 2,
        name: 'Phuong 2',
        email: 'maithanhphuong2.cntt@gmail.com',
        addresses: [
        {street: '333 Abc street', city: 'Ben Tre', state: 'Viet Nam'},
        ],
    },
    {
        id: 3,
        name: 'Phuong 3',
        email: 'maithanhphuong3.cntt@gmail.com',
        addresses: [],
    },
];

export const states = ['Alaska', 'Colorado', 'Florida', 'Texas'];
