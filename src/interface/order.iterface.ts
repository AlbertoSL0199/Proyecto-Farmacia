
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