import { Box, Typography } from "@mui/material";
import "./Footer.scss"

const Footer = () => {
  return (
    <Box component="footer" className="footer" position="sticky" top="100%" sx={{backgroundColor:"primary.dark"}}>
      <Typography variant="overline">Footer</Typography>
    </Box>
  );
};

export default Footer;