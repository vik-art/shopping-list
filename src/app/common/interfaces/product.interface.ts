export interface Product {
    id: string,
    category: string,
    description: string,
    image: string,
    price: number,
    title: string,
    rating: Rate
}

export interface Rate {
        rate: number,
        count: number
}