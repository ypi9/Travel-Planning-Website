import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "@mui/material"

const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
        <Button sx={{
            my: 2, color: 'black', display: 'block', textTransform: "capitalize",
            '&:hover': {
                color: "blue"
            }
        }}
            onClick={() => {
                localStorage.removeItem("isAuthenticated")
                logout({ returnTo: window.location.origin })
                }}>
            Log out
        </Button>
    )
}

export default LogoutButton