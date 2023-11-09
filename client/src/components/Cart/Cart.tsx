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
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';
import { grey } from '@mui/material/colors';

interface ShoppingCartProps {
    cart: Event[];
    handledelete: (event: Event) => void;
  }
  
const Cart: React.FC<ShoppingCartProps> = ({ cart, handledelete }) => {  
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
      <Grid sx={{ bgcolor: grey[100]}}>
      <List sx={{ width: '100%', mt:'10%' ,maxWidth: 400, maxHeight: 250,
        overflow: 'auto'}}>
      {cart.map((event) => (  
                <li key={event._id}>
         <ListItem alignItems="flex-start"  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon onClick={() => handledelete(event)}/>
                    </IconButton>
                  }>
        <ListItemAvatar>
          <Avatar alt="" src={event.flyerFront} />
        </ListItemAvatar>
        <ListItemText
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
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" /> 
        </li>))}
       </List>
       <Button variant="contained" sx={{ display: 'right', mt: 1, mb:1,ml: 5 }}onClick={() => console.log('Bezahlung')}>Confirm Order</Button>
       </Grid>
    </div> 
  );
        }
export default Cart



