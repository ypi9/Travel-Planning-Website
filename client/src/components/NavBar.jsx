import React from 'react'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import AirplaneTicketOutlinedIcon from '@mui/icons-material/AirplaneTicketOutlined';
import LoginButton from './Auth0/LoginButton';
import LogoutButton from './Auth0/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';


const NavBar = () => {

  const{isAuthenticated} = useAuth0();
  const items = [
    {
      href: "/mainsearch",
      text: "Flights",

    },
    {
      href: "/budget",
      text: "Budget Flights",
   
    },

    {
      href: "/plan",
      text: "Travel Plan",

    },

  ];


  return (
    <AppBar postion="static" sx={{ px: 20, bgcolor: "white", color: "black" }}>
      <Toolbar >

        {/* put the logo. inherit color from parent. 
      edge ="start" gives some negative a negative margin to counteract the padding 
      it moves the icon to the left*/}
          <Button href='\' sx={{color:'black', textTransform:"capitalize"}}>
        <IconButton edge="start" color="inherit" aria-label="flight logo" sx={{ mr: 2 }}>
          <AirplaneTicketOutlinedIcon />
        </IconButton>
        {/* text h6 size and treat it like a div  */}
        <Typography variant='h6' >
          FlexAir
        </Typography>
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{
          display: 'flex', flexDirection: 'row', alignItems: "center",
        }} >
          {
            // sx is styling 
             items.map((item, index) => (
              <Button key={index}
                href={item.href}

                sx={{
                  my: 2, color: 'black', display: 'block', textTransform: "capitalize",
                  '&:hover': {
                    color: "blue"
                  }
                }}>
                
                {item.text}
              </Button>
            ))}
         
          {isAuthenticated?<LogoutButton/>:<LoginButton/>}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar