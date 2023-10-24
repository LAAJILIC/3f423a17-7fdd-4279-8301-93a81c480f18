import React, { useReducer, useEffect, useState } from 'react'
import { getError } from '../../utils'
import { APiErr } from '../../types/ApiErr'
import { CartItemType } from '../../types/cartItem'
import { Event } from '../../types/Event';
import Item from '@mui/material/ListItem'
import { blue } from '@mui/material/colors';
import axios from '../../axios'
import { Helmet } from 'react-helmet-async'
import EventCard from '../../components/EventCard'
import Grid from '@mui/material/Grid';
import { Chip, ListItem, Stack } from '@mui/material'
import './HomePage.css'
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
import { Outlet } from 'react-router-dom';


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

let initialState: State = {
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
    default: return state
  }
}    


function HomePage() {
  const [eventsRow, setEventsRow] = useState<Event[]>([]);
  const base_url = "https://teclead-ventures.github.io/data/london-events.json";
  const [{ loading, error }, dispatch] = useReducer<
  React.Reducer<State, Action>
  >(reducer, initialState);
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
        setEventsRow(request.data);       
        //eventsRow.map(event => console.log(event.date));
        eventsRow.map(event => {
          //console.log(event.date.slice(0,10));
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
  })
 //the dependencies array does not should contain the evenetsRow otherwise it will lead to a infinite loop

//  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
//  const [cartItem, setCartItem] = useState<CartItemType>();
//  const [itemToCart, setItemToCart] = useState<Event>();

//   let nb: number;
//   //let : Event = {};
//   const handleAddToCart = (id: string) => {

//     setItemToCart(eventsRow.find((event) => event._id === id));
//     console.log(itemToCart)
//     eventsRow.filter(event => event._id !== id)
//     // setCartItems(cartItems.push(isItemInCart))
//     setCartItem({
//       _id: itemToCart._id,
//       title: itemToCart.title,
//       flyerFront: itemToCart.flyerFront,
//       date: itemToCart?.date,
//       city: itemToCart?.city,
//       country: itemToCart?.country,
//       amount: 1,
//     })
     
//     setCartItems((prev) => {
//       if (isItemInCart) {
//         return prev.map((item) =>
//           item._id === id
//             ? { ...item, nb: 1}
//             : item
//         );
//       }
//       return [...prev, { ...cartItem, amount: nb+1 }];
//     }); console.log(cartItems)
//   };


const [cartOpen, setCartOpen] = useState(false);
// const [cartItems, setCartItems] = useState<CartItemType[]>([]);
// const getTotalItems = (items: CartItemType[]) =>
// items.reduce((acc, item) => acc + 1, 0);
const [searchTerm, setSearchTerm] = useState<string>('');


const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
setSearchTerm(e.target.value);}

const filteredEvents = searchTerm !== "" ? eventsRow.filter(event =>
  event.title.toLowerCase().includes(searchTerm.toLowerCase())) : eventsRow;


  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
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
                <IconButton onClick={() => setCartOpen(true)}>
                {/* <Badge badgeContent={total} color="error"> */}
                <Badge badgeContent={3} color="error">

                  {/* <Badge badgeContent={getTotalItems(cartItems)} color="error"> */}
                  <ShoppingCartIcon />
                  </Badge>
               </IconButton>
          
               </Toolbar><Box />
            </Toolbar>
          </AppBar>
        </Box>
      
      {/* <Header />  */}
      <Chip label="Public Events" sx={{ mb: '2%', mt: '2%', justifyContent:'left', bgcolor: blue[200], fontWeight: 'bold'}}/>

          {  finalDateArray.map( date => {
                   return (
                    <div>
                       <div className={`box ${show && 'box-color'}`}>
                 <Item sx={{ mb: '2%', pl:'22%', fontWeight: 'bold', color: blue[400]}}>{date.toString().slice(0,15)}</Item></div>

                 
               <Grid container spacing={2} sx={{display: 'flex', justifyContent:'right', alignItems:'center'}}columns={{xs: 4, sm: 8, md: 15 }}>
        { 
          filteredEvents.map((event, index) => (event.date.slice(0,10) === date.toISOString().slice(0,10) ?
          <Grid item sm={2} md={4} key={index}>
         <EventCard title={event.title} artists={event.artists} _id={event._id} flyerFront={event.flyerFront}
         attending={event.attending} date={event.date} startTime={event.startTime} endTime={event.endTime}
         contentUrl={event.contentUrl} venue={event.venue} city={event.city} country={event.country}
         private={event.private} __v={event.__v} />
         
          </Grid> : null)) }
    
         </Grid>
        </div>  )})}
      </div>
  )}
////////////////////////////////////////
export default HomePage