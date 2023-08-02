import { Button, Typography } from "@mui/material";
import "./Logo.scss"
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  const handleClickLogo = () => {
    navigate('/');
  }
  return (
    <Button onClick={handleClickLogo}>
      <Typography variant="h1" sx={{fontSize:"2rem", fontWeight:"bold", color:"black"}}>Alpha Drink</Typography>
    </Button>
  );
};

export default Logo;