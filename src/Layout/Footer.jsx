import { IconButton, Stack, Typography } from "@mui/material";
import { GitHub, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Stack component="footer" direction='row' justifyContent="center" alignItems="center" sx={{position:'sticky', top:"100%", height:"10vh", width:"100%", backgroundColor:"primary.dark"}}>
      <IconButton href="https://www.linkedin.com/in/francois-grunert/" target="blank"><LinkedIn/></IconButton>
      <Typography variant="overline">Frapuks - 2023</Typography>
      <IconButton href="https://github.com/frapuks" target="blank"><GitHub/></IconButton>
    </Stack>
  );
};

export default Footer;