import { Divider, Typography, Stack, Container } from "@mui/material";
import { AccordionDrink, SearchBar, TabsAlcool } from "../Components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // Utils
  const navigate = useNavigate();
  
  // States
  const [categories, setCategories] = useState();
  const [tabValue, setTabValue] = useState(0);
  
  // UseEffect
  useEffect(() => {
    dataFetch();
  }, []);
  
  // Methods
  const handleChangeTab = (event, newValue) => { setTabValue(newValue); };

  const dataFetch = async () => {
    const response = await fetch("http://localhost:4100/categories/drinks");
    const data = await response.json();
    setCategories(data);
  };

  // TODO : refacto this method (duplicate in searchPage)
  const handleSearch = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    navigate(`/search/${data.get('search')}`);
  }

  
  return (
    <>
      <SearchBar handleSearch={handleSearch}/>
      <Divider />
      <TabsAlcool tabValue={tabValue} handleChange={handleChangeTab}/>
      <Divider />

      <Container sx={{padding:0}}>
        {categories && categories.map(category => ( (tabValue === 0 || category.drinks.find(drink => !drink.isalcool)) &&
            <Stack spacing="0.5rem" sx={{m:1}} key={category.id}>
              <Typography variant="h5" sx={{textTransform:"uppercase", textAlign:"center"}}>{category.name}</Typography>

              {category.drinks.map(drink => ( drink.isavailable && (tabValue === 0 || !drink.isalcool) &&
                <AccordionDrink drink={drink} key={drink.id}/>
              ))}

              <Divider/>
            </Stack>
        ))}
      </Container>
    </>
  );
};

export default Home;