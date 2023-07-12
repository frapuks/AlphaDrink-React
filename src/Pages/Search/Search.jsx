import { Divider, Stack } from "@mui/material";
import { AccordionDrink, SearchBar, TabsAlcool } from "../../Components";
import "./Search.scss"

const Search = () => {
  return (
    <>
      <SearchBar/>
      <Divider/>
      <TabsAlcool/>
      <Divider/>

      <Stack spacing="0.5rem" sx={{m:1}}>
        <AccordionDrink/>
        <AccordionDrink/>
        <AccordionDrink/>
        <AccordionDrink/>
        <AccordionDrink/>
        <AccordionDrink/>
      </Stack>
    </>
  );
};

export default Search;