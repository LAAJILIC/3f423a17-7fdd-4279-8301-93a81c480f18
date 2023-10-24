export type CartItemType = {
    _id: string,
    title: string,
    flyerFront: string,
    date: string,
    city: string,
    country: string,
    amount: number,
  };

  export type Cart = {
    total: number,
    cartItems: CartItemType[]
  }