import React, {useEffect, useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Event } from '../../types/Event';
import './Cart.css'
interface ShoppingCartProps {
    cart: Event[];
  }
  
  const Cart: React.FC<ShoppingCartProps> = ({ cart }) => {  
    const [show, setShow] = useState<boolean>(false);
    const downAndUp = () => {
        if(window.scrollY > 30) {
            setShow(true);
        } else { setShow(false);}
    };
  
    useEffect(() => {
      window.addEventListener("scroll", downAndUp);
      return () => window.removeEventListener("scroll", downAndUp);
    }, []);
    
    return (

    <div className={`shoppingcart ${show && 'visibility'}`}>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
      
      {cart.map((event) => (  
        <div>
         <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="" src={event.flyerFront} />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {event.title}
              </Typography>
{event.country}            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" /> </div>))}


    </List></div>
  );
        }
export default Cart



