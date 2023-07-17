import { Divider, Typography, Stack } from "@mui/material";
import { AccordionDrink, SearchBar, TabsAlcool } from "../../Components";
import "./Home.scss"
import { useEffect, useState } from "react";

const Home = () => {
  const [categories, setCategories] = useState();

  useEffect(() => {
    const dataFetch = async () => {
      const response = await fetch("http://localhost:4100/categories/drinks");
      const data = await response.json();
      setCategories(data);
    };

    dataFetch();
  }, []);

  
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <SearchBar/>

      <Divider />

      <TabsAlcool tabValue={tabValue} handleChange={handleChange}/>

      <Divider />

      {categories && categories.map(category => ( (tabValue === 0 || category.drinks.find(drink => !drink.isalcool)) &&
          <Stack spacing="0.5rem" sx={{m:1}} key={category.id}>
            <Typography variant="h5" className="categorieName" sx={{textTransform:"uppercase"}}>{category.name}</Typography>

            {category.drinks.map(drink => ( (tabValue === 0 || !drink.isalcool) &&
              <AccordionDrink drink={drink} key={drink.id}/>
            ))}

            <Divider/>
          </Stack>
      ))}
    </>
  );
};

export default Home;