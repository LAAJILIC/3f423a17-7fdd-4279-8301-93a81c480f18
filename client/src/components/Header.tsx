import React from 'react';
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
import { Event } from '../types/Event';
import Cart from './Cart/Cart';

    
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

  // TypesProps
    interface HeaderProps {
      cart: Event[];
      cartOpen: boolean;
      handleOpenCartPage: () => void;
      handledelete: (event: Event) => void;
      backhome: () => void;
      handleSearch:  (e: React.ChangeEvent<HTMLInputElement>)  => void;
      total: number;
    }
    
   function Header({handleOpenCartPage, handledelete, cart, cartOpen, handleSearch, total, backhome}: HeaderProps) {
    return (
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
              <IconButton onClick={backhome}
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
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
          
                <IconButton onClick={handleOpenCartPage}>
                <Badge badgeContent={total} color="error">
                  <ShoppingCartIcon />
                  </Badge>
               </IconButton>
          {
            cartOpen ? (
              <Cart cart={cart} handledelete={handledelete}/>
            ) : null
          }
               </Toolbar><Box />
            </Toolbar>
          </AppBar>
        </Box> 
      )}

        export default Header
