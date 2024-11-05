//hook import
import  { useState, useEffect } from 'react'

//CSS and component import 
import WeatherCard from './WeatherCard';
import { Box, Button, Typography } from '@mui/material';

//constant import
import config from "../../config.json"
const WeatherCards = ({ latitude, longitude }) => {

    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=7&appid=${config.OPEN_WEATHER_API_KEY}`)
            .then(res => res.json())
            .then(resJson => setData(resJson))

    }, [latitude, longitude]);

    const [isInDegreeC, setIsInDegreeC] = useState(false)

    if (data == null) return <>No result</>
    const lists = data.list;
    const country = data.city.country;
    const name = data.city.name;
    const timezone = data.city.timezone;

    return (
        <Box>
            <Typography variant='h5'> Weather in Next 7 days</Typography>
            <Button variant='outlined'

                sx={{
                    left: '2%',
                    borderRadius: 4
                }}
                onClick={() => setIsInDegreeC(!isInDegreeC)}>
                <Typography sx={{ fontWeight: "bold" }}>
                    Display in {isInDegreeC ? "°C" : "°F"}</Typography>
            </Button>

            <Box sx={{
                width: 'fill',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'row',

            }}>

                {lists.map((card, idx) =>
                    (<WeatherCard key={idx} weatherObj={card} isInDegreeC={isInDegreeC} country={country} cityName={name} timezone={timezone + idx*86400} />))}

            </Box>


        </Box>

    )
}

export default WeatherCards