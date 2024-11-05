import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import NavBar from './components/NavBar'

import {
  MainPage,
  SearchTicketWithBudget,
  TravelPlanning,
  SearchingTripPlan,
  HomePage,
  Relogin404Page
} from './pages/index.js'

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log(localStorage.getItem("isAuthenticated"))

  return (
    <>
      <NavBar />
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mainsearch" element={<MainPage />} />
          <Route path="/budget" element={<SearchTicketWithBudget />} />
          <Route path="/plan/entertainments/search/:startingAirport/:destinationAirport/:duration?" element={isAuthenticated ? <TravelPlanning /> : <Navigate to="/login404" />} />
          <Route path="/plan" element={<SearchingTripPlan />} />
          <Route path="/login404" element={<Relogin404Page />} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
