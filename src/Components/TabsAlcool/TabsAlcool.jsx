import { useState } from "react";
import "./TabsAlcool.scss"
import { Tab, Tabs } from "@mui/material";


const TabsAlcool = () => {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <>
      <Tabs value={tabValue} onChange={handleChange} centered>
        <Tab label="Toutes les boissons" />
        <Tab label="Sans alcool" />
      </Tabs>
    </>
  );
};

export default TabsAlcool;

// Make dynamic page content
{/* <Typography hidden={tabValue !== 0}>Test 1</Typography> */}
{/* <Typography hidden={tabValue !== 1}>Test 2</Typography> */}