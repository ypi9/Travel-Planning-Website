
import {  Box, Typography, Link, Divider } from '@mui/material'

import { airportCodes } from '../../constant';
import WeatherCards from '../7DaysWeatherReport/WeatherCards';
import RestaurantsCards from '../RestaurantCards/RestaurantCards';

const AirportInfoBox = ({ airportIATA ,isStartingAiport}) => {

    const airportObj = airportCodes[airportIATA];
  
    return (
        <Box sx={{ my:5, borderRadius: 6, border: "5px  solid black" }}>

            <Typography variant='h4'> {isStartingAiport?"Starting Airport":"Destination Airport"}: {airportIATA}-{airportCodes[airportIATA] ? airportCodes[airportIATA].name : null} </Typography>

            {/* target={"_blank"} open link in a new tab
          setting rel to noopener noreferrer is to prevent a type of phishing known as tabnabbing */}
            <Typography variant='h5'> Airport website: <Link target={"_blank"} rel={"noreferrer noopener"} href={airportObj.website}>{airportObj.website}</Link>  </Typography>


            <WeatherCards latitude={airportObj.latitude} longitude={airportObj.longitude} />
            <Divider/>
            <RestaurantsCards latitude={airportObj.latitude} longitude={airportObj.longitude} type={"restaurant"} />

        </Box>
    )
}

export default AirportInfoBox