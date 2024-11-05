
import { Autocomplete, Box, Button, Container, TextField } from '@mui/material'
import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import Map from './Map';

//icons
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = () => {

    //this can use fetch or store the constant in constant folder
    const airports = ["airport1", "airport2", "airport3"];
    const [startingAirport, setStartingAirport] = useState([{}]);
    const [destinationAiport, setDestinationAirport] = useState([{}]);
    
    //input values 
    const [depart, setDepart] = useState(null);
    const [dest, setDest] = useState(null);
    const [departDate, setDepartDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);


    return (
        <Box>
            <Container

                sx={{
                    mt: 15, display: 'flex', flexDirection: 'row', alignItems: "center", borderColor: "black"
                }} >

                {/* departure airport box */}

                <Autocomplete

                    //set the width
                    sx={{ width: 300, }}

                    // option selection
                    options={airports}

                    // required props
                    //display the avaliable selection upon type
                    renderInput={(params) =>


                        <TextField {...params} placeholder='Your dream place to relax '
                            label="From"
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (<FlightTakeoffIcon />),
                            }} />



                    }

                    //value={depart}

                    onChange={(event1, newValue) => setDepart(newValue)}

                />
                {/* usin dayJS libaray for datepicker */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker value={departDate} onChange={(newDate) => setDepartDate(newDate)} />
                    <DatePicker value={returnDate} onChange={(newDate) => setReturnDate(newDate)} />

                </LocalizationProvider>

                {/* arrive airport box */}
                <Autocomplete

                    //set the width
                    sx={{ width: 300, }}

                    // option selection
                    options={airports}

                    // required props
                    //display the avaliable selection upon type
                    renderInput={(params) => <TextField{...params}
                        placeholder='Your dream place to relax '
                        label="To"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (<FlightLandIcon />),

                        }}
                    />}

                    value={dest}

                    onChange={(event, newValue) => setDest(newValue)}

                />

                <Button sx={{}}
                    onClick={() => {
                        alert("You clicked the Search Button!")
                        setStartingAirport([{
                            "latitude": 37.6213,
                            "longitude": -122.3790,
                            "full_name": "San Francisco International Airport",
                            "website": "https://www.flysfo.com/"
                        }, {
                            "latitude": 42.2121,
                            "longitude": -83.3534,
                            "full_name": "Detroit Metropolitan Wayne County Airport",
                            "website": "https://www.metroairport.com/"
                        }])
                        alert("length is " + `${startingAirport.length}`)
                        return;
                    }}>
                    <SearchIcon />
                </Button>

            </Container>
            <Box>
                {console.log("update airport length" + `${startingAirport.length}`)}
                <Map departureAirport={startingAirport} arrivalAirport={destinationAiport} />
            </Box>

        </Box>


    )
}

export default SearchBox