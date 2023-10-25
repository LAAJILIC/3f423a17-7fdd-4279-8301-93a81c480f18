import React, { useReducer, useEffect, useState } from 'react'
import { getError, getTotal } from '../../utils'
import { APiErr } from '../../types/ApiErr'
import { Event } from '../../types/Event';
import Item from '@mui/material/ListItem'
import { blue } from '@mui/material/colors';
import axios from '../../axios'
import { Helmet } from 'react-helmet-async'
import EventCard from '../../components/EventCard'
import Grid from '@mui/material/Grid';
import { Chip } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';

import './HomePage.css'
import Cart from '../../components/Cart/Cart';

    //Styling 
    
    const Search = styled('div')(({ theme }) => ({
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    }));
    
    const SearchIconWrapper = styled('div')(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }));
    
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
    }));


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

function HomePage() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  let filteredArray: Event[] = allEvents;
  //const [filteredArray,setfilteredArray] = useState<Event[]>([]);
  const base_url = "https://teclead-ventures.github.io/data/london-events.json";
  const [{ loading, error }, dispatch] = useReducer<
  React.Reducer<State, Action>
  >(reducer, initialState);
///////////
const [searchTerm, setSearchTerm] = useState<string>('');
const [cart, setCart] = useState<Event[]>([]);
const [cartOpen, setCartOpen] = useState(false);
const [total, setTotal] = useState(initialState.eventsInCart)
const [addId, setAddId] = useState<string>('');


const handleAddToCart = (event: Event) => {
  setAddId(event._id)
  setCart([...cart, event]);
  console.log(cart.length)
  setTotal(total+1);
  console.log(addId);}

const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
setSearchTerm(e.target.value);}



 filteredArray = searchTerm !== "" ? (allEvents.filter(event =>
event.title.toLowerCase().includes(searchTerm.toLowerCase())) ): (cart.length > 0 ? (allEvents.filter((e) => !cart.some((cartitem) => e._id === cartitem._id))) : allEvents);


// arrayA.filter((objA) => !cart.some((cartitem) => e._id === cartitem._id));
// useEffect(()=> {
//   dispatch({ type: 'ADD', payload: getTotal(total as number)});
//   console.log(total)
// },[total])

const handleOpenCartPage = () => {
  setCartOpen(true);
};
  const [show, setShow] = useState<boolean>(false);
  const downAndUp = () => {
      if(window.scrollY > 50) {
          setShow(true);
      } else { setShow(false);}
  };

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
      <Box sx={{ flexGrow: 1, position:'relative' }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              {/*  */}
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 0 }}
              >
                 <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                Home
              </Typography>
              </IconButton>
                           {/*  */}
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={handleSearch}
                  />
              </Search>
                           {/*  */}

              <Box sx={{ flexGrow: 1}} />
              <Toolbar sx={{ flexGrow: 0.2, justifyContent: 'space-around' }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 0 }}
              >
                 <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block', mr: '0%' } }}
              >
                Orders
              </Typography>
              </IconButton>
             
                            {/*  */}
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                {/* <IconButton onClick={()=> navigate(`/cart`)}> */}
                <IconButton onClick={handleOpenCartPage}>
                {/* <Badge badgeContent={total} color="error"> */}
                <Badge badgeContent={total} color="error">
                  <ShoppingCartIcon />
                  </Badge>
               </IconButton>
          {
            cartOpen ? (
              <Cart cart={cart}/>
            ) : null
          }
               </Toolbar><Box />
            </Toolbar>
          </AppBar>
        </Box>
      
      <Chip label="Public Events" sx={{ mb: '2%', mt: '2%', justifyContent:'left', bgcolor: blue[200], fontWeight: 'bold'}}/>

          {  finalDateArray.map( (date, index) => {
                   return (
                    <div key={index}>
                       <div className={`box ${show && 'box-color'}`}>
                 <Item sx={{ mb: '2%', pl:'22%', fontWeight: 'bold', color: blue[400]}}>{date.toString().slice(0,15)}</Item></div>

                 
               <Grid container spacing={2} sx={{display: 'flex', justifyContent:'right', alignItems:'center'}}columns={{xs: 4, sm: 8, md: 15 }}>
        { 
          filteredArray.map((event, index) => (event.date.slice(0,10) === date.toISOString().slice(0,10) ?
          <Grid item sm={2} md={4} key={index}>
         <EventCard key={event._id}
          event={event}
          onAddToCart={handleAddToCart}/>
         
          </Grid> : null)) }
    
         </Grid>
        </div>  )})}
      </div>
  )}
export default HomePage