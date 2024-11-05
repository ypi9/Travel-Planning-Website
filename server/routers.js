import mysql from 'mysql';
import 'dotenv/config';

//create sql and connect to the database
//const mysql = mysql();
const port = parseInt(process.env.rds_port, 10);
const connection = mysql.createConnection({

// we can consider install dotenv to encrypt these data in the .env file
  host: process.env.rds_host,
  user: process.env.rds_user,
  password: process.env.rds_password,
  port: port,
  database: process.env.rds_db
});

connection.connect((err) => err && console.log(err));

export const search_flight = async function (req, res) {
    const departureDate = req.query.departureDate;
    const departureCity = req.query.departureCity;
    const returnDate = req.query.returnDate;
    const destinationCity = req.query.destinationCity;

    connection.query(`
        SELECT t1.startingAirport,
               t1.destinationAirport,
               t2.startingAirport,
               t2.destinationAirport,
               t1.flightDate,
               t1.travelDuration as "time1",
               t2.travelDuration as "time2",
               (t1.totalFare + t2.totalFare) as "totalFare",
               t1.airlineCode as "airlineCode",
               t1.isRefundable,
               t1.departureTime,
               t1.arrivalTime
        FROM NON_STOPS_FULL_TABLE t1
            join NON_STOPS_FULL_TABLE t2 on t1.destinationAirport = t2.startingAirport
        Where t1.flightDate = ?
        AND t2.flightDate = ?
          AND t1.startingAirport = ?
            AND  t2.startingAirport = ?
        AND t2.destinationAirport = ?
        ORDER BY  t1.totalFare;
      `, [departureDate, returnDate, departureCity, destinationCity, departureCity],(err, data) => {
          if (err) {
            console.log(err);
            res.json({})
          } else {
            data.forEach(row => {
                row.travelDuration = addDurations(row.time1, row.time2);
                delete row.time1;
                delete row.time2;
            });
            res.json(data);
          }
        }
      )
}

export const search_flight_withBudget = async function (req, res) {
  const startingAirport = req.query.startingAirport;
  const departureDate = req.query.departureDate;
  const budget = parseFloat(req.query.budget);

  const query = `
    WITH RankedFlights AS (
        SELECT 
            nt.totalFare as CheapestFare,
            nt.startingAirport,
            nt.destinationAirport,
            nt.flightDate,
            nt.travelDuration,
            nt.airlineCode,
            nt.isRefundable,
            nt.departureTime,
            nt.arrivalTime,
            ROW_NUMBER() OVER (PARTITION BY nt.destinationAirport ORDER BY nt.totalFare) as rn
        FROM 
            NON_STOPS_FULL_TABLE nt
        WHERE 
            nt.startingAirport = ?
            AND DATE(nt.departureTime) >= DATE(?)
    )
    SELECT 
        startingAirport,
        destinationAirport,
        flightDate,
        travelDuration,
        CheapestFare as totalFare,
        airlineCode,
        isRefundable,
        departureTime,
        arrivalTime
    FROM 
        RankedFlights
    WHERE 
        rn = 1
        AND CheapestFare <= ?
    ORDER BY 
        CheapestFare;
  `;

  connection.query(query, [startingAirport, departureDate, budget], (err, data) => {
      if (err) {
          console.log(err);
          res.status(500).json({ error: 'Internal server error' });
      } else {
          res.json(data);
      }
  });
};



//route: GET /recommendations
export const recommendations = async function (req, res) {
  const platform = req.query.platform;
  const country = req.query.country ?? 'United States';
  
  let duration = req.query.duration;
  if (!duration || isNaN(duration) || duration < 0){
    duration = 1800;
  }

  let genre = req.query.genre;
  if (!genre){
    genre = 'Documentaries';
  }

  let type = req.query.type;
  if (!type){
    type = 'Movie';
  }

  connection.query(`
  select distinct m.show_id, m.title, m.duration, m.type, g.genre, m.country, m.release_year
  from movie_tv m 
  join movie_genre mg on m.show_id = mg.show_id
  join genre_lookup g on g.genre_id = mg.genre_id
  where m.duration <= '${duration}'
    and m.show_id like '${platform}%'
    and m.type = '${type}'
    and g.genre = '${genre}'
  order by m.release_year
  `, (err, data) => {
    if (err){
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}

function addDurations(time1, time2) {
    const [hours1, minutes1] = time1.split(' ').map(part => parseInt(part.trim()));
    const [hours2, minutes2] = time2.split(' ').map(part => parseInt(part.trim()));

    let totalHours = hours1 + hours2;
    let totalMinutes = minutes1 + minutes2;

    while (totalMinutes >= 60) {
        totalHours++;
        totalMinutes -= 60;
    }

    return `${totalHours}h ${totalMinutes}m`;
}


  