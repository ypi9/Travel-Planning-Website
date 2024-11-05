import { Autocomplete, Box, Button, Container, TextField, Typography } from '@mui/material'
import {  useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import FlightTicketsTable from '../components/FlightTicketsTable';
import { GoogleMap, useLoadScript, MarkerF, PolylineF, InfoWindowF } from "@react-google-maps/api";
import config from "../config.json"
import dayjs from 'dayjs';
import { airportsInfos } from '../constant';

//icons
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

import SearchIcon from '@mui/icons-material/Search';


const SearchTicketWithBudget = () => {

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

  const [departDate, setDepartDate] = useState(dayjs('2022-04-20'));
  //const [returnDate, setReturnDate] = useState(null);
  const [budgetValue, setBudgetValue] = useState('');
  //datahook for storing the fetched data
  const [data, setData] = useState([]);


  //for map components 
  //map loader variable 
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: config.REACT_APP_GOOGLE_API_KEY

  });

  //map hooks 
  const [startingAirport, setStartingAirport] = useState([]);
  const [destinationAirports, setdestinationAirports] = useState([]);

  const search = () => {
    const convertedDepartDate = dayjs(departDate).format('YYYY-MM-DD');

    fetch(`http://localhost:8080/budget?departureDate=${convertedDepartDate}` +
      `&startingAirport=${depart.code}&budget=${budgetValue}`
    )
      .then(res => res.json())
      .then(resJson => {

        setData(resJson);

      });
  }

  //hanlders
  // const handleChangeBudget = (e) => (
  //   setBudgetValue(e.target.value)

  // )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center' }}>
      <Container

        sx={{
          mt: 15, display: 'flex', flexDirection: 'row', borderColor: "black", justifyContent: 'center'
        }} >

        {/* departure airport box */}

        <Autocomplete

          //set the width
          sx={{ width: 300, }}

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
        {/* usin dayJS libaray for datepicker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker value={departDate} onChange={(newDate) => setDepartDate(newDate)} />
          {/* <DatePicker value={returnDate} onChange={(newDate) => setReturnDate(newDate)} /> */}

        </LocalizationProvider>

        <TextField
          label="Enter Your Budget"
          variant="outlined"
          value={budgetValue}
          onChange={(e) => setBudgetValue(e.target.value)}
        />

        <Button sx={{}}
          onClick={() => {

            setStartingAirport([depart]);
            //setdestinationAirports([dest]);
            search();
            return;
          }}>
          <SearchIcon />
        </Button>

      </Container>

      {/* Map component */}

      <Box sx={{ my: 5 }}>
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap

            //disable the control
            options={{
              // remove the zoomcontrol  
              gestureHandling: "none",
              zoomControl: false,

              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: false
            }}
            mapContainerStyle={{
              height: "550px",
              width: "1000px",
              position: 'relative',

            }}

            center={{ lat: 39.8283, lng: -98.5795 }}
            zoom={4}

          >
            {/* Rendering the starting aiport marker in google map */}
            {startingAirport.length !== 0 ?
              (
                startingAirport.map((obj, idx) => {
                  const lat = parseInt(obj.latitude);
                  const lng = parseInt(obj.longitude);
                  return (
                    <Box key={idx}>
                      <MarkerF

                        position={{ lat: lat, lng: lng }} />

                      {/* <InfoWindowF
                        position={{ lat: lat, lng: lng }}
                        options={{
                          pixelOffset: {
                            width: 0,
                            height: -10
                          }
                        }}
                        zIndex={5}>
                        <Typography sx={{ fontSize: "10" }}> {obj.code}</Typography>
                      </InfoWindowF> */}
                    </Box>)
                })) : null}


            {destinationAirports.length !== 0 ?
              (
                destinationAirports.map((obj, idx) => {
                  return <MarkerF key={idx} position={{ lat: obj.latitude, lng: obj.longitude }} />
                }
                )) : null}


            {destinationAirports.length !== 0 && startingAirport !== 0 ?
              (
                destinationAirports.map((obj, idx) => {
                  return <PolylineF
                    key={idx}
                    options={{
                      strokeColor: "blue",
                      geodesic: true,
                      strokeOpacity: 0,
                      icons: [
                        {
                          icon: {
                            //svg string M is move 
                            //move from (0,-1) to (0,1.5)
                            path: "M 0,-1 0,1.5",
                            strokeOpacity: 1,
                            strokeWeight: 1.5,
                            scale: 4,
                          },
                          offset: "0",
                          repeat: "20px",
                        },
                      ]
                    }}

                    path={[
                      { lat: startingAirport[0].latitude, lng: startingAirport[0].longitude },
                      { lat: obj.latitude, lng: obj.longitude }]} />
                }
                )) : null}

          </GoogleMap>)}
      </Box>
      

    <Box>
        {data != null && data.length !==0 ? <FlightTicketsTable flightData={data} /> : null}
      </Box>
    </Box>

  )
}

export default SearchTicketWithBudget