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

import { Event } from '../types/Event';


interface EventCardProps {
  event: Event;
  onAddToCart: (event: Event) => void;
}


export default function EventCard ({ event, onAddToCart}: EventCardProps) {

const navigate = useNavigate();
const openGoogleMaps = () => {
  const googleMapsURL = event.venue.direction;
  window.open(googleMapsURL, '_blank');
};
  return (
    <Card sx={{ maxWidth: 345, maxHeight: 500 }}>
      <CardHeader sx={{ mt: 1, maxHeight: 50 }} fontSize={8} 
        avatar={
          <IconButton color="primary" aria-label="add to shopping cart" onClick={() => onAddToCart(event)}>
              <AddShoppingCartIcon />
          </IconButton>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={event.title}
        subheader={event.artists.slice(0,2).map(artist => artist.name)}
      
      />
      <CardMedia onClick={() => navigate(`/event/${event._id}`)}
        component="img"
        height="194"
        image={event.flyerFront}
        alt=""
      />
      <CardContent>
        {/* <IconButton onClick={() => navigate(`/event/${event._id}/direction`)} */}
        <IconButton onClick={openGoogleMaps}

                size="medium"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ ml: 0, mr: 12 }}
              >
              <AddLocationIcon /> 
              <Typography variant="body1" fontSize={12} sx={{ left:0 , mt: 2, maxHeight: 20, width: 200 }} color="text.secondary">
          {event.venue.name}
          </Typography></IconButton>
          <Item sx={{ mb: '1%', pl:'2%', fontWeight: 'bold' }}>{event.startTime}</Item>
          <Item sx={{ mb: '1%', pl:'2%', fontWeight: 'bold' }}>{event.endTime}</Item>
      </CardContent>
    
    </Card>
  );
}

  

  
