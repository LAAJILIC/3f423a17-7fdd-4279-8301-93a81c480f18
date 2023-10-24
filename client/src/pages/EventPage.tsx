import React, { useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Event } from '../types/Event'
import { Helmet } from 'react-helmet-async'


function EventPage() {
  const url = window.location.pathname;
  const specificUrl = url.slice(7);
const [data, setData] = useState<Event>();
const eventUrl = `http://localhost:5000/api/event/${specificUrl}`;
console.log(eventUrl)

useEffect(() => {
  const fetchEvent = () => {
    return fetch(eventUrl) 
    .then((response) => response.json())
    .then((data) => setData(data));
    // .catch((error) => console.error('Error fetching data:', error));
  }
  console.log(data);
  fetchEvent();
}, []);

  return (
   <div>
      <Helmet>
        <title>Event Page</title>
      </Helmet>
      {
        data ? ( 
         

    <Card sx={{ Width: 400, minHeight: 700, m: '5%'}}>
      <CardActionArea>
        <CardMedia sx={{ Width: 200, minHeight: 600 }}
          component="img"
          height="140"
          image={data.flyerFront}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">{data.date}</Typography>
          <Typography variant="body2" color="text.secondary">{data.country}</Typography>
          <Typography variant="body2" color="text.secondary">{data.date}</Typography>

        </CardContent>
      </CardActionArea>
    </Card>

        ) : null
      }
     
    </div>
  )
}

export default EventPage