import React, {useState, useEffect} from 'react'
import { Event } from '../types/Event';
import { useNavigate } from 'react-router-dom';

function LocationPage() {
  const [data, setData] = useState<Event>();
  const url = window.location.pathname;
  console.log(url)
  const specificUrl = url.slice(7).split('/')[0];
console.log(specificUrl)
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


  const openGoogleMaps = () => {
    const googleMapsURL = data?.venue.direction;
    window.open(googleMapsURL, '_blank');
  };

  const navigate=useNavigate();
  return (
    <div>
      <button onClick={openGoogleMaps}>Click to go to Location</button>
      <button onClick={() => navigate("/")}>Go back to Home Page</button>
    </div>
  )
}

export default LocationPage