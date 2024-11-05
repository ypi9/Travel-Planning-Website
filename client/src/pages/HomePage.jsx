import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import UserProfile from '../components/Auth0/UserProfile';
import { Box } from '@mui/material';
import UserProfileBGimg from '../assets/User_Profile_bg.jpg';
import HomePageHero from '../components/HomePageComps/HomePageHero';
const HomePage = () => {

    const { user, isAuthenticated, isLoading } = useAuth0();
    return (
        isAuthenticated 
        ?<Box
            sx={{
                mt: 9,
                backgroundImage: `url(${UserProfileBGimg})`,
                height: 1000,
                backgroundSize: '2000px 1000px'
            }}
        > <UserProfile /></Box>
        :<HomePageHero/>
    )
}

export default HomePage