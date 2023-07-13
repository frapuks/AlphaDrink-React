import { Divider, Typography, Stack } from "@mui/material";
import { AccordionDrink, SearchBar, TabsAlcool } from "../../Components";
import "./Home.scss"

const Home = () => {

  return (
    <>
      <SearchBar/>

      <Divider />

      <TabsAlcool/>

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