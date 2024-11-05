import { useEffect, useRef, useState } from 'react'

import {
  Box, FormControl,
  Select, MenuItem, Container, InputLabel
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';

import movieBGimg from "../assets/moive_bg.jpg"

const ShowRecommendationTable = ({ movies }) => {

  const [movieData, setMovieData] = useState(null);
  useEffect(() => {

    setMovieData(movies)
  }, [movies])
  //useref hook to store the field and sort value
  const selectedField = useRef('show_id');
  const selectedSort = useRef('asc');
  const selectedPlatform = useRef("");
  //data grid 
  // the sort model is none at beginning
  const [sortModel, setSortModel] = useState([]);


  const [filterModel, setFilterModel] = useState({
    items: [
      {
        field: "show_id",
        operator: 'startsWith',
        value: selectedPlatform.current,
      }
    ],
  });

  if (movieData === null) return <></>
  //handlers
  const handleChangeField = (e) => {
    selectedField.current = e.target.value;
    setSortModel([
      {
        field: selectedField.current,
        sort: selectedSort.current,
      },
    ])
    return;
  }

  const handleSortOrder = (e) => {
    selectedSort.current = e.target.value;
    setSortModel([
      {
        field: selectedField.current,
        sort: selectedSort.current,
      },
    ])

    return;
  }


  const handleChangeFilteredPlatForm = (e) => {
    selectedPlatform.current = e.target.value === 'all' ? "" : e.target.value;
    setFilterModel({
      items: [{
        field: "show_id",
        operator: 'startsWith',
        value: selectedPlatform.current,
      },]
    })

    return;
  }

  const columns = [
    { "field": "show_id", "headerName": "Show ID" },
    { "field": "title", "headerName": "Title", width: 200 },
    { "field": "duration", "headerName": "Duration (in minutes)", width: 200 },
    { "field": "type", "headerName": "Content Type" },
    { "field": "genre", "headerName": "Genre", width: 150 },
    { "field": "country", "headerName": "Country of Origin", width: 200 },
    { "field": "release_year", "headerName": "Release Year" }
  ];

  //pass the header list into a array 
  // const listOfHeaderName = columns.map((obj) => (obj.headerName));


  return (

    <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center', backgroundImage: `url(${movieBGimg})` }}>

      <Box sx={{ mt: 10, width: 1100, background: "linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8))" }} >
        <Box sx={{ m: 4, display: 'flex', justifyContent: "end" }}>


          <FormControl sx={{ width: 300 }}>
            <InputLabel id="Streaming-Flatform">Streaming Flatform</InputLabel>
            <Select id='Streaming-Flatform'
              label="Streaming Flatform"
              sx={{ width: 200 }}
              value={selectedPlatform.current}
              onChange={handleChangeFilteredPlatForm}

            >
              <MenuItem value={"all"}> Show ALL </MenuItem>
              <MenuItem value={"amazon"}> Amazon Prime Videos </MenuItem>
              <MenuItem value={"disney"}> Disney Plus</MenuItem>
              <MenuItem value={"hulu"}> Hulu</MenuItem>
              <MenuItem value={"netflix"}> Netflix</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: 300 }}>
            <InputLabel id="header">Field</InputLabel>
            <Select id='header'
              label="Field"
              sx={{ width: 200 }}
              value={selectedField.current}
              onChange={handleChangeField}

            >
              {columns.map((column, idx) => (<MenuItem key={idx} value={column.field}> {column.headerName} </MenuItem>))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: 150 }}>
            <InputLabel id="header">Order By</InputLabel>
            <Select
              id='sort-order' x={{ width: 200 }}
              value={selectedSort.current}
              onChange={handleSortOrder}
              label="Order By"
            >
              <MenuItem value={"desc"}> Descending</MenuItem>
              <MenuItem value={"asc"}> Ascending </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Movie box  */}
        <DataGrid align="right" headerAlign="left"
          rows={movieData}
          columns={columns}

          pageSizeOptions={[5, 10, 25, 100]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          autoHeight
          getRowId={(row) => row.show_id}
          //sorting 
          sortModel={sortModel}
          filterModel={filterModel}
        />  
        </Box>
        
    </Box>

  )
}

export default ShowRecommendationTable