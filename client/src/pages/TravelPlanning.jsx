import {
    Box, FormControl, Button,
    Select, MenuItem, InputLabel, Typography
} from '@mui/material'

import {useState } from 'react'
import { genres } from '../constant/showSelections';
import { useParams } from 'react-router-dom';
import AirportInfoBox from '../components/AirportInfoBox/AirportInfoBox';
import ShowRecommendationTable from '../components/ShowRecommendationTable';

const TravelPlanning = () => {

    const { startingAirport, destinationAirport, duration } = useParams();
    const [platform, setPlatform] = useState("netflix")
    const [genre, setGenre] = useState("");
    const [type, setType] = useState("");

    const [data, setData] = useState(null);
   
    const search = () => {

        fetch(`http://localhost:8080/recommendations?duration=${duration}` +
            `&platform=${platform === 'all' ? "" : platform}` +
            `&type=${type === 'all' ? "" : type}` +
            `&genre=${genre === 'all' ? "" : genre}`
        )

            .then(res => res.json())
            .then(resJson => {

                console.log(`http://localhost:8080/recommendations?duration=${duration}` +
                    `&platform=${platform === 'all' ? "" : platform}` +
                    `&type=${type === 'all' ? "" : type}` +
                    `&genre=${genre === 'all' ? "" : genre}`)
                setData(resJson);

            });
    }

    return (
        <Box sx={{ mt: 12, display: 'flex', flexDirection: 'column' }}>

            <AirportInfoBox airportIATA={startingAirport} isStartingAiport={true} />
            <AirportInfoBox airportIATA={destinationAirport} isStartingAiport={false} />
            <Typography my={3} variant='h4'>Plan your movietime during the travel! </Typography>
            <Box >
            <Box sx={{
                justifyContent:'center',
                display: 'flex',
            }} >

                {/* Movie Platform select box  */}
                <FormControl sx={{ width: 300 }}>
                    <InputLabel id="Streaming-platform">Streaming Platform</InputLabel>
                    <Select id='Streaming-platform'
                        label="Streaming Platform"
                        sx={{ width: 200 }}
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}

                    >

                        <MenuItem value={"amazon"}> Amazon Prime Videos </MenuItem>
                        <MenuItem value={"disney"}> Disney Plus</MenuItem>
                        <MenuItem value={"hulu"}> Hulu</MenuItem>
                        <MenuItem value={"netflix"}> Netflix</MenuItem>
                    </Select>
                </FormControl>

                {/* Genre select box */}
                <FormControl sx={{ width: 300 }}>
                    <InputLabel id="Streaming-genre">Genre</InputLabel>
                    <Select id='Streaming-genre'
                        label="Genre"
                        sx={{ width: 200 }}
                        value={genre}
                        onChange={(e) => { setGenre(e.target.value) }}
                    >
                        <MenuItem value={"all"}> Show All </MenuItem>
                        {genres.map((obj, idx) => <MenuItem key={idx} value={obj}> {obj} </MenuItem>)}

                    </Select>
                </FormControl>

                {/* Movie Type select box */}
                <FormControl sx={{ width: 300 }}>
                    <InputLabel id="Streaming-type">Type</InputLabel>
                    <Select id='Streaming-type'
                        label="Type"
                        sx={{ width: 200 }}
                        value={type}
                        onChange={(e) => { setType(e.target.value) }}
                    >
                        <MenuItem value={"all"}> Show All </MenuItem>
                        <MenuItem value={"Movie"}> Movie </MenuItem>
                        <MenuItem value={"TV Show"}> TV Show</MenuItem>
                    </Select>
                </FormControl>

                <Button variant="contained" color='primary' onClick={
                    () => search()
                } >
                    Explore Shows
                </Button>

            </Box>


            {/* Generated movie table */}
            {
                //  
                data != null ? <ShowRecommendationTable movies={data} /> : null
            }
            </Box>
        </Box >
    )
}

export default TravelPlanning