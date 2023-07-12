import { Button, TextField, Divider, Typography, Box, Stack, Tabs, Tab } from "@mui/material";
import { AccordionDrink } from "../../Components";
import "./Home.scss"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const handleSearch = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(`search : ${data.get('search')}`);
    navigate("/search");
  }

  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Box component="form" onSubmit={handleSearch}>
        <Stack direction="row" justifyContent="center" spacing="0.5rem" sx={{m:1}}>
          <TextField label="Tapez votre recherche..." name="search" size="small" />
          <Button variant="contained" type="submit" autoFocus>Rechercher</Button>
        </Stack>
      </Box>
      
      <Divider />

      <Tabs value={tabValue} onChange={handleChange} centered>
        <Tab label="Toutes les boissons" />
        <Tab label="Sans alcool" />
      </Tabs>
      {/* <Divider /> */}
      {/* <Typography hidden={tabValue !== 0}>Test 1</Typography> */}
      {/* <Typography hidden={tabValue !== 1}>Test 2</Typography> */}

      <Divider />

      <Stack spacing="0.5rem" sx={{m:1}}>
        <Typography variant="h5" className="categorieName">CATEGORIE</Typography>
        <AccordionDrink/>
        <AccordionDrink/>
        <AccordionDrink/>
        <AccordionDrink/>
      </Stack>

      <Divider />

      <Stack spacing="0.5rem" sx={{m:1}}>
        <Typography variant="h5" className="categorieName">CATEGORIE</Typography>
        <AccordionDrink/>
        <AccordionDrink/>
        <AccordionDrink/>
        <AccordionDrink/>
      </Stack>

      <Divider />
      
    </>
  );
};

export default Home;