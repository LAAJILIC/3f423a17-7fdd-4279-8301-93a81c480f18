import Button from '@mui/material/Button';
import { CartItemType } from "../types/cartItem";


type Props = {
  item: CartItemType;
};

const CartItem = ({ item }: Props) => {
  return (
    <div>
      <div>
        <h3>{item.title}</h3>
        <div className="information">
          <p>Date: ${item.date}</p>
          <p>City: ${item.city}</p>
        </div>
      </div>
      <img src={item.flyerFront} alt={item.title} /></div>
  );
};

export default CartItem;