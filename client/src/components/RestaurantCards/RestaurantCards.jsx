import { Box, Typography } from "@mui/material"
import { useState } from 'react'
import config from "../../config.json"
import RestaurantCard from "./RestaurantCard"

const RestaurantCards = ({ latitude, longitude, type }) => {

    const [data, setData] = useState(null);

    // set proxy in vite.config.js 
    useMemo(() => {
        fetch(`/api/googleApi/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=${type}&key=${config.REACT_APP_GOOGLE_API_KEY}`)
            .then(res => {
                return res.json();
            })
            .then(resJson => {
                setData(resJson);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [latitude, longitude, type]);

    //check the fecth result
    if (data == null || Object.keys(data.results).length == 0) return <div> No data after Fetch</div>


    return (
        <Box mt={5}>
        <Typography variant="h4">Recommended Restaurants In the Airport </Typography>
      
        <Box
            sx={{
                mt:2,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'row',
                justifyContent:'center'
            }}>
            {data.results.map((place, idx) => (
                idx < 5 ? <RestaurantCard key={idx} placeId={place.place_id} /> : null
            ))}
        </Box>
          </Box>
    )
}

export default RestaurantCards