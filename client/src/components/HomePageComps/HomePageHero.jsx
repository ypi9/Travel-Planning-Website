import React from 'react';
import { Button, Container, IconButton, Stack, Typography, Divider } from '@mui/material';
import HomebgImg from "../../assets/Home_bg.jpg"

//icons
import FlightIcon from '@mui/icons-material/Flight';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EditNoteIcon from '@mui/icons-material/EditNote';
const HomePageHero = () => {

    const items = [
        {
            href: "/mainsearch",
            text: "Flights",
            icon: <FlightIcon fontSize='large' />
        },
        {
            href: "/budget",
            text: "Budget Flights",
            icon: <AttachMoneyIcon fontSize='large' />
        },

        {
            href: "/plan",
            text: "Travel Plan",
            icon: <EditNoteIcon fontSize='large' />
        },

    ];
    return (
        <Container mt={10}  >

            <Stack spacing={4} sx={{ justifyContent: "center" }}>
                <img src={HomebgImg} alt='Travel Plan Image' width={'fill'} height={500} />
                <Typography variant="h3" component="h1">
                    Unlock the Perfect Travel Plan!
                </Typography>
                <Typography variant="h5" >
                    Embark on your next adventure with ease!
                    Our intuitive travel planning platform is here to craft your perfect journey. From dreamy destinations to personalized itineraries,
                    let us turn your travel aspirations into reality. Start your voyage now – your seamless and unforgettable experience awaits!
                </Typography>
                <Divider color={'black'} />
            </Stack>

            <Stack mt={3} spacing={15} direction='row' justifyContent={'space-between'}>
                {
                    // sx is styling 
                    items.map((item, index) => (

                        <Button key={index}
                            href={item.href}
                            variant='contained'


                            sx={{
                                fontSize: 20,
                                borderRadius: 3,
                                textTransform: "capitalize",
                                backgroundColor: 'white',
                                color: '#1d1716',
                                width: 150,
                                opacity: 0.5,
                                '&:hover': {
                                    backgroundColor: 'inherit',
                                    opacity: 1
                                }
                            }}>
                            <Stack sx={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
                                <IconButton size='large' color="inherit">{item.icon}</IconButton>

                                <Typography>{item.text}</Typography>
                                <Divider flexItem sx={{ mt: 2, mb: 1, backgroundColor: '#CDCDCD',opacity:"inherit"}} />
                            </Stack>


                        </Button>

                    ))}
            </Stack >
        </Container >
    );
};

export default HomePageHero;
