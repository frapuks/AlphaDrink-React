import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { LocalBar } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  // Utils
  const navigate = useNavigate();
  
  // Variables
  const token = localStorage.getItem("token");

  // Methods
  const handleClickIcon = () => {navigate("/");}
  const handleClickLogin = () => {navigate("/login");}
  const handleClickDashboard = () => {navigate("/dashboard");}


  return (
    <AppBar component="header" position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleClickIcon}><LocalBar /></IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Alpha Drink</Typography>
        {token
          ? <Button color="inherit" onClick={handleClickDashboard}>Dashboard</Button>
          : <Button color="inherit" onClick={handleClickLogin}>Se connecter</Button>
        }
      </Toolbar>
    </AppBar>
  );
};

export default Header;