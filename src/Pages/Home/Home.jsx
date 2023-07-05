import { Switch, FormControlLabel, Button,TextField, Divider, Typography, Box } from "@mui/material";
import { CardDrink } from "../../Components";
import "./Home.scss"

const Home = () => {
  return (
    <>
    <Box className="block">
      <FormControlLabel control={<Switch />} label="Alcool" labelPlacement="start"/>      
    </Box>

    <Divider/>

    <Box className="block">
      <form action="#" className="searchForm">
        <TextField label="Tapez votre recherche..." size="small"/>
        <Button variant="contained">Search</Button>
      </form>
    </Box>

    <Divider/>

    <Box className="block categorie">
      <Typography variant="h4" className="categorieName">CATEGORIE</Typography>
      <CardDrink/>
      <CardDrink/>
      <CardDrink/>
      <CardDrink/>
    </Box>

    <Divider/>

    <div className="block categorie">
      <Typography variant="h4" className="categorieName">CATEGORIE</Typography>
      <CardDrink/>
      <CardDrink/>
      <CardDrink/>
      <CardDrink/>
    </div>

    <Divider/>

    <div className="block categorie">
      <Typography variant="h4" className="categorieName">CATEGORIE</Typography>
      <CardDrink/>
      <CardDrink/>
      <CardDrink/>
      <CardDrink/>
    </div>

    <Divider/>

    <div className="block categorie">
      <Typography variant="h4" className="categorieName">CATEGORIE</Typography>
      <CardDrink/>
      <CardDrink/>
      <CardDrink/>
      <CardDrink/>
    </div>

    <Divider/>
    </>
  );
};

export default Home;