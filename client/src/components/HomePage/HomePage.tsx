import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Home from '../Home/Home'
import Header from '../Header';
import { Event } from '../../types/Event';
import EventPage from '../EventPage/EventPage';


function HomePage() {
  const [clicked, setClicked] = useState(false)
  const [cartOpen, setCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cart, setCart] = useState<Event[]>([]);
  const [total, setTotal] = useState(0);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(e.target.value);}
  const handleOpenCartPage = () => {
    setCartOpen(!cartOpen);
  };
   
        const handleAddToCart = (event: Event) => {
          setCart([...cart, event]);
          console.log(cart.length)
          setTotal(total+1);          
        }

const navigate = useNavigate();

const handleOpen = (event: Event) => {
  navigate(`/event/${event._id}`)
  setClicked(true)
}
const backhome = () => {
  navigate("/")
  setClicked(false)
}
const handledelete = (event: Event) => {
  setCart(cart.filter(e => e._id !== event._id))
}
  return (
    <div>
      <Header handleOpenCartPage={handleOpenCartPage} handledelete={handledelete} cart={cart} cartOpen={cartOpen} handleSearch={handleSearch} total={total} backhome={backhome} /> 
      {
        clicked ? <EventPage /> :  
<Home handleAddToCart={handleAddToCart} cart={cart} searchTerm={searchTerm} handleOpen={handleOpen}/>
      }
    </div>
  )
}

export default HomePage