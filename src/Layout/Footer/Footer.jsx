import { IconButton, Stack, Typography } from "@mui/material";
import "./Footer.scss"
import { GitHub, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Stack component="footer" className="footer" position="sticky" top="100%" direction='row' sx={{backgroundColor:"primary.dark"}}>
      <IconButton href="https://www.linkedin.com/in/francois-grunert/" target="blank">
        <LinkedIn/>
      </IconButton>
      <Typography variant="overline">Frapuks - 2023</Typography>
      <IconButton href="https://github.com/frapuks">
        <GitHub/>
      </IconButton>
    </Stack>
  );
};

export default Footer;