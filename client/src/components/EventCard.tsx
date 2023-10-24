import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import Item from '@mui/material/ListItem'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { CartItemType } from '../types/cartItem';
import { Event } from '../types/Event';

// type Props = {
//   props: Event
//   //item: CartItemType;
//   handleAddToCart: (id: string) => void;};


export default function EventCard (props: Event) {
//   const [cartItems, setCartItems] = useState<CartItemType[]>([]);
// let nb: number;
//   const handleAddToCart = (id: string) => {

//     setCartItems(cartItems.push())
//     setCartItems((prev) => {
//       const isItemInCart = prev.find((item) => item._id === id);

//       if (isItemInCart) {
//         return prev.map((item) =>
//           item._id === id
//             ? { ...item, nb: 1}
//             : item
//         );
//       }
//       return [...prev, { ...props, amount: nb+1 }];
//     }); console.log(cartItems)
//   };

const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, maxHeight: 500 }}>
      <CardHeader sx={{ mt: 1, maxHeight: 50 }} fontSize={8} 
        avatar={
          <IconButton color="primary" aria-label="add to shopping cart">
              <AddShoppingCartIcon />
          </IconButton>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title}
        subheader={props.artists.slice(0,2).map(artist => artist.name)}
      
      />
      <CardMedia onClick={() => navigate(`/event/${props._id}`)}
        component="img"
        height="194"
        image={props.flyerFront}
        alt=""
      />
      <CardContent>
        <IconButton
                size="medium"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ ml: 0, mr: 12 }}
              >
              <AddLocationIcon onClick={() => navigate(`/event/${props._id}/direction`)}/> 
              <Typography variant="body1" fontSize={10} sx={{ left:0 , mt: 2, maxHeight: 20, width: 200 }} color="text.secondary">
          {props.venue.name}
          </Typography></IconButton>
          <Item sx={{ mb: '1%', pl:'2%', fontWeight: 'bold' }}>{props.startTime}</Item>
          <Item sx={{ mb: '1%', pl:'2%', fontWeight: 'bold' }}>{props.endTime}</Item>
      </CardContent>
    
    </Card>
  );
}

  

  
