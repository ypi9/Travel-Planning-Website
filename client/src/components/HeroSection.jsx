import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import image from "../assets/Travel_plan_image.jpg"
const HeroSection = () => {

    const handleScroll = () => {
        const nextSection = document.getElementById("discover");
     
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        
        }
    };
    return (
        <Box mt={10} justifyContent={'center'} >
            <img src={image} alt='Travel Plan Image' width={850} height={500} />
            <Typography variant="h2" component="h1">
                Elevate Your Journey
            </Typography>
            <Typography variant="h5" >
                A Guide to Seamless Travel from Takeoff to Touchdown
            </Typography>
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleScroll}
            >
                Get Started
            </Button>
        </Box >
    );
};

export default HeroSection;
