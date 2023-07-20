import "./Header.scss"
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { LocalBar } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleClickIcon = () => {
    navigate("/");
  }
  const handleClickLogin = () => {
    navigate("/login");
  }
  const handleClickLogout = () => {
    localStorage.clear();
    navigate("/");
  }
  const token = localStorage.getItem("token");
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleClickIcon}>
          <LocalBar />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Alpha Drink</Typography>
        {token
          ? <Button color="inherit" onClick={handleClickLogout}>Se déconnecter</Button>
          : <Button color="inherit" onClick={handleClickLogin}>Se connecter</Button>
        }
      </Toolbar>
    </AppBar>
  );
};

export default Header;