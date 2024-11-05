//react import 
import React, { useState, useEffect } from 'react'
//CSS import
import { Container, Box, Card, CardContent, Typography, Button, Divider } from '@mui/material';

//helper function import
import { degreeC, degreeF, getDate } from '../../processor/helper';

const WeatherCard = ({ weatherObj, isInDegreeC, cityName, country, timezone }) => {

    const [isTempInDegreeC, setIsTempInDegreeC] = useState(isInDegreeC);

    useEffect(() => {
        setIsTempInDegreeC(isInDegreeC);
    }, [isInDegreeC])

    //need check data before deconstruct the parsed object
    if (!weatherObj) {
        return <>No data</>;
    }

    const {
        weather,
        temp,
        feels_like,
        speed,
        humidity,
        clouds,
    } = weatherObj;

    //const country = sys.country;
    return (

        <Card

            sx={{
                borderRadius: 10,
                margin: 2,
                minWidth: 300,
                minHeight: 350,
                background: 'linear-gradient(125deg, #0077bc,#0195ec, #25aef7)',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                transition: 'background-color 0.3s ease-in-out', // Background color transition
                '&:hover': {
                    backgroundColor: '#0077bc',
                }
            }} >
            <CardContent >
                <Typography variant="h5">
                    {cityName ?? cityName}, {country ?? country}
                </Typography>
                <Typography>
                     {getDate(timezone)}
                </Typography>

                <Box
                    component="img"
                    sx={{
                        right: -200,
                        height: 60,
                        width: 60,
                    }}
                    alt="Weather Icon."
                    src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                />
                <Divider sx={{mb:2}}/>
                <Container sx={{ display: 'grid', justifyItems: 'start', justifyContent: 'space-between' }}>


                    <Typography >
                        <strong>Weather:</strong>  {weather[0].main}
                    </Typography>

                    <Typography >
                        {weather[0].description}
                    </Typography>
                    <Typography>
                        <strong>Temperature:</strong> {isTempInDegreeC ? `${degreeC(temp.day)}°C` : `${degreeF(temp.day)}°F`}
                    </Typography>
                    <Typography>
                        <strong>Feels Like:</strong>
                        {isTempInDegreeC ? `${degreeC(feels_like.day)}°C` : `${degreeF(feels_like.day)}°F`}

                    </Typography>
                    <Typography>
                        <strong>Range:</strong>
                        {isTempInDegreeC ?
                            (`${degreeC(temp.min)}°C` + " ~ " + `${degreeC(temp.max)}°C`) :
                            (`${degreeF(temp.min)}°F` + " ~ " + `${degreeF(temp.max)}°F`)}
                    </Typography>

                    <Typography>
                        <strong>Humidity:</strong> {humidity}%
                    </Typography>
                    <Typography>
                        <strong>Wind:</strong> {speed} m/s
                    </Typography>
                    <Typography>
                        <strong>Cloudiness:</strong> {clouds}%
                    </Typography>

                </Container>

            </CardContent>
        </Card >

    );
};

export default WeatherCard