
export interface OrderInput {
    address: {
        addressLine1: string;
        addressLine2?: string;
        state: string;
        city: string;
        postalCode?: string;
        country: string;
    };
    cartItems: {
        variantId: string;  
        price: number;
        quantity: number;
    }[];
    totalAmount: number;
}

export interface OrderItemSingle {
    created_at: string,
    id: number,
    status: string,
    total_amount: number,
}