export interface Product {
    id: string,
    category: string,
    description: string,
    image: string,
    price: number,
    title: string,
    quantity: number,
    rating: Rate
}

export interface Rate {
        rate: number,
        count: number
}

export interface ProductResponse {
    name: string
}