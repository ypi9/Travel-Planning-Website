import { Autocomplete, Box, Button, Container, Divider, TextField, Typography } from '@mui/material'
import {  useState } from 'react'

import { airportCodes, airportsInfos } from '../constant';

//icons
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import SearchIcon from '@mui/icons-material/Search';
import HeroSection from '../components/HeroSection';


const SearchingTripPlan = () => {

  //pass the aiprot infomation array to airports use for list the autocomple options
  const airports = airportsInfos

  //input values 
  //depart and dest is the object of the aiport 
  // depart| dest{
  //     city:,
  //     code: ,
  //     state: ,
  //     country: ,
  //     name: ,
  //     website:,
  // },
  const [depart, setDepart] = useState(null);
  const [dest, setDest] = useState(null);

  //map hooks 
  const [startingAirport, setStartingAirport] = useState([]);
  const [destinationAirports, setdestinationAirports] = useState([]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center' }}>
      <HeroSection />
      {/* <Box height={100}></Box> */}
      
      <Container id={"discover"}

        sx={{
          mt: 5, display: 'flex', flexDirection: 'row', alignItems: "center", borderColor: "black",
          justifyContent: "center"
        }} >

        {/* departure airport box */}

        <Autocomplete

          //set the width
          sx={{ width: 400, }}

          // option selection
          options={airports}

          //optional format
          getOptionLabel={
            (info) =>
            ("(" + info.city + " - " + info.code + ") "
              + info.state + ", " + info.country)}

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

          value={depart}

          onChange={(event, newValue) => setDepart(newValue)}

        />


        {/* arrive airport box */}
        <Autocomplete

          //set the width
          sx={{ width: 400, }}

          // option selection
          options={airports}

          //optional format
          getOptionLabel={
            (info) =>
            ("(" + info.city + " - " + info.code + ") "
              + info.state + ", " + info.country)}
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
          //set the destination
          onChange={(event, newValue) =>
            setDest(newValue)

          }

        />

        <Button 
          onClick={() => {
            setStartingAirport([depart]);
            setdestinationAirports([dest]);
            var newPageUrl = `/plan/entertainments/search/${depart.code}/${dest.code}`;

            // Change the current page location to the new URL
            window.location.href = newPageUrl;
            return;
          }}>
          <SearchIcon />
        </Button>

      </Container>
    </Box>

  )
}

export default SearchingTripPlan