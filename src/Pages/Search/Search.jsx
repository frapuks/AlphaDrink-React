import { Divider, Stack } from "@mui/material";
import { AccordionDrink, SearchBar, TabsAlcool } from "../../Components";
import "./Search.scss"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Search = () => {
  const {search} = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    dataFetch(search);
  }, []);

  const dataFetch = async (search) => {
    const response = await fetch(`http://localhost:4100/search`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({search: search})
    });
    const data = await response.json();
    setResults(data);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await dataFetch(data.get('search'));
  }

  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <SearchBar handleSearch={handleSearch}/>
      <Divider/>
      <TabsAlcool tabValue={tabValue} handleChange={handleChange}/>
      <Divider/>

      <Stack spacing="0.5rem" sx={{m:1}}>
        {results.map(drink => (tabValue === 0 || !drink.isalcool) &&
          <AccordionDrink  drink={drink} key={drink.id}/>
        )}
      </Stack>
    </>
  );
};

export default Search;