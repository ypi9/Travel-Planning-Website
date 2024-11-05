import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "@mui/material"

const LoginButton = () => {
    const { loginWithRedirect} = useAuth0();
    return (
        <Button sx={{
            my: 2, color: 'black', display: 'block', textTransform: "capitalize",
            '&:hover': {
                color: "blue"
            }
        }} 
        onClick={() => {
            loginWithRedirect();
        localStorage.setItem("isAuthenticated",true);}}>
            Log in
        </Button>
    )
}

export default LoginButton