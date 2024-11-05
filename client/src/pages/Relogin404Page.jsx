import errorImg from "../assets/404_page.png"
import { Box, Button } from "@mui/material"
import { useAuth0 } from "@auth0/auth0-react"
const Relogin404Page = () => {
 
 const{loginWithRedirect} =useAuth0();

  return (
    <Box mt={5} sx={{ backgroundImage: `url(${errorImg})`,height: 1000,
                backgroundSize: '1900px 1000px', }}>
     <Button onClick={()=>{
      loginWithRedirect();
     localStorage.setItem("isAuthenticated",true);}}  sx={{left:820,top:230,color:'black',fontStyle:"bold",fontSize:18,width:240}}> Please Log in to Access this feature</Button>
    </Box>
  )
}

export default Relogin404Page