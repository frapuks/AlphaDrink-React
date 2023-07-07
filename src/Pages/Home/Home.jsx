import { Switch, FormControlLabel, Button, TextField, Divider, Typography, Box } from "@mui/material";
import { AccordionDrink } from "../../Components";
import "./Home.scss"

const Home = () => {
  return (
    <>
      <Box className="block">
        <FormControlLabel control={<Switch />} label="Alcool" labelPlacement="start" />
      </Box>

      <Divider />

      <Box className="block">
        <form action="#" className="searchForm">
          <TextField label="Tapez votre recherche..." size="small" />
          <Button variant="contained">Search</Button>
        </form>
      </Box>

      <Divider />

      <Box className="block categorie">
        <Typography variant="h4" className="categorieName">CATEGORIE</Typography>
        <AccordionDrink/>
        <AccordionDrink/>
        <AccordionDrink/>
        <AccordionDrink/>
      </Box>

      <Divider />

      <Box className="block categorie">
        <Typography variant="h4" className="categorieName">CATEGORIE</Typography>
        <AccordionDrink/>
        <AccordionDrink/>
        <AccordionDrink/>
        <AccordionDrink/>
      </Box>

      <Divider />
      
    </>
  );
};

export default Home;