import { useAuth0 } from "@auth0/auth0-react"
import { CircularProgress, Card, Avatar, Grid } from "@mui/material";

const UserProfile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) return <Box><CircularProgress /></Box>

    return (
        isAuthenticated && (<Card sx={{ px:110,py:30, width: 230, height: 230, background: "inherit" }}>
            <Avatar src={user.picture} />
            <h2> Hi, {user.name}!</h2>
            <h4> Welcome to the Flex Air.</h4>
            <p> {user.email}</p>
        </Card>)
    )
}

export default UserProfile