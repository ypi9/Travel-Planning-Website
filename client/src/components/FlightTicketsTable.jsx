//react import
import { useState, useEffect } from 'react'
//css import
import {  Link, Box, Typography ,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, CircularProgress } from '@mui/material';

//icon import
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { airlineLogos } from '../constant';
import Pennlogo from "../assets/AirlineLogos/UniversityofPennsylvania_Shield_RGB.png"
//helper functions import
import { convertTimeStringToMinutes } from '../processor/helper';

const FlightTicketsTable = ({ flightData }) => {

  const [data, setData] = useState(null);
  const [page, setPage] = useState(1); // 1 indexed
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setData(flightData)
    console.log("data is " + data)
  }, [flightData])


  const handleChangePage = (e, newPage) => {
   
    
     setPage(newPage + 1);
      
  }


  const handleChangePageSize = (e) => {
    // when handling events such as changing a selection box or typing into a text box,
    // the handler is called with parameter e (the event) and the value is e.target.value
    const newPageSize = e.target.value;

    setPageSize(newPageSize);
    setPage(1);
   
  }

  if (data == null) return <></>

  return (

    <TableContainer>
      <Table sx={{ width: 1000 }}>
        <TableHead>
        </TableHead>
        <TableBody sx={{ borderBlockColor: "black" }}>
          {(pageSize > 0
            ? data.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
            : data
          )

            .map((row, idx) => {
              const departureTime = new Date(row.departureTime).toLocaleTimeString('en-US',{hour:"2-digit", minute:"2-digit"});
              const arrivalTime = new Date(row.arrivalTime).toLocaleTimeString('en-US',{hour:"2-digit", minute:"2-digit"});
              const isAirlineLogoinDataBase = airlineLogos.hasOwnProperty(row.airlineCode);
              
              return (<TableRow key={idx} >

                {/* first cell in a row Airline name */}
                <TableCell sx={{}}>
                  {/* {isAirlineLogoinDataBase ? <AALogo/>:<img src={Pennlogo} alt ="4"  />} */}
                  <img src={Pennlogo} alt="4" width={35} height={40} />
                </TableCell>

                {/* second cell */}
                <TableCell sx={{
                  alignItems: 'center', justifyContent: 'start',
                }}>
                  <Box sx={{
                    alignItems: 'center', justifyContent: 'start', display: 'flex', flexDirection: "row",
                  }}>
                    <Typography variant="body1"> {departureTime}</Typography>
                    <HorizontalRuleIcon variant="body1" fontSize='medium' />
                    <Typography variant="body1"> {arrivalTime}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1" fontSize={12}>  {isAirlineLogoinDataBase ? airlineLogos[row.airlineCode].name : row.airlineCode}</Typography>
                  </Box>
                </TableCell>

                {/* thrid cell */}
                <TableCell sx={{
                  alignItems: 'center', justifyContent: 'start',
                }}>
                  <Typography variant="body1"> {row.travelDuration} </Typography>
                  <Box sx={{
                    fontSize: 5, alignItems: 'center', display: 'flex', flexDirection: "row",
                  }}>
                    <Typography variant="body1" fontSize={12}> {row.startingAirport}</Typography>
                    <HorizontalRuleIcon fontSize='small' />
                    <Typography variant="body1" fontSize={12}> {row.destinationAirport}</Typography>
                  </Box>
                </TableCell>

                {/* fourth Cell */}
                <TableCell>
                  <Typography variant="body1">{row.isRefundable == 0 ? "No Refundable" : "Refundable"}</Typography>

                </TableCell>

                {/* fifth Cell */}
                <TableCell>

                  <Typography variant="body1" >${row.totalFare}</Typography>
                </TableCell>
                <TableCell>
                  {/* need convert duration in mins  */}
                  <Link href={`/plan/entertainments/search/${row.startingAirport}/${row.destinationAirport}/${convertTimeStringToMinutes(row.travelDuration) }`}> Prepare your trip
                  </Link>


                </TableCell>
              </TableRow>)
            })}

        </TableBody>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={data.length}
          rowsPerPage={pageSize}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangePageSize}
        />
      </Table>
    </TableContainer>

  )
}

export default FlightTicketsTable