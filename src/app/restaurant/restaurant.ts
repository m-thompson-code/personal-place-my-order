interface Item {
    name: string;
}

interface Menu {
    lunch: {
        name: string;
        price: number;
    }[];
    dinner: {
        name: string;
        price: number;
    }[];
}

interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}

interface Images {
    thumbnail: string;
    owner: string;
    banner: string;
}

export interface Restaurant extends Item {
    name: string;
    slug: string;
    images: Images;
    menu: Menu;
    address: Address;
    _id: string;
}
