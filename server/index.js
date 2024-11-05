import cors from "cors"
import express from "express"
const app = express();
app.use(cors());
import { search_flight, search_flight_withBudget, recommendations } from './routers.js';



//page 1 flight search
app.get('/main_search', search_flight);

app.get('/budget', search_flight_withBudget);


//page 3 recommendations
app.get('/recommendations', recommendations);


// //Trip date and departure and destination airport trip duration.
// app.get('/page3', routers.tripPlans);

//lisening at port 8080 client
// the port number specify at ./client/vite.config.js 

app.listen(8080, () => console.log('Server has started on port 8080'))