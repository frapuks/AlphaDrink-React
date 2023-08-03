import { Container, Divider, Stack, Typography } from "@mui/material";
import { AccordionDrink, SearchBar, TabsAlcool } from "../Components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Search = () => {  
  // Variables
  const {search} = useParams();
  
  // States
  const [results, setResults] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  
  // UseEffect
  useEffect(() => {
    dataFetch(search);
  }, []);
  
  // Methods
  const handleChange = (event, newValue) => { setTabValue(newValue); };

  const dataFetch = async (search) => {
    const response = await fetch(`http://localhost:4100/search`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({search: search})
    });
    const data = await response.json();
    setResults(data);
  };

  // TODO : refacto this method (duplicate in homePage)
  const handleSearch = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await dataFetch(data.get('search'));
  }

  
  return (
    <>
      <SearchBar handleSearch={handleSearch}/>
      <Divider/>
      <TabsAlcool tabValue={tabValue} handleChange={handleChange}/>
      <Divider/>

      <Container sx={{padding:0}}>
        <Stack spacing="0.5rem" sx={{m:1}}>
          {results.map(drink => (tabValue === 0 || !drink.isalcool) &&
            <AccordionDrink drink={drink} key={drink.id}/>
            )}
        </Stack>
      </Container>
      
      <Typography variant="body2" textAlign="center">Les résultats peuvent contenir des boissons non disponibles</Typography>
    </>
  );
};

export default Search;