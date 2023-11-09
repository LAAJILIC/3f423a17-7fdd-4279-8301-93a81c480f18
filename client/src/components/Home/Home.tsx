import React, { useReducer, useEffect, useState } from 'react'
import { getError, getTotal } from '../../utils'
import { APiErr } from '../../types/ApiErr'
import { Event } from '../../types/Event';
import Item from '@mui/material/ListItem'
import { blue } from '@mui/material/colors';
import axios from '../../axios'
import EventCard from '../../components/EventCard'
import Grid from '@mui/material/Grid';
import { Chip } from '@mui/material'

import './Home.css'

//Types and State
type State = {
  eventsInCart: number,
  events: Event[],
  loading: boolean, 
  error: string;
}

type Action = 
  | { type: 'FETCH_REQUEST'}
  | { type: 'FETCH_SUCCESS',
      payload: Event[],
    }
  | { type: 'FETCH_FAIL',
     payload: string,
    }  
  | { type: 'ADD',
    payload: number,
   }  

let initialState: State = {
      eventsInCart: 0,
      events: [],
      loading: true, 
      error: ''
}
let sortedDateArray: string[] = [];
let finalDateArray: Date[] = [];
const reducer = (state: State, action: Action) => {
  switch(action.type) {
    case 'FETCH_REQUEST': return { ...state, loading: true }
    case 'FETCH_SUCCESS': return { ...state, events: action.payload, loading: false }
    case 'FETCH_FAIL': return { ...state, loading: false, error: action.payload }
    case 'ADD': return { ...state, eventsInCart: action.payload }
    default: return state
  }
}    
interface HomePageProps {
  searchTerm: string;
  handleAddToCart: (e: Event) => void;
  handleOpen: (e:Event) => void;
  cart: Event[];
}


function Home({handleAddToCart, cart, searchTerm, handleOpen}: HomePageProps) {

  const [allEvents, setAllEvents] = useState<Event[]>([]);
  let filteredArray: Event[] = allEvents;
  const base_url = "https://teclead-ventures.github.io/data/london-events.json";
  const [{ loading, error }, dispatch] = useReducer<
  React.Reducer<State, Action>
  >(reducer, initialState);

  const [show, setShow] = useState<boolean>(false);
  const downAndUp = () => {
      if(window.scrollY > 20) {
          setShow(true);
      } else { setShow(false);}
  };

 filteredArray = searchTerm !== "" ? (allEvents.filter(event =>
 event.title.toLowerCase().includes(searchTerm.toLowerCase())) ): (cart.length > 0 ? (allEvents.filter((e) => !cart.some((cartitem) => e._id === cartitem._id))) : allEvents);

  useEffect(() => {
    window.addEventListener("scroll", downAndUp);
    return () => window.removeEventListener("scroll", downAndUp);
  }, []);

  useEffect(()=> {
    const fetchData = async () => {
       dispatch({ type: 'FETCH_REQUEST'})
       try {
        const request = await axios.get(base_url)
        dispatch({ type: 'FETCH_SUCCESS', payload: request.data })
        setAllEvents(request.data);       
        allEvents.map(event => {
          if(!sortedDateArray.includes(event.date.slice(0,10))) { 
            sortedDateArray = [...sortedDateArray, event.date.slice(0,10)];
          }
          finalDateArray = sortedDateArray.map(date => new Date (date)).sort((date1, date2) => Number(date1) - Number(date2))
        })

       } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err as APiErr) }) 
       } 
    } 
    fetchData();
  }, [allEvents])
 
  return (
    <div>      
      <Chip label="Public Events" sx={{ mb: '2%', mt: '2%', mr: '72%', color: blue[400], fontSize: '20', fontWeight: 'bold' }}/>

          {  finalDateArray.map( (date, index) => {
                   return (
                    <div key={index}>
                       <div className={`box ${show && 'box-color'}`}>
                 <Item sx={{ mt: '2%', mb: '2%', pl:'10%', fontWeight: 'bold', color: blue[400]}}>{date.toString().slice(0,15)}</Item></div>

                 
               <Grid container spacing={2} sx={{display: 'flex', justifyContent:'center', alignItems:'center'}}columns={{xs: 4, sm: 8, md: 15 }}>
        { 
          filteredArray.map((event, index) => (event.date.slice(0,10) === date.toISOString().slice(0,10) ?
          <Grid item sm={2} md={4} key={index}>
         <EventCard key={event._id}
          event={event}
          onAddToCart={handleAddToCart}
          open={handleOpen} />
          </Grid> : null)) }
    
         </Grid>
        </div>  )})}
      </div>
  )}
export default Home;