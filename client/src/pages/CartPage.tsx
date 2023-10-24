//import { Button } from "@material-ui/core";
import { CartItemType } from '../types/cartItem'
import CartItem from "../components/CartItem";


type Props = {
  cartItems: CartItemType[];

};
// export type CartItemType = {
//     _id: string,
//     title: string,
//     flyerFront: string,
//     date: string,
//     city: string,
//     country: string,
//   };

const CartPage = ({ cartItems }: Props) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((acc, item) => acc + 1, 0);

  return (
    <div className='cart'>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item._id}
          item={item}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </div>
  );
};

export default CartPage;