import { Typography, Rating, Card, Box, Divider, Link } from '@mui/material'

//icon 
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import LocalBarRoundedIcon from '@mui/icons-material/LocalBarRounded';
import NoDrinksTwoToneIcon from '@mui/icons-material/NoDrinksTwoTone';
import { useMemo, useState } from 'react';
import config from '../../config.json'

const RestaurantCard = ({ placeId }) => {
    const[data,setData] = useState(null);
    useMemo(() => {
        fetch(`/api/googleApi/maps/api/place/details/json?placeid=${placeId}&key=${config.REACT_APP_GOOGLE_API_KEY}`)
            .then(res => {
                return res.json();
            })
            .then(resJson => {
                setData(resJson);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [placeId]);
    if(data == null )return <>loading</>
    const resultObj = data.result;
    //console.log(resultObj.editorial_summary)
    //check if nothing in the restuls return 
    if (Object.keys(resultObj).length == 0) return (<Card> No data</Card>);

    return (
        <Link href={`${resultObj.url}`}
            underline={"none"}
            target="_blank"
            rel={"noopener noreferrer"}
        >
            <Card
                sx={{
                    m: 1, p: 1,mt:2,
                    width: 300, height: 400,
                    borderRadius: 5, border: '1px solid lightgray',
                    overflow: "auto",
                    transition: 'transform 0.3s ease-in-out',
                    ':hover': {
                        transform: 'translateY(-10px)', // Move up on hover
                    },

                }}>

                <Box display={"flex"} alignItems={"center"}
                >
                    <Typography noWrap>Name: {resultObj.name} </Typography>

                    <Rating
                        sx={{ ml: 2 }}
                        readOnly
                        icon={<AttachMoneyIcon fontSize={'small'} />}
                        emptyIcon={<AttachMoneyIcon fontSize={'small'} />}
                        value={resultObj.price_level}
                        max={4}
                    />
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                    <Rating name="star" precision={0.1} value={resultObj.rating ?? 0} readOnly />
                    <Typography ml={2}>{resultObj.user_ratings_total ?? 0} reviews</Typography>
                </Box>
                <Typography>Phone: {resultObj.formatted_phone_number}</Typography>
                {resultObj.hasOwnProperty("serves_beer") || resultObj.hasOwnProperty("serves_win") ? (<Box>
                    {resultObj.hasOwnProperty("serves_beer") || resultObj.hasOwnProperty("serves_win") ? <SportsBarIcon /> : null}
                    {resultObj.hasOwnProperty("serves_wine") || resultObj.hasOwnProperty("serves_win") ? <LocalBarRoundedIcon /> : null}
                </Box>) : <Box><NoDrinksTwoToneIcon/></Box>}

                <Divider sx={{ my: 1 }} />
                <Typography sx={{minHeight:75}}>{resultObj.hasOwnProperty("editorial_summary") && resultObj.editorial_summary.hasOwnProperty("overview") ? resultObj.editorial_summary.overview : "This Owner has no overview."}</Typography>
                <Divider sx={{ my: 1 }} />
                <Box>
                    {
                        resultObj.hasOwnProperty("current_opening_hours")
                            && resultObj.current_opening_hours.hasOwnProperty("weekday_text") ?
                            (resultObj.current_opening_hours.weekday_text.map(
                                (schedule,idx) =>
                                    (<Typography key={idx}> {schedule} </Typography>))) : null}

                </Box>
            </Card>
        </Link>
    )
}

export default RestaurantCard