# Travel-Planning-Website
## Lively Demo
https://drive.google.com/file/d/1ME593sVDGRn9xoqnFx7b-uDYgyjs4tEK/view?usp=sharing

## Introduction
### Project Goals and Motivation
Flight Companion was developed to enhance the travel planning experience, especially for international students and travelers who frequently face long-haul flights with multiple layovers. Our goal is to create a user-friendly web application that aids travelers in planning their trips, optimizing for budget, minimizing layovers, preparing for weather conditions, and providing tailored in-flight entertainment suggestions.

### Addressing Common Traveler Concerns
- Finding the Best Price: Aggregates and compares flight prices from multiple sources to help users find affordable flights.
- Minimizing Layovers: Helps users identify flights with fewer or shorter layovers.
- Weather Information: Offers up-to-date weather forecasts for departure and arrival airports.
- Entertainment Recommendations: Suggests movies and shows based on preferences to make long flights enjoyable.

### Application Functionality
- Flight Search: Finds the best flight options based on user-defined source, destination, and travel date.
- Entertainment Recommendations: Personalized movie/TV show recommendations based on user preferences.
- Multi-Stop Travel Planning: Plans round-trip or multi-stop air travel within budgetary constraints.
- Weather Forecast: Provides weather details for departure and arrival airports

### Architecture
**Technologies Used**
- Frontend: React.js with Material UI for a modern, responsive interface.
- Backend: Express.js for API routing and database interactions, CORS for security, and Nodemon for server-side live reloading.
- Database: MySQL for data storage and handling.

**System Overview**
- Flight Data: Stores flight prices, routes, and layover information.
- Movie/TV Show Data: Holds data on entertainment options for in-flight recommendations.
- API Integrations: Utilizes Open Weather and Google Places APIs for real-time data.

### Data Sources
1. Flight Prices: Kaggle: Flight Prices
2. Entertainment: Movies and TV shows data from Netflix, Prime Video, Disney+, Hulu.
3. Weather and Flight Data: Amadeus API for flight routes and OpenSky’s historical flight data.

### Installation
1. Clone the Repository:
```
git clone https://github.com/yourusername/flight-companion.git
cd flight-companion
```
2. Install Dependencies:
```
npm install
```
3. Set up the Database:
- Import data into MySQL from the provided datasets.
- Configure database connection settings in the backend.
4. Run the Application:
```
npm start
```

### Usage
**Flight Search**
- Enter departure and destination cities, travel date, and budget to view recommended flights and entertainment options.

**Budget Travel**
- Input only the budget and departure airport to get travel suggestions within your range.

**Entertainment Recommendations**
- Based on user preferences (genre, platform, duration), the system will recommend movies/shows for in-flight viewing.
  
